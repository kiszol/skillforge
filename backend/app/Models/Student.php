<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Broadcasting\PrivateChannel;

class Student extends Model
{
    use HasFactory, BroadcastsEvents;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'enrollment_date'
    ];

    protected $casts = [
        'enrollment_date' => 'date'
    ];

    // Relationships
    public function courses()
    {
        return $this->belongsToMany(Course::class, 'course_student')
                    ->withTimestamps();
    }

    // Broadcasting
    public function broadcastOn(string $event): array
    {
        return [
            new PrivateChannel('students'),
        ];
    }

    // Scopok
    public function scopeSearch($query, $search)
    {
        if ($search) {
            return $query->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('phone', 'like', "%{$search}%");
        }
        return $query;
    }

    public function scopeSort($query, $sortBy, $sortDirection)
    {
        $allowedSorts = ['id', 'name', 'email', 'enrollment_date', 'created_at'];
        $sortBy = in_array($sortBy, $allowedSorts) ? $sortBy : 'id';
        $sortDirection = in_array(strtolower($sortDirection), ['asc', 'desc']) ? $sortDirection : 'asc';

        return $query->orderBy($sortBy, $sortDirection);
    }
}