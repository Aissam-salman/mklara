<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\GroupMessageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfilePhotoController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\ChapterController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\GroupMemberController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
  return Inertia::render('Welcome', [
    'canLogin' => Route::has('login'),
    'canRegister' => Route::has('register'),
    'laravelVersion' => Application::VERSION,
    'phpVersion' => PHP_VERSION,
  ]);
});

Route::get('/dashboard', function () {
  return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
  Route::post('/profile/photo', [ProfilePhotoController::class, 'update'])->name('profile.photo.update');
});

Route::resource('courses', CourseController::class)
  ->middleware(['auth', 'verified']);

Route::post('courses/{course}', [CourseController::class, 'update'])
  ->name('courses.update')
  ->middleware(['auth', 'verified']);

Route::resource('sections', SectionController::class)
  ->only(['store', 'update', 'destroy', 'show', 'index'])
  ->middleware(['auth', 'verified']);

Route::get('/courses/{course}/sections', [SectionController::class, 'index'])
  ->name('sections.index')
  ->middleware(['auth', 'verified']);

Route::resource('chapters', ChapterController::class)->middleware(['auth']);
Route::resource('exercises', ExerciseController::class)->middleware(['auth']);


Route::resource('groups', GroupController::class)->middleware(['auth']);

Route::post('groups/{group}', [GroupController::class, 'update'])
  ->name('groups.update')
  ->middleware(['auth', 'verified']);

Route::post('/group-members', [GroupMemberController::class, 'store'])
  ->name('group-members.store')
  ->middleware('auth');

Route::middleware(['auth'])->group(function () {
  Route::post('/groups/{group}/messages', [GroupMessageController::class, 'store'])
    ->name('group-messages.store');

  Route::patch('/group-messages/{group_message}', [GroupMessageController::class,'update'])
  ->name('group-messages.update');

  Route::delete('/group-messages/{group_message}', [GroupMessageController::class, 'destroy'])->name('group-messages.destroy');
});

require __DIR__ . '/auth.php';
