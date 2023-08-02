<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\ProjectCategory;
use App\Models\User;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Project::class;

    public function definition()
    {
        return [
            'project_title' => $this->faker->words(4, true),
            'project_description' => $this->faker->text(6),
            'project_link' => $this->faker->url(),
            'image_url' => $this->faker->url(),
            'project_published' => $this->faker->boolean(70),
            'project_category_id' => rand(1, ProjectCategory::get()->last()->id),
            'user_id' => rand(1, User::all()->last()->id),
        ];
    }
}
