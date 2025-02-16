<?php

namespace App\Policies;

use App\Models\GroupMessage;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class GroupMessagePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, GroupMessage $groupMessage): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, GroupMessage $groupMessage): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, GroupMessage $groupMessage): bool
    {
        // L'admin peut tout supprimer
        if ($user->role === 'admin') {
            return true;
        }

        // Un utilisateur peut supprimer ses propres messages
        return $user->id === $groupMessage->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, GroupMessage $groupMessage): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, GroupMessage $groupMessage): bool
    {
        return false;
    }
}
