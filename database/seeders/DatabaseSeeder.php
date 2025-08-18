<?php

namespace Database\Seeders;

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
        // Users are now created in UserSeeder
        Product::factory(200)->create();

        $this->call([
            DepartmentSeeder::class,
            UserSeeder::class,
            VehicleSeeder::class,
            RolePermissionSeeder::class,
        ]);
    }
}
