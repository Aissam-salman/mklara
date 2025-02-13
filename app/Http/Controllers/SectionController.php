<?php

namespace App\Http\Controllers;

use App\Models\Section;
use App\Models\Chapter;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;


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
    return Inertia::render('Courses/Sections/Index', [
      'section' => $section->load('course'),
      'chapters' => Chapter::where('section_id', $section->id)
        ->orderBy('order', 'asc')
        ->paginate(1)
    ]);
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
  public function update(Request $request, Section $section): RedirectResponse
  {
    Gate::authorize('update', $section);

    $validated = $request->validate([
      'title' => 'required|string',
      'order' => 'required|integer',
    ]);

    $dataToUpdate = [];

    if ($request->has('title') && $request->title !== $section->title) {
      $dataToUpdate['title'] = $validated['title'];
    }
    if ($request->has('order') && (int)$request->order !== $section->order) {
      $dataToUpdate['order'] = $validated['order'];
    }

    if (count($dataToUpdate) > 0) {
      $section->update($dataToUpdate);
    }
    return redirect()->route('courses.show', $section->course_id);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Section $section)
  {
    Gate::authorize('delete', $section);

    $section->delete();

    return redirect()->route('courses.show', $section->course_id);
  }
}
