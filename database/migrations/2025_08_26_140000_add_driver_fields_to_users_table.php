<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Driver-specific fields
            $table->string('driving_license_no')->nullable()->after('emergency_phone');
            $table->string('nid_number')->nullable()->after('driving_license_no');
            $table->text('present_address')->nullable()->after('nid_number');
            $table->text('permanent_address')->nullable()->after('present_address');
            $table->string('emergency_contact_name')->nullable()->after('permanent_address');
            $table->string('emergency_contact_phone')->nullable()->after('emergency_contact_name');
            $table->string('emergency_contact_relation')->nullable()->after('emergency_contact_phone');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'driving_license_no',
                'nid_number',
                'present_address',
                'permanent_address',
                'emergency_contact_name',
                'emergency_contact_phone',
                'emergency_contact_relation'
            ]);
        });
    }
};
