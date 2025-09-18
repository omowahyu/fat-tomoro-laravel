<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SalesOrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'file_id',
        'line_no',
        'product_code',
        'product_name',
        'price_incl_tax',
        'qty',
        'uom',
        'amt_incl_tax',
    ];

    protected function casts(): array
    {
        return [
            'price_incl_tax' => 'decimal:2',
            'qty' => 'decimal:3',
            'amt_incl_tax' => 'decimal:2',
        ];
    }

    // Relationships
    public function file(): BelongsTo
    {
        return $this->belongsTo(File::class);
    }
}
