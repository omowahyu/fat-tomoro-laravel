<?php

use App\Models\File;
use App\Models\RawRow;
use App\Models\MappingItem;
use App\Models\User;
use Illuminate\Foundation\Testing\WithFaker;

it('transforms BOH raw rows into staged purchase docs', function () {
    // Acting as a user with proper role
    $user = User::factory()->create(['role' => 'ADMIN']);
    $this->actingAs($user);

    // Create a BOH file
    $file = File::create([
        'type' => 'boh_purchase',
        'original_name' => 'sample.csv',
        'storage_path' => 'uploads/boh_purchase/2025/01/sample.csv',
        'size_bytes' => 1234,
        'rows_detected' => 1,
        'status' => 'parsed',
        'created_by' => $user->id,
    ]);

    // Create a raw row
    $row = RawRow::create([
        'file_id' => $file->id,
        'row_number' => 1,
        'row_json' => [
            'doc_date' => now()->toDateString(),
            'supplier_code' => 'SUP-001',
            'warehouse_code' => 'WH-01',
            'item_name' => 'ITEM A',
            'qty' => 2,
            'unit_price' => 10000,
            'doc_no' => 'DO-001',
        ],
    ]);

    // Mapping item so item_name maps to a code
    MappingItem::create([
        'source_name' => 'ITEM A',
        'item_code' => 'ITM-001',
        'uom' => 'PCS',
        'confidence' => 100,
        'is_active' => true,
    ]);

    // Call endpoint
    $resp = $this->postJson(route('purchases.process-transform'), [
        'file_id' => $file->id,
    ]);

    $resp->assertSuccessful();

    // Assert staged doc and item exist
    expect(\App\Models\PurchaseDoc::count())->toBe(1);
    expect(\App\Models\PurchaseItem::count())->toBe(1);
});
