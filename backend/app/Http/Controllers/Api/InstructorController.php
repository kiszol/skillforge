<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Instructor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class InstructorController extends Controller
{
    /**
     * Display a listing of the resource with pagination, search, and sorting.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 15);
        $search = $request->input('search');
        $sortBy = $request->input('sort_by', 'id');
        $sortDirection = $request->input('sort_direction', 'asc');

        $instructors = Instructor::with('courses')
            ->search($search)
            ->sort($sortBy, $sortDirection)
            ->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $instructors->items(),
            'pagination' => [
                'current_page' => $instructors->currentPage(),
                'per_page' => $instructors->perPage(),
                'total' => $instructors->total(),
                'last_page' => $instructors->lastPage(),
                'from' => $instructors->firstItem(),
                'to' => $instructors->lastItem(),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:instructors,email',
            'phone' => 'nullable|string|max:20',
            'specialization' => 'nullable|string|max:255',
            'bio' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $instructor = Instructor::create($request->all());
        $instructor->load('courses');

        return response()->json([
            'success' => true,
            'message' => 'Instructor created successfully',
            'data' => $instructor
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Instructor $instructor)
    {
        $instructor->load('courses');

        return response()->json([
            'success' => true,
            'data' => $instructor
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Instructor $instructor)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:instructors,email,' . $instructor->id,
            'phone' => 'nullable|string|max:20',
            'specialization' => 'nullable|string|max:255',
            'bio' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $instructor->update($request->all());
        $instructor->load('courses');

        return response()->json([
            'success' => true,
            'message' => 'Instructor updated successfully',
            'data' => $instructor
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Instructor $instructor)
    {
        $instructor->delete();

        return response()->json([
            'success' => true,
            'message' => 'Instructor deleted successfully'
        ]);
    }
}