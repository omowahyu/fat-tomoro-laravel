<?php

namespace App\Http\Controllers;

use App\Http\Requests\FileUploadRequest;
use App\Jobs\ProcessFileJob;
use App\Models\File;
use App\Services\FileUploadService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FileController extends Controller
{
    public function __construct(
        private FileUploadService $fileUploadService
    ) {}

    /**
     * Display file upload page
     */
    public function index(): Response
    {
        $files = File::with('createdBy')
            ->latest()
            ->paginate(20);

        return Inertia::render('files/index', [
            'files' => $files,
        ]);
    }

    /**
     * Handle file upload
     */
    public function upload(FileUploadRequest $request): JsonResponse
    {
        try {
            $file = $this->fileUploadService->uploadFile(
                $request->file('file'),
                $request->input('type'),
                auth()->id()
            );

            // Queue file processing
            ProcessFileJob::dispatch($file);

            return response()->json([
                'success' => true,
                'message' => 'File uploaded successfully and queued for processing',
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
     * Parse uploaded file
     */
    public function parse(File $file): JsonResponse
    {
        try {
            // Check authorization
            if (!auth()->user()->canUpload()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized to parse files',
                ], 403);
            }

            $parsedFile = $this->fileUploadService->parseFile($file);

            return response()->json([
                'success' => true,
                'message' => 'File parsed successfully',
                'data' => [
                    'file_id' => $parsedFile->id,
                    'status' => $parsedFile->status,
                    'total_rows' => $parsedFile->rows_detected,
                ],
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Parsing failed: ' . $e->getMessage(),
            ], 422);
        }
    }

    /**
     * Get file preview
     */
    public function preview(File $file): JsonResponse
    {
        try {
            $preview = $this->fileUploadService->getFilePreview($file, 10);

            return response()->json([
                'success' => true,
                'data' => [
                    'file' => [
                        'id' => $file->id,
                        'name' => $file->original_name,
                        // Map canonical types back to legacy labels for UI component compatibility
                        'type' => match ($file->type) {
                            'boh_purchase' => 'BOH',
                            'bi_sales' => 'BI',
                            'bank_statement' => 'BANK',
                            default => $file->type,
                        },
                        'status' => $file->status,
                        'total_rows' => $file->rows_detected,
                        'meta' => $file->meta,
                    ],
                    'preview' => $preview,
                ],
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to get preview: ' . $e->getMessage(),
            ], 422);
        }
    }

    /**
     * Show file details
     */
    public function show(File $file): Response
    {
        $file->load(['createdBy', 'rawRows' => function ($query) {
            $query->limit(10);
        }]);

        return Inertia::render('files/show', [
            'file' => $file,
        ]);
    }

    /**
     * Delete file
     */
    public function destroy(File $file): JsonResponse
    {
        try {
            // Check authorization
            if (!auth()->user()->canManageSystem() && $file->created_by !== auth()->id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized to delete this file',
                ], 403);
            }

            $file->delete();

            return response()->json([
                'success' => true,
                'message' => 'File deleted successfully',
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete file: ' . $e->getMessage(),
            ], 422);
        }
    }
}
