<?php

namespace Database\Factories;

use App\Models\Profile;
use App\Models\User;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Profile>
 */
class ProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Profile::class;

    public function definition()
    {
        $rand_id = rand(1, User::all()->last()->id);
        $old_id = Profile::pluck('user_id')->toArray();
        $user_id = $old_id != null && !in_array($rand_id, $old_id) ? $rand_id : null;
        $links = [];
        for ($i=0; $i < 5; $i++) { 
            array_push($links, fake()->url());
        }
        return [
            'profile_description' => fake()->text(5),
            'avatar_link' => fake()->url(),
            'social_media_links' => json_encode($links),
            'about_enabled' => fake()->boolean(70),
            'user_id' => $user_id,
        ];
    }
}
