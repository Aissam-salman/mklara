<?php

namespace App\Events;

use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\GroupMessage;
use Illuminate\Broadcasting\InteractsWithSockets;

class GroupMessageSent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * The GroupMessage instance.
     *
     * @var \App\Models\GroupMessage
     */
    public $groupMessage;

    /**
     * Create a new event instance.
     */
    public function __construct(GroupMessage $groupMessage)
    {
        // Charge la relation user avant sérialisation
        $groupMessage->load(['user' => function ($query) {
            $query->select('id', 'name'); // Optimise la requête
        }]);

        $this->groupMessage = $groupMessage;
    }

    /**
     * Get the channels the event should broadcast on.
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('group-messages.' . $this->groupMessage->group_id),
        ];
    }


    /**
     * Données de broadcast
     */
    public function broadcastWith(): array
    {
        return [
            'id' => $this->groupMessage->id,
            'content' => $this->groupMessage->content,
            'user' => [
                'id' => $this->groupMessage->user->id,
                'name' => $this->groupMessage->user->name
            ],
            'created_at' => $this->groupMessage->created_at->toISOString() // Format standard
        ];
    }
}