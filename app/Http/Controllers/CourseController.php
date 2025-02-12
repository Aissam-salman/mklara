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
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(): Response
  {
    $courses = Course::orderBy('order', 'asc')->get();

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
      'order' => 'required|integer',
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
        'order' => $validated['order'],
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
    $course->load('sections.chapters.exercises');
    return Inertia::render('Courses/Show', ['course' => $course]);
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
   * @throws ValidationException
   */
  public function update(Request $request, Course $course): RedirectResponse
  {
    Gate::authorize('update', $course);


    $validator = Validator::make($request->all(), [
      'title' => 'string',
      'description' => 'string',
      'image' => [
        'nullable',
        function ($attribute, $value, $fail) use ($request) {
          if ($request->hasFile('image')) {
            // Validation pour un fichier
            $validator = Validator::make(
              ['image' => $request->file('image')],
              ['image' => 'file|mimes:jpeg,png,jpg,gif,svg,webp']
            );

            if ($validator->fails()) {
              $fail($validator->errors()->first('image'));
            }
          } else if ($value) {
            // Validation pour une URL
            $validator = Validator::make(
              ['image' => $value],
              ['image' => 'string|url']
            );

            if ($validator->fails()) {
              $fail($validator->errors()->first('image'));
            }
          }
        }
      ],
      'order' => 'integer',
    ]);

    $validated = $validator->validate();


    $dataToUpdate = [];

    if ($request->has('title') && $request->title !== $course->title) {
      $dataToUpdate['title'] = $validated['title'];
    }
    if ($request->has('description') && $request->description !== $course->description) {
      $dataToUpdate['description'] = $validated['description'];
    }
    if ($request->has('order') && (int)$request->order !== $course->order) {
      $dataToUpdate['order'] = $validated['order'];
    }

    if ($request->hasFile('image')) {
      try {
        $client = new Client();
        $client->setEndpoint(env('APPWRITE_ENDPOINT'))
          ->setProject(env('APPWRITE_PROJECT_ID'))
          ->setKey(env('APPWRITE_API_KEY'));

        $storage = new Storage($client);

        if ($course->image) {
          $oldFileId = Str::before(Str::after($course->image, 'files/'), '/view');
          try {
            $storage->deleteFile(
              bucketId: env('APPWRITE_STORAGE_BUCKET_ID'),
              fileId: $oldFileId
            );
          } catch (\Exception $e) {
            \Log::error('Erreur lors de la suppression de l\'ancienne image: ' . $e->getMessage());
          }
        }

        $file = $request->file('image');
        $fileId = ID::unique();

        $res = $storage->createFile(
          bucketId: env('APPWRITE_STORAGE_BUCKET_ID'),
          fileId: $fileId,
          file: InputFile::withPath($file->getPathname())
        );

        $fileUrl = sprintf(
          'https://cloud.appwrite.io/v1/storage/buckets/%s/files/%s/view?project=%s',
          env('APPWRITE_STORAGE_BUCKET_ID'),
          $fileId,
          env('APPWRITE_PROJECT_ID')
        );

        $dataToUpdate['image'] = $fileUrl;
      } catch (\Exception $e) {
        return redirect()
          ->route('courses.index')
          ->with('error', 'Erreur lors de l\'upload de l\'image: ' . $e->getMessage());
      }
    }


    try {
      $course->update($dataToUpdate);
      return redirect()
        ->route('courses.index')
        ->with('success', 'Cours mis à jour avec succès');
    } catch (\Exception $e) {
      return redirect()
        ->route('courses.index')
        ->with('error', 'Erreur lors de la mise à jour du cours: ' . $e->getMessage());
    }
  }


  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Course $course): RedirectResponse
  {
    Gate::authorize('delete', $course);
    $course->delete();
    return redirect()->route('courses.index');
  }
}
