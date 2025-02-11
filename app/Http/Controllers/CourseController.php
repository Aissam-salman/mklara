<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Appwrite\AppwriteException;
use Appwrite\Client;
use Appwrite\ID;
use Appwrite\InputFile;
use Appwrite\Services\Storage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(): Response
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
    return Inertia::render('Courses/Create');
  }

  /**
   * Store a newly created resource in storage.
   * @throws AppwriteException
   */
  public function store(Request $request): RedirectResponse
  {
    $validated = $request->validate([
      'title' => 'required|string',
      'description' => 'required|string',
      'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp',
    ]);


    $client = new Client();
    $client->setEndpoint(env('APPWRITE_ENDPOINT'))
      ->setProject(env('APPWRITE_PROJECT_ID'))
      ->setKey(env('APPWRITE_API_KEY'));

    $storage = new Storage($client);

    $file = $request->file('image');

    if  ($file) {
      $fileId = ID::unique();

      $storage->createFile(
        bucketId:  env('APPWRITE_STORAGE_BUCKET_ID'),
        fileId: $fileId,
        file: InputFile::withPath($file->getPathname())
      );

      $fileUrl = sprintf(
        'https://cloud.appwrite.io/v1/storage/buckets/%s/files/%s/view?project=%s',
        env('APPWRITE_STORAGE_BUCKET_ID'),
        $fileId,
        env('APPWRITE_PROJECT_ID')
      );
      //TODO: transformer en function utilitaires

      Course::create([
        'title' => $validated['title'],
        'description' => $validated['description'],
        'image' => $fileUrl,
      ]);
    } else {
       Course::create($validated);
    }




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
