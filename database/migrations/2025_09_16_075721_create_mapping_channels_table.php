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
        Schema::create('mapping_channels', function (Blueprint $table) {
            $table->id();
            $table->string('bank_description_pattern', 255)->comment('Pattern to match bank transaction descriptions');
            $table->string('channel_code', 40)->comment('Channel code: GOFOOD, GRABFOOD, etc.');
            $table->enum('status', ['active', 'pending', 'disabled'])->default('active')->comment('Mapping status');
            $table->tinyInteger('confidence')->unsigned()->default(100)->comment('Confidence score 0-100');
            $table->timestamp('last_tested_at')->nullable()->comment('Last time this pattern was tested');
            $table->timestamps();

            $table->index(['channel_code', 'status']);
            $table->index('bank_description_pattern');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mapping_channels');
    }
};
