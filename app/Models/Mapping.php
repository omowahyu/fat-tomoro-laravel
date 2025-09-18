<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Mapping extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'source',
        'target',
        'confidence',
        'rules',
        'is_active',
        'version',
        'created_by_type',
        'created_by_user',
        'last_used_at',
        'usage_count',
    ];

    protected function casts(): array
    {
        return [
            'rules' => 'array',
            'confidence' => 'decimal:4',
            'is_active' => 'boolean',
            'last_used_at' => 'datetime',
        ];
    }

    // Relationships
    public function createdByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_user');
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByType($query, string $type)
    {
        return $query->where('type', $type);
    }

    public function scopeBySource($query, string $source)
    {
        return $query->where('source', 'like', "%{$source}%");
    }

    // Methods
    public function incrementUsage(): void
    {
        $this->increment('usage_count');
        $this->update(['last_used_at' => now()]);
    }

    public function isHighConfidence(): bool
    {
        return $this->confidence >= 0.8;
    }
}
