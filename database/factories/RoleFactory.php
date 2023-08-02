<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Role;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Role>
 */
class RoleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Role::class;
    public function definition()
    {
        return [
            'role_title' => $this->faker->words(2, true),
            'role_activity' => $this->faker->boolean(70),
        ];
    }
}
