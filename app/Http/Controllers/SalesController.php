<?php

namespace App\Http\Controllers;

use App\Http\Requests\FileUploadRequest;
use App\Jobs\ProcessFileJob;
use App\Models\File;
use App\Models\SalesDoc;
use App\Models\BankRow;
use App\Models\MappingChannel;
use App\Services\FileUploadService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SalesController extends Controller
{
    public function __construct(
        private FileUploadService $fileUploadService
    ) {}

    /**
     * Upload BI Sales data page
     */
    public function uploadBi(): Response
    {
        $recentFiles = File::where('type', 'bi_sales')
            ->with('createdBy')
            ->latest()
            ->limit(10)
            ->get();

        return Inertia::render('sales/upload-bi', [
            'recentFiles' => $recentFiles,
        ]);
    }

    /**
     * Handle BI file upload
     */
    public function uploadBiFile(FileUploadRequest $request): JsonResponse
    {
        try {
            // Ensure only BI files are processed here
            if ($request->input('type') !== 'BI') {
                return response()->json([
                    'success' => false,
                    'message' => 'Only BI files are allowed in sales workflow',
                ], 422);
            }

            $file = $this->fileUploadService->uploadFile(
                $request->file('file'),
                $request->input('type'),
                auth()->id()
            );

            // Queue file processing
            ProcessFileJob::dispatch($file);

            return response()->json([
                'success' => true,
                'message' => 'BI file uploaded successfully and queued for processing',
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
     * Sales verification page
     */
    public function verification(): Response
    {
        $salesDocs = SalesDoc::where('status', 'staged')
            ->with('file')
            ->paginate(20);

        $channelSummary = SalesDoc::selectRaw('
                channel_code,
                COUNT(*) as doc_count,
                SUM(gross_amount) as total_gross,
                SUM(net_amount) as total_net
            ')
            ->where('status', 'staged')
            ->groupBy('channel_code')
            ->get();

        return Inertia::render('sales/verification', [
            'salesDocs' => $salesDocs,
            'channelSummary' => $channelSummary,
        ]);
    }

    /**
     * Upload Bank statement page
     */
    public function uploadBank(): Response
    {
        $recentFiles = File::where('type', 'bank_statement')
            ->with('createdBy')
            ->latest()
            ->limit(10)
            ->get();

        $unmatchedTransactions = BankRow::where('status', 'unmatched')
            ->with('file')
            ->latest()
            ->limit(20)
            ->get();

        return Inertia::render('sales/upload-bank', [
            'recentFiles' => $recentFiles,
            'unmatchedTransactions' => $unmatchedTransactions,
        ]);
    }

    /**
     * Handle Bank file upload
     */
    public function uploadBankFile(FileUploadRequest $request): JsonResponse
    {
        try {
            // Ensure only BANK files are processed here
            if ($request->input('type') !== 'BANK') {
                return response()->json([
                    'success' => false,
                    'message' => 'Only BANK files are allowed in bank upload workflow',
                ], 422);
            }

            $file = $this->fileUploadService->uploadFile(
                $request->file('file'),
                $request->input('type'),
                auth()->id()
            );

            // Queue file processing
            ProcessFileJob::dispatch($file);

            return response()->json([
                'success' => true,
                'message' => 'Bank file uploaded successfully and queued for processing',
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
     * Reconciliation resume page
     */
    public function resume(): Response
    {
        $reconciliationSummary = SalesDoc::selectRaw('
                channel_code,
                sales_date,
                SUM(gross_amount) as gross_amount,
                SUM(commission_fee) as commission_fee,
                SUM(ads_fee) as ads_fee,
                SUM(net_amount) as net_amount,
                SUM(bank_in_amount) as bank_in_amount,
                SUM(diff_amount) as diff_amount
            ')
            ->where('status', 'reconciled')
            ->groupBy('channel_code', 'sales_date')
            ->orderBy('sales_date', 'desc')
            ->limit(30)
            ->get();

        $channelDifferences = SalesDoc::selectRaw('
                channel_code,
                SUM(ABS(diff_amount)) as total_diff,
                COUNT(CASE WHEN diff_amount != 0 THEN 1 END) as diff_count
            ')
            ->where('status', 'reconciled')
            ->groupBy('channel_code')
            ->get();

        return Inertia::render('sales/resume', [
            'reconciliationSummary' => $reconciliationSummary,
            'channelDifferences' => $channelDifferences,
        ]);
    }

    /**
     * Auto Generate Diskon page
     */
    public function autoDiscount(): Response
    {
        return Inertia::render('sales/auto-discount');
    }

    /**
     * Review Selisih page
     */
    public function review(): Response
    {
        return Inertia::render('sales/review');
    }

    /**
     * Process BI sales data
     */
    public function processBiSales(Request $request)
    {
        $request->validate([
            'file_id' => 'required|exists:files,id',
        ]);

        $file = File::findOrFail($request->file_id);

        // TODO: Implement BI sales processing logic

        return response()->json([
            'success' => true,
            'message' => 'BI sales processing started',
        ]);
    }

    /**
     * Process bank reconciliation
     */
    public function processReconciliation(Request $request)
    {
        $request->validate([
            'sales_date' => 'required|date',
            'channel_codes' => 'array',
        ]);

        // TODO: Implement reconciliation matching logic

        return response()->json([
            'success' => true,
            'message' => 'Reconciliation processing started',
        ]);
    }

    /**
     * Approve reconciliation differences
     */
    public function approveDifferences(Request $request)
    {
        $request->validate([
            'sales_doc_ids' => 'required|array',
            'sales_doc_ids.*' => 'exists:sales_docs,id',
        ]);

        // TODO: Implement difference approval logic

        return response()->json([
            'success' => true,
            'message' => 'Differences approved and ready for posting',
        ]);
    }
}
