<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RawRow extends Model
{
    use HasFactory;

    protected $fillable = [
        'file_id',
        'row_number',
        'row_json',
        'row_hash',
    ];

    protected function casts(): array
    {
        return [
            'row_json' => 'array',
        ];
    }

    // Relationships
    public function file(): BelongsTo
    {
        return $this->belongsTo(File::class);
    }

    public function transformedRow(): HasOne
    {
        return $this->hasOne(TransformedRow::class);
    }

    // Methods
    public function generateHash(): string
    {
        return hash('sha256', json_encode($this->row_json));
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($rawRow) {
            if (empty($rawRow->row_hash)) {
                $rawRow->row_hash = $rawRow->generateHash();
            }
        });
    }
}
