<?php

namespace Database\Factories;

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
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'due_date' => fake()->dateTimeBetween('now', '+1 year'),
            'status' => fake()->randomElement(['pending', 'in_progress', 'completed']),
            'image_path' => "http://picsum.photos/seed/" . random_int(0, 1000) . "/80",
            'created_by' => 1 /* \App\Models\User::factory() */,
            'updated_by' => 1 /* \App\Models\User::factory() */,
            'created_at' => time(),
            'updated_at' => time()
        ];
    }
}
