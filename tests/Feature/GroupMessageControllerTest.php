<?php

namespace Tests\Feature;

use App\Models\Group;
use App\Models\GroupMessage;
use App\Models\User;
use App\Models\GroupMember;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GroupMessageControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testStoreMessage()
    {
        $groupMessage = GroupMessage::factory()->create();


        // Simulez la requête POST pour créer un message
        $response = $this->post(route('group-messages.store', ['group' => $groupMessage->group_id]), [
            'content' => $groupMessage->content,
            'user_id' => $groupMessage->user_id
        ]);

        // Vérifiez que le message est bien créé dans la base de données
        $this->assertDatabaseHas('group_messages', [
            'content' => $groupMessage->content,
            'user_id' => $groupMessage->user_id,
            'group_id' => $groupMessage->group_id
        ]);
    }

    public function testDeleteMessage()
    {
        $user = User::factory()->create();
        $groupMessage = GroupMessage::factory()->create(['user_id' => $user->id]);
        $this->actingAs($user);

        $response = $this->delete("/group-messages/{$groupMessage->id}");
        $response->assertRedirect();
        $this->assertDatabaseMissing('group_messages', ['id' => $groupMessage->id]);
    }
}