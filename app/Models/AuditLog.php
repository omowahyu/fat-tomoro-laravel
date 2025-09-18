<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AuditLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'actor',
        'action',
        'resource_type',
        'resource_id',
        'details',
        'changes',
        'ip_address',
        'user_agent',
        'level',
    ];

    protected function casts(): array
    {
        return [
            'details' => 'array',
            'changes' => 'array',
        ];
    }

    // Scopes
    public function scopeByActor($query, string $actor)
    {
        return $query->where('actor', $actor);
    }

    public function scopeByAction($query, string $action)
    {
        return $query->where('action', $action);
    }

    public function scopeByLevel($query, string $level)
    {
        return $query->where('level', $level);
    }

    public function scopeByResource($query, string $resourceType, int $resourceId = null)
    {
        $query = $query->where('resource_type', $resourceType);

        if ($resourceId) {
            $query->where('resource_id', $resourceId);
        }

        return $query;
    }

    public function scopeRecent($query, int $days = 7)
    {
        return $query->where('created_at', '>=', now()->subDays($days));
    }

    // Static methods for logging
    public static function logAction(string $actor, string $action, array $details = [], string $level = 'info'): self
    {
        return self::create([
            'actor' => $actor,
            'action' => $action,
            'details' => $details,
            'level' => $level,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);
    }

    public static function logResourceAction(string $actor, string $action, string $resourceType, int $resourceId, array $details = [], array $changes = [], string $level = 'info'): self
    {
        return self::create([
            'actor' => $actor,
            'action' => $action,
            'resource_type' => $resourceType,
            'resource_id' => $resourceId,
            'details' => $details,
            'changes' => $changes,
            'level' => $level,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);
    }
}
