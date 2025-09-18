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
        Schema::create('mapping_items', function (Blueprint $table) {
            $table->id();
            $table->string('source_name', 255)->comment('Raw item name/alias from source');
            $table->string('item_code', 80)->comment('Accurate item code');
            $table->string('uom', 20)->nullable()->comment('Unit of measure');
            $table->string('pattern', 255)->nullable()->comment('Wildcard/regex pattern for matching');
            $table->tinyInteger('confidence')->unsigned()->default(100)->comment('Confidence score 0-100');
            $table->boolean('is_active')->default(true)->comment('Whether this mapping is active');
            $table->timestamps();

            $table->index(['source_name', 'is_active']);
            $table->index(['item_code', 'is_active']);
            $table->index('pattern');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mapping_items');
    }
};
