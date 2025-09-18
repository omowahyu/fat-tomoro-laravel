<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PurchaseItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'purchase_doc_id',
        'line_no',
        'item_code',
        'item_name_src',
        'uom',
        'qty',
        'unit_price',
        'line_total',
        'tax_code',
        'meta',
    ];

    protected function casts(): array
    {
        return [
            'qty' => 'decimal:4',
            'unit_price' => 'decimal:4',
            'line_total' => 'decimal:2',
            'meta' => 'array',
        ];
    }

    // Relationships
    public function purchaseDoc(): BelongsTo
    {
        return $this->belongsTo(PurchaseDoc::class);
    }

    // Methods
    public function calculateLineTotal(): void
    {
        $this->line_total = $this->qty * $this->unit_price;
        $this->save();
    }

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($item) {
            $item->line_total = $item->qty * $item->unit_price;
        });
    }
}
