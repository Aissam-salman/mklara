<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Exercise extends Model
{
  use HasFactory;

  protected $fillable = [
    'question',
    'answer',
    'chapter_id',
  ];

  public function chapter(): BelongsTo
  {
    return $this->belongsTo(Chapter::class);
  }
}
