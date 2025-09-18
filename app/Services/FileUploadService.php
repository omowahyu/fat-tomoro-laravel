<?php

namespace App\Services;

use App\Models\File;
use App\Models\RawRow;
use App\Models\AuditLog;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
use Maatwebsite\Excel\HeadingRow;
use Maatwebsite\Excel\Imports\HeadingRowFormatter;
use Exception;

class FileUploadService
{
    public function __construct()
    {
        HeadingRowFormatter::default('none');
    }

    /**
     * Handle file upload and initial processing
     */
    public function uploadFile(UploadedFile $uploadedFile, string $type, int $userId): File
    {
        $this->validateFile($uploadedFile, $type);

        // Normalize legacy types to canonical types used in DB
        $canonicalType = match ($type) {
            'BOH' => 'boh_purchase',
            'BI' => 'bi_sales',
            'BANK' => 'bank_statement',
            default => $type,
        };

        DB::beginTransaction();
        
        try {
            // Store the file
            $filePath = $this->storeFile($uploadedFile, $canonicalType);
            
            // Create file record
            $file = File::create([
                'type' => $canonicalType,
                'original_name' => $uploadedFile->getClientOriginalName(),
                'size_bytes' => $uploadedFile->getSize(),
                'status' => 'uploaded',
                'created_by' => $userId,
                'storage_path' => $filePath,
                'meta' => $this->extractFileMeta($uploadedFile),
            ]);

            // Log the upload
            AuditLog::logResourceAction(
                "user:{$userId}",
                'file_uploaded',
                'File',
                $file->id,
                [
                    'filename' => $file->original_name,
                    'type' => $canonicalType,
                    'size' => $file->size_bytes,
                ]
            );

            DB::commit();
            
            return $file;
            
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * Parse uploaded file and extract raw rows
     */
    public function parseFile(File $file): File
    {
    $file->update(['status' => 'parsing']);

        try {
            $filePath = Storage::path($file->storage_path);
            $rows = $this->extractRowsFromFile($filePath, $file->type);
            
            $totalRows = 0;
            $batchSize = 500; // Process in batches to avoid memory issues
            
            foreach (array_chunk($rows, $batchSize) as $batch) {
                $rawRowsData = [];
                
                foreach ($batch as $index => $row) {
                    $rawRowsData[] = [
                        'file_id' => $file->id,
                        'row_number' => $totalRows + $index + 1,
                        'row_json' => json_encode($row),
                        'row_hash' => hash('sha256', json_encode($row)),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
                
                RawRow::insert($rawRowsData);
                $totalRows += count($batch);
            }

            $file->update([
                'status' => 'parsed',
                'rows_detected' => $totalRows,
                'processed_at' => now(),
            ]);

            // Log the parsing
            AuditLog::logResourceAction(
                'system',
                'file_parsed',
                'File',
                $file->id,
                [
                    'total_rows' => $totalRows,
                    'processing_time' => now()->diffInSeconds($file->updated_at),
                ]
            );

            return $file->fresh();
            
        } catch (Exception $e) {
            $file->update(['status' => 'failed']);
            
            AuditLog::logResourceAction(
                'system',
                'file_parse_failed',
                'File',
                $file->id,
                ['error' => $e->getMessage()],
                [],
                'error'
            );
            
            throw $e;
        }
    }

    /**
     * Validate uploaded file
     */
    private function validateFile(UploadedFile $file, string $type): void
    {
        // Check file size (10MB max)
        if ($file->getSize() > 10 * 1024 * 1024) {
            throw new Exception('File size exceeds 10MB limit');
        }

        // Check file extension
        $allowedExtensions = ['csv', 'xlsx', 'xls'];
        $extension = strtolower($file->getClientOriginalExtension());
        
        if (!in_array($extension, $allowedExtensions)) {
            throw new Exception('Only CSV and Excel files are allowed');
        }

        // Check file type
        $allowedTypes = ['BOH', 'BI', 'BANK'];
        if (!in_array($type, $allowedTypes)) {
            throw new Exception('Invalid file type');
        }
    }

    /**
     * Store uploaded file
     */
    private function storeFile(UploadedFile $file, string $type): string
    {
        $directory = "uploads/{$type}/" . date('Y/m');
        $filename = time() . '_' . $file->getClientOriginalName();
        
        return $file->storeAs($directory, $filename, 'local');
    }

    /**
     * Extract file metadata
     */
    private function extractFileMeta(UploadedFile $file): array
    {
        $meta = [
            'original_name' => $file->getClientOriginalName(),
            'mime_type' => $file->getMimeType(),
            'extension' => $file->getClientOriginalExtension(),
            'uploaded_at' => now()->toISOString(),
        ];

        // For CSV files, try to detect delimiter and encoding
        if (strtolower($file->getClientOriginalExtension()) === 'csv') {
            $meta = array_merge($meta, $this->detectCsvProperties($file));
        }

        return $meta;
    }

    /**
     * Detect CSV properties like delimiter and encoding
     */
    private function detectCsvProperties(UploadedFile $file): array
    {
        $handle = fopen($file->getPathname(), 'r');
        $firstLine = fgets($handle);
        fclose($handle);

        // Detect delimiter
        $delimiters = [',', ';', '\t', '|'];
        $delimiter = ','; // default
        $maxCount = 0;

        foreach ($delimiters as $del) {
            $count = substr_count($firstLine, $del);
            if ($count > $maxCount) {
                $maxCount = $count;
                $delimiter = $del;
            }
        }

        // Detect encoding (basic detection)
        $encoding = mb_detect_encoding($firstLine, ['UTF-8', 'ISO-8859-1', 'Windows-1252'], true) ?: 'UTF-8';

        return [
            'delimiter' => $delimiter,
            'encoding' => $encoding,
            'estimated_columns' => $maxCount + 1,
        ];
    }

    /**
     * Extract rows from file based on type
     */
    private function extractRowsFromFile(string $filePath, string $type): array
    {
        $extension = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
        
        if ($extension === 'csv') {
            return $this->extractFromCsv($filePath);
        } else {
            return $this->extractFromExcel($filePath);
        }
    }

    /**
     * Extract rows from CSV file
     */
    private function extractFromCsv(string $filePath): array
    {
        $rows = [];
        $handle = fopen($filePath, 'r');
        
        // Skip header row
        $header = fgetcsv($handle);
        
        while (($row = fgetcsv($handle)) !== false) {
            if (!empty(array_filter($row))) { // Skip empty rows
                $rows[] = array_combine($header, $row);
            }
        }
        
        fclose($handle);
        return $rows;
    }

    /**
     * Extract rows from Excel file
     */
    private function extractFromExcel(string $filePath): array
    {
        $data = Excel::toArray([], $filePath);
        
        if (empty($data) || empty($data[0])) {
            return [];
        }
        
        $sheet = $data[0];
        $header = array_shift($sheet); // Remove header row
        
        $rows = [];
        foreach ($sheet as $row) {
            if (!empty(array_filter($row))) { // Skip empty rows
                $rows[] = array_combine($header, $row);
            }
        }
        
        return $rows;
    }

    /**
     * Get file preview (first few rows)
     */
    public function getFilePreview(File $file, int $limit = 10): array
    {
        return $file->rawRows()
            ->limit($limit)
            ->get()
            ->map(function ($rawRow) {
                return [
                    'row_number' => $rawRow->row_number,
                    'data' => $rawRow->row_json,
                ];
            })
            ->toArray();
    }
}
