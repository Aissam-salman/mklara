<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserProgress extends Model
{
  use HasFactory;

  protected $fillable = [
    'user_id',
    'chapter_id',
    'progress',
    'last_viewed_at',
  ];

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }

  public function chapter(): BelongsTo
  {
    return $this->belongsTo(Chapter::class);
  }
}
