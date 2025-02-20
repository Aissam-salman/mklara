<?php

namespace Database\Factories;

use App\Models\GroupMember;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GroupMember>
 */
class GroupMemberFactory extends Factory
{
    protected $model = GroupMember::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'group_id' => \App\Models\Group::factory(),
            'user_id' => \App\Models\User::factory(),
            'role' => $this->faker->randomElement(['member', 'moderator']),
            'joined_at' => $this->faker->dateTimeBetween('-1 year', 'now')
        ];
    }
}
