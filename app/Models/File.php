<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class File extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'original_name',
        'storage_path',
        'size_bytes',
        'rows_detected',
        'status',
        'meta',
        'created_by',
        'processed_at',
    ];

    protected function casts(): array
    {
        return [
            'meta' => 'array',
            'processed_at' => 'datetime',
        ];
    }

    // Relationships
    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function rawRows(): HasMany
    {
        return $this->hasMany(RawRow::class);
    }

    public function transformedRows(): HasMany
    {
        return $this->hasMany(TransformedRow::class);
    }

    public function batches(): HasMany
    {
        return $this->hasMany(Batch::class);
    }

    public function purchaseDocs(): HasMany
    {
        return $this->hasMany(PurchaseDoc::class);
    }

    public function salesDocs(): HasMany
    {
        return $this->hasMany(SalesDoc::class);
    }

    public function bankRows(): HasMany
    {
        return $this->hasMany(BankRow::class);
    }

    public function salesOrderItems(): HasMany
    {
        return $this->hasMany(SalesOrderItem::class);
    }

    // Scopes
    public function scopeByType($query, string $type)
    {
        return $query->where('type', $type);
    }

    public function scopeByStatus($query, string $status)
    {
        return $query->where('status', $status);
    }

    // Accessors
    public function getValidationRateAttribute(): float
    {
        if (!$this->rows_detected || $this->rows_detected === 0) {
            return 0;
        }

        $validRows = $this->transformedRows()->where('valid_flag', true)->count();
        return round(($validRows / $this->rows_detected) * 100, 2);
    }

    // Helper methods
    public function isPurchaseType(): bool
    {
        return $this->type === 'boh_purchase';
    }

    public function isSalesType(): bool
    {
        return $this->type === 'bi_sales';
    }

    public function isBankType(): bool
    {
        return $this->type === 'bank_statement';
    }
}
