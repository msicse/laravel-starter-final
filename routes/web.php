<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DriversController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('products', ProductController::class);
    Route::get('products-export', [ProductController::class, 'export'])->name('products.export');

    Route::resource('vehicles', VehicleController::class);

    Route::resource('users', UserController::class);

    // Drivers management routes
    Route::resource('drivers', DriversController::class)->except(['create', 'store']);

    // Role and Permission management routes
    Route::resource('roles', RoleController::class);
    Route::resource('permissions', PermissionController::class);

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
