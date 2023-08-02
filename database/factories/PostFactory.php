<?php

namespace Database\Factories;

use App\Models\BlogCategory;
use App\Models\User;
use App\Models\Post;
 
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Post::class;

    public function definition()
    {
        return [
            'published_date' => fake()->date('Y-m-d'),
            'heading' => fake()->words(3, true),
            'description' => fake()->text(5),
            'body' => fake()->paragraphs(4, true),
            'published' => fake()->boolean(60),
            'image_url' => fake()->url(),
            'blog_category_id' => rand(1, BlogCategory::all()->last()->id),
            'user_id' => rand(1, User::all()->last()->id),
        ];
    }
}
