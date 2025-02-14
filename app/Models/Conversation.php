<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Conversation extends Model
{
    use HasFactory;
    protected $fillable = [
        'created_at',
        'updated_at',
    ] ;

    public function user(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'conversation_user');
    }

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class);
    }

}
