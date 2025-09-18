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
        Schema::create('mapping_coas', function (Blueprint $table) {
            $table->id();
            $table->enum('domain', ['sales', 'purchase', 'fee', 'ads', 'diff', 'cogs', 'inventory', 'tax'])->comment('COA domain/category');
            $table->string('channel_code', 40)->nullable()->comment('Channel-specific mapping (null for global)');
            $table->string('rule_key', 80)->comment('Rule identifier: net_sales, commission, selisih_bank, etc.');
            $table->string('account_code', 40)->comment('Accurate COA account code');
            $table->string('tax_code', 20)->nullable()->comment('Tax code if applicable');
            $table->json('rules')->nullable()->comment('Additional rules: rounding, cut-off, etc.');
            $table->boolean('is_active')->default(true)->comment('Whether this mapping is active');
            $table->timestamps();

            $table->index(['domain', 'channel_code', 'rule_key']);
            $table->index(['account_code', 'is_active']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mapping_coas');
    }
};
