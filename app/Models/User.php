<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
        'official_phone',
        'personal_phone',
        'emergency_phone',
        'user_type',
        'blood_group',
        'image',
        'status',
        'address',
        'whatsapp_id',
        'last_login_at',
        'last_login_ip',
        'last_login_location',
        'last_login_device',
        // Driver-specific fields
        'driving_license_no',
        'nid_number',
        'present_address',
        'permanent_address',
        'emergency_contact_name',
        'emergency_contact_phone',
        'emergency_contact_relation',
        'last_login_country',
        'last_login_timezone',
        'department_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the identifier that will be used for authentication.
     * This method helps determine if the login input is email or username.
     */
    public static function getLoginField(string $login): string
    {
        return filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
    }

    /**
     * Find user by login (email or username).
     */
    public static function findByLogin(string $login): ?User
    {
        $field = self::getLoginField($login);
        return self::where($field, $login)->first();
    }
}
