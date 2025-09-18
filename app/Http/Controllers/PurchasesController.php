<?php

namespace App\Http\Controllers;

use App\Http\Requests\FileUploadRequest;
use App\Jobs\ProcessFileJob;
use App\Models\File;
use App\Models\PurchaseDoc;
use App\Models\MappingColumn;
use App\Models\MappingItem;
use App\Models\SalesOrderItem;
use App\Services\FileUploadService;
use App\Services\SalesOrderParserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PurchasesController extends Controller
{
    public function __construct(
        private FileUploadService $fileUploadService,
        private SalesOrderParserService $salesOrderParserService
    ) {}

    /**
     * Import BOH data page
     */
    public function import(): Response
    {
        $recentFiles = File::where('type', 'boh_purchase')
            ->with(['createdBy', 'salesOrderItems'])
            ->latest()
            ->limit(10)
            ->get();

        return Inertia::render('purchases/import', [
            'recentFiles' => $recentFiles,
        ]);
    }

    /**
     * Handle BOH file upload
     */
    public function upload(FileUploadRequest $request): JsonResponse
    {
        \Log::info('BOH Upload request received', [
            'files' => $request->allFiles(),
            'data' => $request->all(),
            'user' => auth()->id()
        ]);

        try {
            // Ensure only BOH files are processed here
            if ($request->input('type') !== 'BOH') {
                return response()->json([
                    'success' => false,
                    'message' => 'Only BOH files are allowed in purchase workflow',
                ], 422);
            }

            $file = $this->fileUploadService->uploadFile(
                $request->file('file'),
                $request->input('type'),
                auth()->id()
            );

            \Log::info('File uploaded successfully', ['file_id' => $file->id]);

            // Parse sales order file immediately
            try {
                $items = $this->salesOrderParserService->parseSalesOrderFile($file);
                $this->salesOrderParserService->saveParsedItems($file, $items);

                \Log::info('Sales order parsed successfully', [
                    'file_id' => $file->id,
                    'items_count' => count($items),
                    'items' => $items
                ]);
            } catch (\Exception $e) {
                \Log::error('Sales order parsing failed', [
                    'file_id' => $file->id,
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);

                // If parsing fails, still queue for regular processing
                ProcessFileJob::dispatch($file);
            }

            return response()->json([
                'success' => true,
                'message' => 'BOH file uploaded successfully and queued for processing',
                'data' => [
                    'file_id' => $file->id,
                    'original_name' => $file->original_name,
                    'type' => $file->type,
                    'status' => $file->status,
                    'size_bytes' => $file->size_bytes,
                ],
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Upload failed: ' . $e->getMessage(),
            ], 422);
        }
    }

    /**
     * Update sales order item
     */
    public function updateSalesOrderItem(Request $request, SalesOrderItem $item): JsonResponse
    {
        $request->validate([
            'product_code' => 'required|string|max:255',
            'product_name' => 'nullable|string',
            'price_incl_tax' => 'required|numeric|min:0',
            'qty' => 'required|numeric|min:0',
            'uom' => 'nullable|string|max:50',
            'amt_incl_tax' => 'required|numeric|min:0',
        ]);

        try {
            $item->update([
                'product_code' => $request->product_code,
                'product_name' => $request->product_name,
                'price_incl_tax' => $request->price_incl_tax,
                'qty' => $request->qty,
                'uom' => $request->uom,
                'amt_incl_tax' => $request->amt_incl_tax,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Sales order item updated successfully',
                'data' => $item->fresh(),
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Update failed: ' . $e->getMessage(),
            ], 422);
        }
    }

    /**
     * Get sales order items for a file
     */
    public function getSalesOrderItems(File $file): JsonResponse
    {
        $items = $file->salesOrderItems()->orderBy('line_no')->get();

        return response()->json([
            'success' => true,
            'data' => $items,
        ]);
    }

    /**
     * Transform & Preview page
     */
    public function transform(): Response
    {
        $pendingFiles = File::where('type', 'boh_purchase')
            ->where('status', 'parsed')
            ->with(['rawRows' => function ($query) {
                $query->limit(5);
            }])
            ->get();

        return Inertia::render('purchases/transform', [
            'pendingFiles' => $pendingFiles,
        ]);
    }

    /**
     * Mapping & Validation page
     */
    public function mapping(): Response
    {
        $columnMappings = MappingColumn::where('source_context', 'boh_purchase')
            ->where('is_active', true)
            ->get();

        $itemMappings = MappingItem::where('is_active', true)
            ->limit(50)
            ->get();

        return Inertia::render('purchases/mapping', [
            'columnMappings' => $columnMappings,
            'itemMappings' => $itemMappings,
        ]);
    }

    /**
     * Posting to Accurate page
     */
    public function posting(): Response
    {
        $readyDocs = PurchaseDoc::where('status', 'staged')
            ->with(['file', 'items'])
            ->paginate(20);

        $postedDocs = PurchaseDoc::where('status', 'posted')
            ->with(['file'])
            ->latest()
            ->limit(10)
            ->get();

        return Inertia::render('purchases/posting', [
            'readyDocs' => $readyDocs,
            'postedDocs' => $postedDocs,
        ]);
    }

    /**
     * History & Audit page
     */
    public function history(): Response
    {
        $recentFiles = File::where('type', 'boh_purchase')
            ->with('createdBy')
            ->latest()
            ->limit(20)
            ->get();

        $recentDocs = PurchaseDoc::with('file')
            ->latest()
            ->limit(20)
            ->get();

        $audits = \App\Models\AuditLog::recent(14)
            ->orderByDesc('id')
            ->limit(50)
            ->get();

        return Inertia::render('purchases/history', [
            'recentFiles' => $recentFiles,
            'recentDocs' => $recentDocs,
            'audits' => $audits,
        ]);
    }

    /**
     * Process BOH file transformation
     */
    public function processTransform(Request $request)
    {
        $validated = $request->validate([
            'file_id' => 'required|exists:files,id',
        ]);

        $file = File::with(['rawRows', 'transformedRows'])->findOrFail($validated['file_id']);

        if (!$file->isPurchaseType()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid file type for purchases transformation',
            ], 422);
        }

        // Load active mappings
        $columnMappings = MappingColumn::forContext('boh_purchase')->active()->get()
            ->keyBy('source_field');

        $createdDocs = 0;
        $createdItems = 0;
        $createdTransformed = 0;

        \DB::beginTransaction();
        try {
            foreach ($file->rawRows as $raw) {
                // Build normalized data using column mappings (fallback to raw keys)
                $rawData = $raw->row_json;
                $normalized = [];

                foreach ($rawData as $key => $value) {
                    $targetField = $columnMappings[$key]->target_field ?? null;
                    if ($targetField) {
                        $normalized[$targetField] = $value;
                    }
                }

                // helper to resolve value from normalized first, then raw by possible keys
                $getVal = function (array $keys, $default = null) use ($normalized, $rawData) {
                    foreach ($keys as $k) {
                        if (array_key_exists($k, $normalized) && $normalized[$k] !== null && $normalized[$k] !== '') {
                            return $normalized[$k];
                        }
                        if (array_key_exists($k, $rawData) && $rawData[$k] !== null && $rawData[$k] !== '') {
                            return $rawData[$k];
                        }
                    }
                    return $default;
                };

                // Basic normalization defaults
                $docType = $getVal(['doc_type'], 'gr');
                $docDateRaw = $getVal(['doc_date', 'date', 'tanggal']);
                $docDate = $docDateRaw ? \Carbon\Carbon::parse($docDateRaw) : now();
                $supplier = $getVal(['supplier_code', 'supplier']);
                $warehouse = $getVal(['warehouse_code', 'warehouse'], 'WH-01');
                $currency = $getVal(['currency'], 'IDR');

                // Item details
                $itemName = $getVal(['item_name', 'item', 'product']);
                $qty = (float)$getVal(['qty', 'quantity', 'qty_pcs'], 0);
                $price = (float)$getVal(['unit_price', 'price', 'unitprice'], 0);
                $uom = $getVal(['uom', 'unit', 'satuan']);

                // Map item name to item_code if available
                $itemMapping = null;
                if ($itemName) {
                    $itemMapping = \App\Models\MappingItem::active()
                        ->where('source_name', $itemName)
                        ->first();
                }

                $itemCode = $itemMapping?->item_code ?? $getVal(['item_code']);

                // Validate row
                $errors = [];
                if (!$supplier) { $errors[] = 'Missing supplier_code'; }
                if (!$itemCode) { $errors[] = 'Missing item_code mapping'; }
                if ($qty <= 0) { $errors[] = 'Invalid qty'; }
                if ($price < 0) { $errors[] = 'Invalid unit_price'; }

                $valid = count($errors) === 0;

                // Create transformed row
                $t = new \App\Models\TransformedRow([
                    'file_id' => $file->id,
                    'raw_row_id' => $raw->id,
                    'normalized_json' => array_merge($normalized, [
                        'item_code' => $itemCode,
                        'item_name_src' => $itemName,
                        'qty' => $qty,
                        'unit_price' => $price,
                        'uom' => $uom,
                    ]),
                    'valid_flag' => $valid,
                    'errors' => $valid ? null : $errors,
                    'warnings' => null,
                    'confidence_score' => $itemMapping?->confidence ? $itemMapping->confidence / 100 : null,
                    'requires_review' => !$valid,
                ]);
                $t->save();
                $createdTransformed++;

                // Create a staged purchase doc + item if valid
                if ($valid) {
                    $doc = new \App\Models\PurchaseDoc([
                        'file_id' => $file->id,
                        'source_row_id' => $raw->id,
                        'doc_type' => $docType,
                        'doc_no' => $getVal(['doc_no', 'no_doc', 'document_no']),
                        'doc_date' => $docDate->toDateString(),
                        'supplier_code' => $supplier,
                        'warehouse_code' => $warehouse,
                        'currency' => $currency,
                        'status' => 'staged',
                    ]);
                    $doc->save();
                    $createdDocs++;

                    $item = new \App\Models\PurchaseItem([
                        'purchase_doc_id' => $doc->id,
                        'line_no' => 1,
                        'item_code' => $itemCode,
                        'item_name_src' => $itemName ?? '',
                        'uom' => $uom,
                        'qty' => $qty,
                        'unit_price' => $price,
                        'tax_code' => $getVal(['tax_code']),
                        'meta' => [
                            'source' => 'boh_purchase',
                            'row_number' => $raw->row_number,
                        ],
                    ]);
                    $item->save();
                    $createdItems++;

                    // Update totals
                    $doc->refresh();
                    $doc->calculateTotals();
                }
            }

            // Update file status
            $file->status = 'validated';
            $file->save();

            \DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Transformation completed',
                'data' => [
                    'transformed_rows' => $createdTransformed,
                    'staged_docs' => $createdDocs,
                    'staged_items' => $createdItems,
                ],
            ]);
        } catch (\Throwable $e) {
            \DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Transformation failed: ' . $e->getMessage(),
            ], 422);
        }
    }

    /**
     * Update column mapping
     */
    public function updateMapping(Request $request)
    {
        $request->validate([
            'source_field' => 'required|string',
            'target_field' => 'required|string',
            'confidence' => 'required|integer|min:0|max:100',
        ]);

        MappingColumn::updateOrCreate(
            [
                'source_context' => 'boh_purchase',
                'source_field' => $request->source_field,
                'version' => 1,
            ],
            [
                'target_field' => $request->target_field,
                'confidence' => $request->confidence,
                'updated_by' => auth()->id(),
            ]
        );

        return response()->json([
            'success' => true,
            'message' => 'Mapping updated successfully',
        ]);
    }

    /**
     * Post documents to Accurate
     */
    public function postToAccurate(Request $request)
    {
        $validated = $request->validate([
            'doc_ids' => 'required|array',
            'doc_ids.*' => 'exists:purchase_docs,id',
        ]);

        $docs = PurchaseDoc::whereIn('id', $validated['doc_ids'])->get();

        $posted = 0;
        foreach ($docs as $doc) {
            if ($doc->canPost()) {
                // Simulate posting success
                $doc->status = 'posted';
                $doc->posting_ext_id = 'SIM-' . now()->format('YmdHis') . '-' . $doc->id;
                $doc->save();
                $posted++;
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Documents posted (simulated) to Accurate',
            'data' => [
                'posted' => $posted,
                'total' => $docs->count(),
            ],
        ]);
    }
}
