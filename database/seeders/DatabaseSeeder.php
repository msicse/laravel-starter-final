<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Product;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('12345678'),
            'email_verified_at' => now(),
        ]);

        Product::factory(200)->create();

        $this->call([
            DepartmentSeeder::class,
            VehicleSeeder::class,
        ]);
    }
}
