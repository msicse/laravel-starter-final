<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\VehicleController;

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

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
