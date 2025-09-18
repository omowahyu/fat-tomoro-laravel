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
        Schema::create('audit_logs', function (Blueprint $table) {
            $table->id();
            $table->string('actor')->comment('User ID or system identifier');
            $table->string('action')->comment('Action performed (upload, validate, map, post, etc.)');
            $table->string('resource_type')->nullable()->comment('Type of resource affected');
            $table->unsignedBigInteger('resource_id')->nullable()->comment('ID of the affected resource');
            $table->json('details')->nullable()->comment('Additional details about the action');
            $table->json('changes')->nullable()->comment('Before/after values for updates');
            $table->string('ip_address')->nullable();
            $table->string('user_agent')->nullable();
            $table->enum('level', ['info', 'warning', 'error', 'critical'])->default('info');
            $table->timestamps();

            $table->index(['actor', 'created_at']);
            $table->index(['action', 'created_at']);
            $table->index(['resource_type', 'resource_id']);
            $table->index(['level', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
    }
};
