<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'slug' => fn (array $attributes) => Str::slug($attributes['title']),
            'title' => Str::ucfirst(fake()->unique()->words(8, true)),
            'author_id' => User::factory(),
            'category_id' => Category::factory(),
            'caption' => Str::ucfirst(fake()->text(255)), 
            'content' => fake()->randomHtml(),
            'published' => fake()->boolean(),
            'published_at' => fn (array $attributes) => $attributes['published'] 
                ? fake()->dateTimeBetween('-30 days', 'now') 
                : null,
        ];
    }

    /**
     * Indicate that the model's publish state is true and set the publication date.
     *
     * @return static
     */
    public function published()
    {
        return $this->state(fn (array $attributes) => [
            'published' => true,
        ]);
    }
}
