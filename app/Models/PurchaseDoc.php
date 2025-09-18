<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PurchaseDoc extends Model
{
    use HasFactory;

    protected $fillable = [
        'file_id',
        'source_row_id',
        'doc_type',
        'doc_no',
        'doc_date',
        'supplier_code',
        'warehouse_code',
        'currency',
        'subtotal',
        'tax_total',
        'grand_total',
        'status',
        'posting_ext_id',
        'errors',
    ];

    protected function casts(): array
    {
        return [
            'doc_date' => 'date',
            'subtotal' => 'decimal:2',
            'tax_total' => 'decimal:2',
            'grand_total' => 'decimal:2',
            'errors' => 'array',
        ];
    }

    // Relationships
    public function file(): BelongsTo
    {
        return $this->belongsTo(File::class);
    }

    public function sourceRow(): BelongsTo
    {
        return $this->belongsTo(RawRow::class, 'source_row_id');
    }

    public function items(): HasMany
    {
        return $this->hasMany(PurchaseItem::class);
    }

    // Scopes
    public function scopeByType($query, string $type)
    {
        return $query->where('doc_type', $type);
    }

    public function scopeStaged($query)
    {
        return $query->where('status', 'staged');
    }

    public function scopePosted($query)
    {
        return $query->where('status', 'posted');
    }

    public function scopeFailed($query)
    {
        return $query->where('status', 'failed');
    }

    // Methods
    public function isPosted(): bool
    {
        return $this->status === 'posted';
    }

    public function canPost(): bool
    {
        return $this->status === 'staged' && $this->items()->count() > 0;
    }

    public function calculateTotals(): void
    {
        $this->subtotal = $this->items()->sum('line_total');
        $this->tax_total = $this->items()->whereNotNull('tax_code')->sum('line_total') * 0.11; // Assuming 11% tax
        $this->grand_total = $this->subtotal + $this->tax_total;
        $this->save();
    }
}
