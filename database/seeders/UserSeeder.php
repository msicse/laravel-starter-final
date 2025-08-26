<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user if it doesn't exist
        User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'System Administrator',
                'username' => 'admin',
                'password' => Hash::make('12345678'),
                'official_phone' => '+1234567890',
                'user_type' => 'admin',
                'blood_group' => 'O+',
                'status' => 'active',
                'address' => '123 Admin Street, Admin City',
                'whatsapp_id' => '+1234567890',
                'email_verified_at' => now(),
            ]
        );

        // Create driver users
        $drivers = [
            [
                'name' => 'John Driver',
                'email' => 'driver@example.com',
                'phone' => '+1234567891',
                'blood_group' => 'A+',
                'address' => '456 Driver Lane, Driver City',
                'whatsapp_id' => '+1234567891',
            ],
            [
                'name' => 'Sarah Wilson',
                'email' => 'sarah.driver@example.com',
                'phone' => '+1234567892',
                'blood_group' => 'B+',
                'address' => '789 Transport Ave, Transport City',
                'whatsapp_id' => '+1234567892',
            ],
            [
                'name' => 'Mike Johnson',
                'email' => 'mike.driver@example.com',
                'phone' => '+1234567893',
                'blood_group' => 'AB+',
                'address' => '321 Delivery Road, Delivery Town',
                'whatsapp_id' => '+1234567893',
            ],
        ];

        foreach ($drivers as $index => $driver) {
            User::firstOrCreate(
                ['email' => $driver['email']],
                [
                    'name' => $driver['name'],
                    'username' => 'driver' . ($index + 1),
                    'password' => Hash::make('12345678'),
                    'official_phone' => $driver['phone'],
                    'user_type' => 'driver',
                    'blood_group' => $driver['blood_group'],
                    'status' => 'active',
                    'address' => $driver['address'],
                    'whatsapp_id' => $driver['whatsapp_id'],
                    'email_verified_at' => now(),
                ]
            );
        }

        // Create manager users
        $managers = [
            [
                'name' => 'Alice Manager',
                'email' => 'alice.manager@example.com',
                'phone' => '+1234567894',
                'blood_group' => 'O-',
                'address' => '555 Management Blvd, Manager City',
                'whatsapp_id' => '+1234567894',
            ],
            [
                'name' => 'Bob Supervisor',
                'email' => 'bob.supervisor@example.com',
                'phone' => '+1234567895',
                'blood_group' => 'A-',
                'address' => '777 Supervisor St, Supervisor Town',
                'whatsapp_id' => '+1234567895',
            ],
        ];

        foreach ($managers as $index => $manager) {
            User::firstOrCreate(
                ['email' => $manager['email']],
                [
                    'name' => $manager['name'],
                    'username' => 'manager' . ($index + 1),
                    'password' => Hash::make('12345678'),
                    'official_phone' => $manager['phone'],
                    'user_type' => 'manager',
                    'blood_group' => $manager['blood_group'],
                    'status' => 'active',
                    'address' => $manager['address'],
                    'whatsapp_id' => $manager['whatsapp_id'],
                    'email_verified_at' => now(),
                ]
            );
        }

        // Create regular employees
        $employees = [
            [
                'name' => 'Emma Employee',
                'email' => 'emma.employee@example.com',
                'phone' => '+1234567896',
                'blood_group' => 'B-',
                'status' => 'active',
            ],
            [
                'name' => 'David Worker',
                'email' => 'david.worker@example.com',
                'phone' => '+1234567897',
                'blood_group' => 'AB-',
                'status' => 'inactive',
            ],
            [
                'name' => 'Lisa Staff',
                'email' => 'lisa.staff@example.com',
                'phone' => '+1234567898',
                'blood_group' => 'O+',
                'status' => 'suspended',
            ],
        ];

        foreach ($employees as $index => $employee) {
            User::firstOrCreate(
                ['email' => $employee['email']],
                [
                    'name' => $employee['name'],
                    'username' => 'employee' . ($index + 1),
                    'password' => Hash::make('12345678'),
                    'official_phone' => $employee['phone'],
                    'user_type' => 'employee',
                    'blood_group' => $employee['blood_group'],
                    'status' => $employee['status'],
                    'address' => '999 Employee Road, Employee City',
                    'whatsapp_id' => $employee['phone'],
                    'email_verified_at' => now(),
                ]
            );
        }

        // Create additional random users using factory
        User::factory(10)->create();
    }
}
