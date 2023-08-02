<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contact>
 */
class ContactFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'submission_date' => fake()->date('Y-m-d'),
            'message_title' => fake()->sentence(),
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'cellphone' => fake()->phoneNumber(),
            'message_body' => fake()->paragraphs(3, true),
        ];
    }
}
