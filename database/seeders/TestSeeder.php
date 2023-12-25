<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;

class TestSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $writer = User::factory()->state(fn () => ['role' => 'writer'])->create();
        $tags = Tag::factory()->count(20)->create();

        Category::factory()
            ->count(12)
            ->has(
                Post::factory()
                    ->count(40)
                    ->recycle($tags)
                    ->recycle($writer)
            )
            ->create();
    }
}
