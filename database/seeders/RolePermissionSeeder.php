<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // User management
            'view users',
            'create users',
            'edit users',
            'delete users',
            
            // Driver management
            'view drivers',
            'edit drivers',
            'delete drivers',
            
            // Product management
            'view products',
            'create products',
            'edit products',
            'delete products',
            'export products',
            
            // Vehicle management
            'view vehicles',
            'create vehicles',
            'edit vehicles',
            'delete vehicles',
            
            // Role management
            'view roles',
            'create roles',
            'edit roles',
            'delete roles',
            
            // Permission management
            'view permissions',
            'create permissions',
            'edit permissions',
            'delete permissions',
            
            // Dashboard access
            'view dashboard',
            
            // Driver portal access
            'access driver portal',
            'view driver routes',
            'view driver vehicle',
            'view driver tracking',
            'view driver schedule',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create roles and assign permissions
        
        // Super Admin Role - has all permissions
        $superAdminRole = Role::firstOrCreate(['name' => 'super-admin']);
        $superAdminRole->givePermissionTo(Permission::all());

        // Admin Role - has most permissions except super admin specific ones
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $adminRole->givePermissionTo([
            'view dashboard',
            'view users', 'create users', 'edit users', 'delete users',
            'view drivers', 'edit drivers', 'delete drivers',
            'view products', 'create products', 'edit products', 'delete products', 'export products',
            'view vehicles', 'create vehicles', 'edit vehicles', 'delete vehicles',
            'view roles', 'view permissions',
        ]);

        // Manager Role - has limited management permissions
        $managerRole = Role::firstOrCreate(['name' => 'manager']);
        $managerRole->givePermissionTo([
            'view dashboard',
            'view users', 'edit users',
            'view drivers', 'edit drivers',
            'view products', 'create products', 'edit products', 'export products',
            'view vehicles', 'create vehicles', 'edit vehicles',
        ]);

        // Driver Role - has driver-specific permissions
        $driverRole = Role::firstOrCreate(['name' => 'driver']);
        $driverRole->givePermissionTo([
            'view dashboard',
            'access driver portal',
            'view driver routes',
            'view driver vehicle',
            'view driver tracking',
            'view driver schedule',
        ]);

        // Employee Role - has basic permissions
        $employeeRole = Role::firstOrCreate(['name' => 'employee']);
        $employeeRole->givePermissionTo([
            'view dashboard',
            'view products',
            'view vehicles',
        ]);

        // Assign roles to existing users
        $this->assignRolesToUsers();
    }

    /**
     * Assign roles to existing users based on their user_type
     */
    private function assignRolesToUsers(): void
    {
        // Assign super-admin role to the main admin
        $superAdmin = User::where('email', 'admin@example.com')->first();
        if ($superAdmin) {
            $superAdmin->assignRole('super-admin');
        }

        // Assign driver role to all drivers
        $drivers = User::where('user_type', 'driver')->get();
        foreach ($drivers as $driver) {
            $driver->assignRole('driver');
        }

        // Assign manager role to managers
        $managers = User::where('user_type', 'manager')->get();
        foreach ($managers as $manager) {
            $manager->assignRole('manager');
        }

        // Assign employee role to employees
        $employees = User::where('user_type', 'employee')->get();
        foreach ($employees as $employee) {
            $employee->assignRole('employee');
        }

        // Assign admin role to admin type users (except super admin)
        $admins = User::where('user_type', 'admin')
            ->where('email', '!=', 'admin@example.com')
            ->get();
        foreach ($admins as $admin) {
            $admin->assignRole('admin');
        }
    }
}
