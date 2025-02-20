<?php

namespace Tests\Feature;

use App\Models\Group;
use App\Models\GroupMember;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GroupMemberControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testStoreMember()
    {
        $group = Group::factory()->create();
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->post('/group-members', [
            'group_id' => $group->id
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('group_members', [
            'group_id' => $group->id,
            'user_id' => $user->id
        ]);
    }
}