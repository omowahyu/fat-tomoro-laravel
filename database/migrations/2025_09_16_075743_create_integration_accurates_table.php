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
        Schema::create('integration_accurates', function (Blueprint $table) {
            $table->id();
            $table->string('display_name', 120)->comment('Human-readable name for this integration');
            $table->string('base_url', 255)->comment('Accurate API base URL');
            $table->string('database_id', 40)->comment('Accurate database ID');
            $table->text('api_key_enc')->comment('Encrypted API key');
            $table->integer('timeout_sec')->default(30)->comment('API timeout in seconds');
            $table->tinyInteger('max_retries')->default(3)->comment('Maximum retry attempts');
            $table->boolean('verify_ssl')->default(true)->comment('Whether to verify SSL certificates');
            $table->integer('quota_remain')->nullable()->comment('Remaining API quota');
            $table->integer('last_health_ms')->nullable()->comment('Last health check response time in ms');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('integration_accurates');
    }
};
