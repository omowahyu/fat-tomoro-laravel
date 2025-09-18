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
        Schema::create('transformed_rows', function (Blueprint $table) {
            $table->id();
            $table->foreignId('file_id')->constrained('files')->onDelete('cascade');
            $table->foreignId('raw_row_id')->constrained('raw_rows')->onDelete('cascade');
            $table->json('normalized_json')->comment('Transformed/normalized data ready for API posting');
            $table->boolean('valid_flag')->default(false)->comment('Whether the row passed validation');
            $table->json('errors')->nullable()->comment('Validation errors if any');
            $table->json('warnings')->nullable()->comment('Validation warnings');
            $table->decimal('confidence_score', 5, 4)->nullable()->comment('Overall confidence score for mappings');
            $table->boolean('requires_review')->default(false)->comment('Whether manual review is needed');
            $table->timestamps();

            $table->index(['file_id', 'valid_flag']);
            $table->index(['file_id', 'requires_review']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transformed_rows');
    }
};
