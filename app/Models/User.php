<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Role-based methods
    public function isOps(): bool
    {
        return $this->role === 'OPS';
    }

    public function isFatPsm(): bool
    {
        return $this->role === 'FAT_PSM';
    }

    public function isAdmin(): bool
    {
        return $this->role === 'ADMIN';
    }

    public function canUpload(): bool
    {
        return in_array($this->role, ['OPS', 'FAT_PSM', 'ADMIN']);
    }

    public function canApproveMapping(): bool
    {
        return in_array($this->role, ['FAT_PSM', 'ADMIN']);
    }

    public function canPostToAccurate(): bool
    {
        return in_array($this->role, ['FAT_PSM', 'ADMIN']);
    }

    public function canManageSystem(): bool
    {
        return $this->role === 'ADMIN';
    }
}
