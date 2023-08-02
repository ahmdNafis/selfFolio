<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        ProjectCategorySeeder::class,
        ProjectSeeder::class,
        RoleSeeder::class,
        UserSeeder::class,
        BlogCategorySeeder::class,
        PostSeeder::class,
        CommentSeeder::class,
        TagSeeder::class,
        ProfileSeeder::class,
        Contact::class,
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
