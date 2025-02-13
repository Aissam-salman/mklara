<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;


class ChapterController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    //
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {

  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request): RedirectResponse
  {
    $validated = $request->validate([
      'title' => 'required|string',
      'content' => 'required|string',
      'section_id' => 'required|exists:sections,id',
      'order' => 'required|integer',
    ]);

    Chapter::create($validated);

    return redirect()->route('sections.show', $validated['section_id']);
  }

  /**
   * Display the specified resource.
   */
  public function show(Chapter $chapter)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Chapter $chapter)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Chapter $chapter)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Chapter $chapter)
  {
    //
  }
}
