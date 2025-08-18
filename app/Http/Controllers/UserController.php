<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\UserIndexRequest;
use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(UserIndexRequest $request)
    {
        $validated = $request->validated();
        $query = User::query();

        // Apply search
        if (!empty($validated['search'])) {
            $search = $validated['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('user_type', 'like', "%{$search}%")
                    ->orWhere('address', 'like', "%{$search}%");
            });
        }

        // Apply filters
        if (!empty($validated['filters'])) {
            $filters = $validated['filters'];

            if (!empty($filters['user_type'])) {
                $query->whereIn('user_type', $filters['user_type']);
            }

            if (!empty($filters['status'])) {
                $query->whereIn('status', $filters['status']);
            }

            if (!empty($filters['blood_group'])) {
                $query->whereIn('blood_group', $filters['blood_group']);
            }
        }

        // Apply sorting
        $sortColumn = $validated['sort'];
        $sortDirection = $validated['direction'];
        $query->orderBy($sortColumn, $sortDirection);

        // Get pagination data
        $users = $query->paginate($validated['per_page'])
            ->withQueryString(); // Preserve query parameters in pagination links

        // Get filter options for the frontend
        $filterOptions = [
            'user_types' => User::distinct()->pluck('user_type')->filter()->sort()->values(),
            'statuses' => ['active', 'inactive', 'suspended'],
            'blood_groups' => ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        ];

        // Get stats
        $stats = [
            'total' => User::count(),
            'active' => User::where('status', 'active')->count(),
            'drivers' => User::where('user_type', 'driver')->count(),
            'admins' => User::where('user_type', 'admin')->count(),
        ];

        return Inertia::render('users/index', [
            'users' => $users,
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
        $userTypes = ['admin', 'driver', 'manager', 'employee'];
        $bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
        $statuses = [
            ['label' => 'Active', 'value' => 'active'],
            ['label' => 'Inactive', 'value' => 'inactive'],
            ['label' => 'Suspended', 'value' => 'suspended'],
        ];

        return Inertia::render('users/create', [
            'userTypes' => $userTypes,
            'bloodGroups' => $bloodGroups,
            'statuses' => $statuses,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserStoreRequest $request)
    {
        $validated = $request->validated();
        
        // Hash the password
        $validated['password'] = Hash::make($validated['password']);
        
        // Set email verification if needed
        if (!isset($validated['email_verified_at'])) {
            $validated['email_verified_at'] = now();
        }

        User::create($validated);

        return redirect()
            ->route('users.index')
            ->with('success', 'User created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return Inertia::render('users/show', [
            'user' => $user,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $userTypes = ['admin', 'driver', 'manager', 'employee'];
        $bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
        $statuses = [
            ['label' => 'Active', 'value' => 'active'],
            ['label' => 'Inactive', 'value' => 'inactive'],
            ['label' => 'Suspended', 'value' => 'suspended'],
        ];

        return Inertia::render('users/edit', [
            'user' => $user,
            'userTypes' => $userTypes,
            'bloodGroups' => $bloodGroups,
            'statuses' => $statuses,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserUpdateRequest $request, User $user)
    {
        $validated = $request->validated();
        
        // Hash password if provided
        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return redirect()
            ->route('users.index')
            ->with('success', 'User updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        // Prevent deleting the current user
        if ($user->id === auth()->id()) {
            return redirect()
                ->route('users.index')
                ->with('error', 'You cannot delete your own account!');
        }

        $user->delete();

        return redirect()
            ->route('users.index')
            ->with('success', 'User deleted successfully!');
    }
}
