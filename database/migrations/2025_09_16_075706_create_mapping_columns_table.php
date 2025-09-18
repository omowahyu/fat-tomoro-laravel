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
        Schema::create('mapping_columns', function (Blueprint $table) {
            $table->id();
            $table->enum('source_context', ['boh_purchase', 'bi_sales', 'bank_statement'])->comment('Source file type context');
            $table->string('source_field', 120)->comment('External field name from uploaded file');
            $table->string('target_field', 120)->comment('Canonical field name (doc_date, supplier_code, gross_amount, etc.)');
            $table->string('pattern', 255)->nullable()->comment('Wildcard/regex pattern for matching');
            $table->tinyInteger('confidence')->unsigned()->default(100)->comment('Confidence score 0-100');
            $table->boolean('is_active')->default(true)->comment('Whether this mapping is active');
            $table->integer('version')->default(1)->comment('Version for mapping changes');
            $table->foreignId('updated_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();

            $table->unique(['source_context', 'source_field', 'version']);
            $table->index(['target_field', 'is_active']);
            $table->index(['source_context', 'is_active']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mapping_columns');
    }
};
