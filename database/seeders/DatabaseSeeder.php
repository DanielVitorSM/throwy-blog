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
        \App\Models\User::factory()->create([
            'name' => 'Administrador',
            'email' => 'admin@throwy.co',
            'role' => 'manager',
        ]);

        if (config('app.env', 'local') === 'local') {
            $this->call([
                TestSeeder::class,
            ]);
        }
    }
}
