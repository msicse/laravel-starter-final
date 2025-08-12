<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use App\Http\Requests\VehicleIndexRequest;

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(VehicleIndexRequest $request)
    {
        $validated = $request->validated();
        $query = Vehicle::query();

        // Apply search
        if (!empty($validated['search'])) {
            $search = $validated['search'];
            $query->where(function ($q) use ($search) {
                $q->where('brand', 'like', "%{$search}%")
                    ->orWhere('model', 'like', "%{$search}%")
                    ->orWhere('color', 'like', "%{$search}%")
                    ->orWhere('registration_number', 'like', "%{$search}%")
                    ->orWhere('vendor', 'like', "%{$search}%");
            });
        }

        // Apply filters
        if (!empty($validated['filters'])) {
            $filters = $validated['filters'];

            if (!empty($filters['brand'])) {
                $query->whereIn('brand', $filters['brand']);
            }

            if (!empty($filters['color'])) {
                $query->whereIn('color', $filters['color']);
            }

            if (isset($filters['is_active'])) {
                $query->whereIn('is_active', $filters['is_active']);
            }
        }

        // Apply sorting
        $sortColumn = $validated['sort'];
        $sortDirection = $validated['direction'];
        $query->orderBy($sortColumn, $sortDirection);

        // Get pagination data
        $vehicles = $query->paginate($validated['per_page'])
            ->withQueryString(); // Preserve query parameters in pagination links

        // Get filter options for the frontend
        $filterOptions = [
            'brands' => Vehicle::distinct()->pluck('brand')->filter()->sort()->values(),
            'colors' => Vehicle::distinct()->pluck('color')->filter()->sort()->values(),
            'statuses' => [
                ['label' => 'Active', 'value' => true],
                ['label' => 'Inactive', 'value' => false],
            ],
        ];

        // Get stats
        $stats = [
            'total' => Vehicle::count(),
            'active' => Vehicle::where('is_active', true)->count(),
            'brands' => Vehicle::distinct()->count('brand'),
            'inactive' => Vehicle::where('is_active', false)->count(),
        ];

        return Inertia::render('vehicles/index', [
            'vehicles' => $vehicles,
            'filterOptions' => $filterOptions,
            'stats' => $stats,
            'queryParams' => $request->only(['search', 'sort', 'direction', 'filters', 'per_page']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('vehicles/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'color' => 'required|string|max:255',
            'registration_number' => 'required|string|max:255|unique:vehicles',
            'vendor' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        Vehicle::create($validated);

        return redirect()
            ->route('vehicles.index')
            ->with('success', 'Vehicle created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Vehicle $vehicle)
    {
        return Inertia::render('vehicles/show', [
            'vehicle' => $vehicle,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vehicle $vehicle)
    {
        return Inertia::render('vehicles/edit', [
            'vehicle' => $vehicle,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Vehicle $vehicle)
    {
        $validated = $request->validate([
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'color' => 'required|string|max:255',
            'registration_number' => 'required|string|max:255|unique:vehicles,registration_number,' . $vehicle->id,
            'vendor' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $vehicle->update($validated);

        return redirect()
            ->route('vehicles.index')
            ->with('success', 'Vehicle updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vehicle $vehicle)
    {
        $vehicle->delete();

        return redirect()
            ->route('vehicles.index')
            ->with('success', 'Vehicle deleted successfully!');
    }
}
