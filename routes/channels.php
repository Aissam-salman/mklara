<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\Group;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('group-messages.{groupId}', function ($user, $groupId) {
    $group = Group::find($groupId);
    return $group && $group->members->contains($user->id);
});

