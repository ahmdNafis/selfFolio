<?php

namespace Database\Factories;

use App\Models\ProjectCategory;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProjectCategory>
 */
class ProjectCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = ProjectCategory::class;

    public function definition()
    {
        return [
            'project_category_title' => $this->faker->words(2, true),
            'project_category_description' => $this->faker->text(6),
            'project_category_enabled' => $this->faker->boolean(70),
        ];
    }
}
