<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Chapter extends Model
{
  use HasFactory;

  protected $fillable = [
    'title',
    'section_id',
    'order',
    'content'
  ];

  public function section(): BelongsTo
  {
    return $this->belongsTo(Section::class);
  }

  public function exercises(): HasMany
  {
    return $this->hasMany(Exercise::class);
  }
}
