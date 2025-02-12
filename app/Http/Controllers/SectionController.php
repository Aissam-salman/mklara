<?php

namespace App\Http\Controllers;

use App\Models\Section;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class SectionController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
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
  public function store(Request $request): RedirectResponse
  {
    $validated = $request->validate([
      'title' => 'required|string',
      'order' => 'required|integer',
      'course_id' => 'required|integer',
    ]);

    Section::create($validated);

    return redirect()->route('courses.show', $validated['course_id']);
  }

  /**
   * Display the specified resource.
   */
  public function show(Section $section)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Section $section)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Section $section)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Section $section)
  {
    //
  }
}
