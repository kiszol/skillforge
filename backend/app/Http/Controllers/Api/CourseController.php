<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource with pagination, search, and sorting.
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 15);
        $search = $request->input('search');
        $sortBy = $request->input('sort_by', 'id');
        $sortDirection = $request->input('sort_direction', 'asc');

        $courses = Course::with(['instructor', 'students'])
            ->search($search)
            ->sort($sortBy, $sortDirection)
            ->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $courses->items(),
            'pagination' => [
                'current_page' => $courses->currentPage(),
                'per_page' => $courses->perPage(),
                'total' => $courses->total(),
                'last_page' => $courses->lastPage(),
                'from' => $courses->firstItem(),
                'to' => $courses->lastItem(),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:draft,active,completed,cancelled',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'max_students' => 'required|integer|min:1',
            'instructor_id' => 'required|exists:instructors,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $course = Course::create($request->all());
        $course->load(['instructor', 'students']);

        return response()->json([
            'success' => true,
            'message' => 'Course created successfully',
            'data' => $course
        ], 201);
    }

    /**
     * Display the specified resource.
     * 
     * @param Course $course
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Course $course)
    {
        $course->load(['instructor', 'students']);

        return response()->json([
            'success' => true,
            'data' => $course
        ]);
    }

    /**
     * Update the specified resource in storage.
     * 
     * @param Request $request
     * @param Course $course
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Course $course)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'sometimes|required|in:draft,active,completed,cancelled',
            'start_date' => 'sometimes|required|date',
            'end_date' => 'sometimes|required|date|after:start_date',
            'max_students' => 'sometimes|required|integer|min:1',
            'instructor_id' => 'sometimes|required|exists:instructors,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $course->update($request->all());
        $course->load(['instructor', 'students']);

        return response()->json([
            'success' => true,
            'message' => 'Course updated successfully',
            'data' => $course
        ]);
    }

    /**
     * Remove the specified resource from storage.
     * 
     * @param Course $course
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Course $course)
    {
        $course->delete();

        return response()->json([
            'success' => true,
            'message' => 'Course deleted successfully'
        ]);
    }

    /**
     * Attach students to a course.
     * 
     * @param Request $request
     * @param Course $course
     * @return \Illuminate\Http\JsonResponse
     */
    public function attachStudents(Request $request, Course $course)
    {
        $validator = Validator::make($request->all(), [
            'student_ids' => 'required|array',
            'student_ids.*' => 'exists:students,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $course->students()->syncWithoutDetaching($request->student_ids);
        $course->load('students');

        return response()->json([
            'success' => true,
            'message' => 'Students attached successfully',
            'data' => $course
        ]);
    }

    /**
     * Detach students from a course.
     * 
     * @param Request $request
     * @param Course $course
     * @return \Illuminate\Http\JsonResponse
     */
    public function detachStudents(Request $request, Course $course)
    {
        $validator = Validator::make($request->all(), [
            'student_ids' => 'required|array',
            'student_ids.*' => 'exists:students,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $course->students()->detach($request->student_ids);
        $course->load('students');

        return response()->json([
            'success' => true,
            'message' => 'Students detached successfully',
            'data' => $course
        ]);
    }
}