<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class GroupMessage extends Model
{
    protected $fillable = [
        'group_id',
        'user_id',
        'content',
        'parent_message_id',
    ];

    /**
     * Get the user that owns the GroupMessage
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }

    public function reactions(): HasMany
    {
        return $this->hasMany(Reaction::class);
    }

    public function parentMessage()
    {
        return $this->belongsTo(GroupMessage::class, 'parent_message_id');
    }

    public function replies()
    {
        return $this->hasMany(GroupMessage::class, 'parent_message_id');
    }
}
