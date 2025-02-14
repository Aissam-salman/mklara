<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use App\Models\Chapter;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ExerciseController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request): Response
  {
    $exercises = Exercise::where('chapter_id', $request->chapter_id)
      ->paginate(1);

    return Inertia::render('Courses/Sections/Chapters/Exercises/Index', [
      'chapter_id' => $request->chapter_id,
      'exercises' => $exercises
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
  public function store(Request $request): RedirectResponse
  {
    $validated = $request->validate([
      'question' => 'required|string',
      'answer' => 'required|string',
      'chapter_id' => 'required|exists:chapters,id'
    ]);

    Exercise::create($validated);

    return redirect()->back();
  }

  /**
   * Display the specified resource.
   */
  public function show(Exercise $exercise)
  {
    return Inertia::render('Courses/Sections/Chapters/Exercises/Show', [
        'exercise' => $exercise,
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Exercise $exercise)
  {
     return Inertia::render('Courses/Sections/Chapters/Exercises/Edit', [
      'exercise' => $exercise,
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Exercise $exercise)
  {
    $validated = $request->validate([
      'question' => 'string',
      'answer' => 'string',
    ]);
    $exercise->update($validated);
    return redirect()->back()->with('success', 'Exercice mis à jour avec succès !');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Exercise $exercise): RedirectResponse
  {
    $exercise->delete();
    return redirect()->back();
  }
}
