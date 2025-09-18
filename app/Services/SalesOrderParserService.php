<?php

namespace App\Services;

use App\Models\File;
use App\Models\SalesOrderItem;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Log;

class SalesOrderParserService
{
    /**
     * Parse sales order file and extract items
     */
    public function parseSalesOrderFile(File $file): array
    {
        // Try different path formats to find the file
        $possiblePaths = [
            storage_path('app/private/' . $file->storage_path),
            storage_path('app/' . $file->storage_path),
            storage_path($file->storage_path),
            $file->storage_path,
            '/var/www/html/storage/app/private/' . $file->storage_path
        ];

        $filePath = null;
        foreach ($possiblePaths as $path) {
            if (file_exists($path)) {
                $filePath = $path;
                break;
            }
        }

        if (!$filePath) {
            Log::error('File not found in any expected location', [
                'file_id' => $file->id,
                'storage_path' => $file->storage_path,
                'tried_paths' => $possiblePaths
            ]);
            throw new \Exception('File not found: ' . $file->storage_path);
        }

        Log::info('Parsing sales order file', [
            'file_id' => $file->id,
            'storage_path' => $file->storage_path,
            'full_path' => $filePath,
            'file_exists' => file_exists($filePath)
        ]);

        $extension = strtolower(pathinfo($file->original_name, PATHINFO_EXTENSION));

        if ($extension === 'csv') {
            return $this->parseFromCsv($filePath);
        } else {
            return $this->parseFromExcel($filePath);
        }
    }

    /**
     * Parse CSV file and extract sales order items
     */
    private function parseFromCsv(string $filePath): array
    {
        $items = [];
        $handle = fopen($filePath, 'r');
        
        if (!$handle) {
            throw new \Exception('Cannot open CSV file');
        }

        $foundHeader = false;
        $headerRow = null;
        
        while (($row = fgetcsv($handle, 0, ',', '"', '\\')) !== false) {
            // Skip empty rows
            if (empty(array_filter($row, function($cell) { return trim($cell) !== ''; }))) {
                continue;
            }

            // Look for the header row that contains "Line No"
            if (!$foundHeader && isset($row[0]) && strpos($row[0], 'Line No') !== false) {
                $headerRow = $row;
                $foundHeader = true;
                Log::info('Found header row', ['header' => $headerRow]);
                continue;
            }

            // Process data rows after header is found
            if ($foundHeader && $headerRow) {
                // Skip rows that don't start with a number (likely continuation of header or other info)
                if (!isset($row[0]) || !is_numeric(trim($row[0]))) {
                    continue;
                }

                $item = $this->parseItemRow($row, $headerRow);
                if ($item) {
                    $items[] = $item;
                    Log::info('Parsed item', ['item' => $item]);
                }
            }
        }
        
        fclose($handle);
        return $items;
    }

    /**
     * Parse Excel file and extract sales order items
     */
    private function parseFromExcel(string $filePath): array
    {
        $items = [];
        
        try {
            $data = Excel::toArray([], $filePath);
            
            if (empty($data) || empty($data[0])) {
                return $items;
            }
            
            $rows = $data[0]; // Get first sheet
            $foundHeader = false;
            $headerRow = null;
            
            foreach ($rows as $row) {
                // Skip empty rows
                if (empty(array_filter($row))) {
                    continue;
                }
                
                // Look for the header row
                if (!$foundHeader && isset($row[0]) && strpos($row[0], 'Line No') !== false) {
                    $headerRow = $row;
                    $foundHeader = true;
                    continue;
                }
                
                // Process data rows after header is found
                if ($foundHeader && $headerRow) {
                    $item = $this->parseItemRow($row, $headerRow);
                    if ($item) {
                        $items[] = $item;
                    }
                }
            }
            
        } catch (\Exception $e) {
            Log::error('Error parsing Excel file: ' . $e->getMessage());
            throw new \Exception('Error parsing Excel file: ' . $e->getMessage());
        }
        
        return $items;
    }

    /**
     * Parse individual item row
     */
    private function parseItemRow(array $row, array $headerRow): ?array
    {
        // Create mapping from header to data
        $headerMapping = [];
        foreach ($headerRow as $index => $header) {
            $cleanHeader = trim($header);
            if (!empty($cleanHeader)) {
                $headerMapping[$cleanHeader] = $index;
            }
        }

        Log::info('Header mapping', ['mapping' => $headerMapping, 'row' => $row]);

        // Extract required fields
        $lineNo = $this->getValueFromRow($row, $headerMapping, 'Line No');
        $productCode = $this->getValueFromRow($row, $headerMapping, 'Product Code');
        $productName = $this->getValueFromRow($row, $headerMapping, 'Product Name');
        $priceInclTax = $this->getValueFromRow($row, $headerMapping, 'Prince Incl.Tax');
        $qty = $this->getValueFromRow($row, $headerMapping, 'Qty');
        $uom = $this->getValueFromRow($row, $headerMapping, 'UOM');
        $amtInclTax = $this->getValueFromRow($row, $headerMapping, 'Amt Incl Tax');

        // Skip if essential fields are missing
        if (empty($lineNo) || empty($productCode)) {
            Log::info('Skipping row - missing essential fields', [
                'line_no' => $lineNo,
                'product_code' => $productCode
            ]);
            return null;
        }

        $item = [
            'line_no' => $lineNo,
            'product_code' => $productCode,
            'product_name' => $productName,
            'price_incl_tax' => $this->parseNumericValue($priceInclTax),
            'qty' => $this->parseNumericValue($qty),
            'uom' => $uom,
            'amt_incl_tax' => $this->parseNumericValue($amtInclTax),
        ];

        Log::info('Parsed item successfully', ['item' => $item]);
        return $item;
    }

    /**
     * Get value from row using header mapping
     */
    private function getValueFromRow(array $row, array $headerMapping, string $headerName): string
    {
        $index = $headerMapping[$headerName] ?? null;
        if ($index !== null && isset($row[$index])) {
            return trim($row[$index]);
        }
        return '';
    }

    /**
     * Parse numeric value from string
     */
    private function parseNumericValue(string $value): float
    {
        if (empty($value)) {
            return 0;
        }
        
        // Remove commas and other formatting
        $cleaned = preg_replace('/[^\d.-]/', '', $value);
        return (float) $cleaned;
    }

    /**
     * Save parsed items to database
     */
    public function saveParsedItems(File $file, array $items): void
    {
        // Delete existing items for this file
        SalesOrderItem::where('file_id', $file->id)->delete();
        
        // Insert new items
        foreach ($items as $item) {
            SalesOrderItem::create([
                'file_id' => $file->id,
                'line_no' => $item['line_no'],
                'product_code' => $item['product_code'],
                'product_name' => $item['product_name'],
                'price_incl_tax' => $item['price_incl_tax'],
                'qty' => $item['qty'],
                'uom' => $item['uom'],
                'amt_incl_tax' => $item['amt_incl_tax'],
            ]);
        }
        
        // Update file status
        $file->update([
            'status' => 'parsed',
            'rows_detected' => count($items),
        ]);
    }

    /**
     * Convert Excel/CSV to CSV format
     */
    public function convertToCsv(File $file): string
    {
        $items = $this->parseSalesOrderFile($file);
        
        // Create CSV content
        $csvContent = "Line No,Product Code,Product Name,Price Incl Tax,Qty,UOM,Amt Incl Tax\n";
        
        foreach ($items as $item) {
            $csvContent .= sprintf(
                "%s,%s,\"%s\",%s,%s,%s,%s\n",
                $item['line_no'],
                $item['product_code'],
                $item['product_name'],
                $item['price_incl_tax'],
                $item['qty'],
                $item['uom'],
                $item['amt_incl_tax']
            );
        }
        
        return $csvContent;
    }
}
