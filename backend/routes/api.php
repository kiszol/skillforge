<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\InstructorController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::middleware('api')->group(function () {
    
    // Courses endpoints
    Route::apiResource('courses', CourseController::class);
    Route::post('courses/{course}/students/attach', [CourseController::class, 'attachStudents']);
    Route::post('courses/{course}/students/detach', [CourseController::class, 'detachStudents']);
    
    // Students endpoints
    Route::apiResource('students', StudentController::class);
    
    // Instructors endpoints
    Route::apiResource('instructors', InstructorController::class);
});