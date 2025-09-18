<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TransformedRow extends Model
{
    use HasFactory;

    protected $fillable = [
        'file_id',
        'raw_row_id',
        'normalized_json',
        'valid_flag',
        'errors',
        'warnings',
        'confidence_score',
        'requires_review',
    ];

    protected function casts(): array
    {
        return [
            'normalized_json' => 'array',
            'errors' => 'array',
            'warnings' => 'array',
            'valid_flag' => 'boolean',
            'requires_review' => 'boolean',
            'confidence_score' => 'decimal:4',
        ];
    }

    // Relationships
    public function file(): BelongsTo
    {
        return $this->belongsTo(File::class);
    }

    public function rawRow(): BelongsTo
    {
        return $this->belongsTo(RawRow::class);
    }

    public function postResults(): HasMany
    {
        return $this->hasMany(PostResult::class);
    }

    // Scopes
    public function scopeValid($query)
    {
        return $query->where('valid_flag', true);
    }

    public function scopeInvalid($query)
    {
        return $query->where('valid_flag', false);
    }

    public function scopeRequiresReview($query)
    {
        return $query->where('requires_review', true);
    }

    // Methods
    public function hasErrors(): bool
    {
        return !empty($this->errors);
    }

    public function hasWarnings(): bool
    {
        return !empty($this->warnings);
    }

    public function isHighConfidence(): bool
    {
        return $this->confidence_score && $this->confidence_score >= 0.8;
    }
}
