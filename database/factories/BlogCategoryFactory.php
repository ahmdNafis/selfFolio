<?php

namespace Database\Factories;

use App\Models\BlogCategory;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BlogCategory>
 */
class BlogCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'blog_category_title' => fake()->words(2, true),
            'blog_category_description' => fake()->text(6),
            'blog_category_activity' => fake()->boolean(60),
        ];
    }
}
