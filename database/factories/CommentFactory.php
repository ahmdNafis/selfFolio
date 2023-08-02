<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Comment::class;

    public function definition()
    {
        $postId = rand(1, Post::all()->last()->id);
        if(Post::find($postId) != null) {
            return [
                'posted_date' => fake()->date('Y-m-d'),
                'subject' => fake()->sentence(),
                'comment_body' => fake()->text(8),
                'posted' => fake()->boolean(70),
                'post_id' => $postId,
                'user_id' => rand(1, User::all()->last()->id),
            ];
        }
    }
}
