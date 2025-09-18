<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class Batch extends Model
{
    use HasFactory;

    protected $fillable = [
        'file_id',
        'status',
        'idempotency_key',
        'endpoint_type',
        'total_records',
        'successful_records',
        'failed_records',
        'batch_meta',
        'started_at',
        'completed_at',
        'retry_count',
        'next_retry_at',
    ];

    protected function casts(): array
    {
        return [
            'batch_meta' => 'array',
            'started_at' => 'datetime',
            'completed_at' => 'datetime',
            'next_retry_at' => 'datetime',
        ];
    }

    // Relationships
    public function file(): BelongsTo
    {
        return $this->belongsTo(File::class);
    }

    public function postResults(): HasMany
    {
        return $this->hasMany(PostResult::class);
    }

    // Scopes
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeProcessing($query)
    {
        return $query->where('status', 'processing');
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    public function scopeFailed($query)
    {
        return $query->where('status', 'failed');
    }

    public function scopeReadyForRetry($query)
    {
        return $query->where('status', 'failed')
            ->where('next_retry_at', '<=', now());
    }

    // Methods
    public function generateIdempotencyKey(): string
    {
        return Str::uuid()->toString();
    }

    public function getSuccessRateAttribute(): float
    {
        if ($this->total_records === 0) {
            return 0;
        }

        return round(($this->successful_records / $this->total_records) * 100, 2);
    }

    public function canRetry(): bool
    {
        return $this->status === 'failed' && $this->retry_count < 3;
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($batch) {
            if (empty($batch->idempotency_key)) {
                $batch->idempotency_key = $batch->generateIdempotencyKey();
            }
        });
    }
}
