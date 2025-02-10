<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $courses = Course::all();

    return Inertia::render('Courses/Index', [
      'courses' => $courses
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $validated = $request->validate([
      'title' => 'required|string',
      'description' => 'required|string',
      'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg',
    ]);

    $course = Course::create($validated);

    return redirect()->route('courses.index');
  }

  /**
   * Display the specified resource.
   */
  public function show(Course $course)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Course $course)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Course $course)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Course $course)
  {
    //
  }
}
