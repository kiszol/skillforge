<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Database\Eloquent\BroadcastsEvents;

class Course extends Model
{
    use HasFactory, BroadcastsEvents;

    protected $fillable = [
        'title',
        'description',
        'status',
        'start_date',
        'end_date',
        'max_students',
        'instructor_id'
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'max_students' => 'integer'
    ];

    // Relationships
    public function instructor()
    {
        return $this->belongsTo(Instructor::class);
    }

    public function students()
    {
        return $this->belongsToMany(Student::class, 'course_student')
                    ->withTimestamps();
    }

    // Broadcasting
    public function broadcastOn(string $event): array
    {
        return [
            new PrivateChannel('courses'),
        ];
    }

    // Scopok kereséshez és szűréshez
    public function scopeSearch($query, $search)
    {
        if ($search) {
            return $query->where('title', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%")
                        ->orWhere('status', 'like', "%{$search}%");
        }
        return $query;
    }

    public function scopeSort($query, $sortBy, $sortDirection)
    {
        $allowedSorts = ['id', 'title', 'status', 'start_date', 'end_date', 'created_at'];
        $sortBy = in_array($sortBy, $allowedSorts) ? $sortBy : 'id';
        $sortDirection = in_array(strtolower($sortDirection), ['asc', 'desc']) ? $sortDirection : 'asc';

        return $query->orderBy($sortBy, $sortDirection);
    }
}