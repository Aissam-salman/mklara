<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reaction extends Model
{
    protected $fillable = [
        'group_messages_id',
        'user_id',
        'type'
    ];

    /**
     * Get the user that owns the Reaction
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function groupMessage(): BelongsTo
    {
        return $this->belongsTo(Message::class);
    }
}
