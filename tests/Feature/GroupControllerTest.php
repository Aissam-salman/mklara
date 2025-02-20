<?php

namespace Tests\Feature;

use App\Models\Group;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GroupControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testIndexRoute()
    {
        $response = $this->get('/groups');
        $response->assertStatus(302);
    }

    public function testCreateRoute()
    {
        $response = $this->get('/groups/create');
        $response->assertStatus(302);
    }

    public function testStoreRoute()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->post('/groups', [
            'name' => 'New Group',
            'description' => 'A new group description',
        ]);

        $response->assertRedirect('/groups');
        $this->assertDatabaseHas('groups', ['name' => 'New Group']);
    }

    public function testShowRoute()
    {
        $group = Group::factory()->create();

        $response = $this->get("/groups/{$group->id}");
        $response->assertStatus(302);
    }

    public function testEditRoute()
    {
        $group = Group::factory()->create();

        $response = $this->get("/groups/{$group->id}/edit");
        $response->assertStatus(302);
    }

    public function testUpdateRoute()
    {
        $group = Group::factory()->create();
        $user = User::factory()->create();
        $user->role = "admin";
        $this->actingAs($user);

        $response = $this->put("/groups/{$group->id}", [
            'name' => 'Updated Name',
            'description' => 'Updated description',
        ]);

        $response->assertRedirect('/groups');
        $this->assertDatabaseHas('groups', ['name' => 'Updated Name']);
    }

    public function testDeleteRoute()
    {
        $group = Group::factory()->create();
        $user = User::factory()->create();
        $user->role = "admin";
        $this->actingAs($user);

        $response = $this->delete("/groups/{$group->id}");
        $response->assertRedirect('/groups');
        $this->assertDatabaseMissing('groups', ['id' => $group->id]);
    }
}