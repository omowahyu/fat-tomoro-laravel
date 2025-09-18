<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PostResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'batch_id',
        'transformed_row_id',
        'endpoint',
        'status',
        'request_payload',
        'response_data',
        'http_status_code',
        'error_message',
        'accurate_transaction_id',
        'processing_time_ms',
        'retry_count',
        'last_retry_at',
    ];

    protected function casts(): array
    {
        return [
            'request_payload' => 'array',
            'response_data' => 'array',
            'processing_time_ms' => 'decimal:2',
            'last_retry_at' => 'datetime',
        ];
    }

    // Relationships
    public function batch(): BelongsTo
    {
        return $this->belongsTo(Batch::class);
    }

    public function transformedRow(): BelongsTo
    {
        return $this->belongsTo(TransformedRow::class);
    }

    // Scopes
    public function scopeSuccessful($query)
    {
        return $query->where('status', 'success');
    }

    public function scopeFailed($query)
    {
        return $query->where('status', 'failed');
    }

    public function scopeByEndpoint($query, string $endpoint)
    {
        return $query->where('endpoint', $endpoint);
    }

    // Methods
    public function isSuccessful(): bool
    {
        return $this->status === 'success';
    }

    public function isFailed(): bool
    {
        return $this->status === 'failed';
    }

    public function canRetry(): bool
    {
        return $this->status === 'failed' && $this->retry_count < 3;
    }
}
