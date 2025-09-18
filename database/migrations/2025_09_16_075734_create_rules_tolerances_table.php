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
        Schema::create('rules_tolerances', function (Blueprint $table) {
            $table->id();
            $table->string('channel_code', 40)->comment('Channel code for tolerance rules');
            $table->tinyInteger('date_lag_days')->default(1)->comment('Date lag for matching: T vs T+1');
            $table->decimal('amount_tolerance', 18, 2)->default(0)->comment('Absolute amount tolerance');
            $table->decimal('percent_tolerance', 5, 2)->default(0)->comment('Percentage tolerance');
            $table->boolean('is_active')->default(true)->comment('Whether this rule is active');
            $table->timestamps();

            $table->index(['channel_code', 'is_active']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rules_tolerances');
    }
};
