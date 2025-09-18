<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MappingColumn extends Model
{
    use HasFactory;

    protected $fillable = [
        'source_context',
        'source_field',
        'target_field',
        'pattern',
        'confidence',
        'is_active',
        'version',
        'updated_by',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'confidence' => 'integer',
        ];
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeForContext($query, string $context)
    {
        return $query->where('source_context', $context);
    }
}
