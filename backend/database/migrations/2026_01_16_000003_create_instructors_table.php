<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $perPage = (int) $request->input('per_page', 15);
        $q = $request->input('q');
        $sortBy = $request->input('sort_by', 'created_at');
        $sortDir = strtolower($request->input('sort_dir', 'desc')) === 'asc' ? 'asc' : 'desc';

        $allowedSort = ['id','first_name','last_name','created_at'];
        if (! in_array($sortBy, $allowedSort, true)) {
            $sortBy = 'created_at';
        }

        $query = Student::with('courses');

        if ($q) {
            $query->where(function ($sub) use ($q) {
                $sub->where('first_name', 'like', "%{$q}%")
                    ->orWhere('last_name', 'like', "%{$q}%")
                    ->orWhere('email', 'like', "%{$q}%");
            });
        }

        $paginator = $query->orderBy($sortBy, $sortDir)->paginate($perPage);

        return $this->paginated($paginator);
    }

    public function show(Student $student)
    {
        return $this->success($student->load('courses'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'nullable|string',
            'email' => 'required|email|unique:students,email',
            'course_ids' => 'nullable|array',
            'course_ids.*' => 'exists:courses,id',
        ]);

        $student = Student::create($data);
        if (!empty($data['course_ids'])) {
            $student->courses()->sync($data['course_ids']);
        }

        return $this->success($student->load('courses'), '', 201);
    }

    public function update(Request $request, Student $student)
    {
        $data = $request->validate([
            'first_name' => 'sometimes|required|string',
            'last_name' => 'nullable|string',
            'email' => 'sometimes|required|email|unique:students,email,' . $student->id,
            'course_ids' => 'nullable|array',
            'course_ids.*' => 'exists:courses,id',
        ]);

        $student->update($data);

        if (array_key_exists('course_ids', $data)) {
            $student->courses()->sync($data['course_ids'] ?? []);
        }

        return $this->success($student->load('courses'));
    }

    public function destroy(Student $student)
    {
        $student->delete();
        return $this->success(null, 'Deleted', 204);
    }
}