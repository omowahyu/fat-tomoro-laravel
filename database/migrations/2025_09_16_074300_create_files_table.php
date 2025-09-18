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
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['boh_purchase', 'bi_sales', 'bank_statement'])->comment('File type: boh_purchase (BOH), bi_sales (BI Sales), bank_statement (Bank)');
            $table->string('original_name')->comment('Original filename');
            $table->integer('size_bytes')->comment('File size in bytes');
            $table->enum('status', ['uploaded', 'parsed', 'validated', 'committed', 'failed'])->default('uploaded')->index();
            $table->json('meta')->nullable()->comment('Additional metadata like delimiter, encoding, headers, etc.');
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('cascade');
            $table->string('storage_path')->comment('Storage path of the uploaded file');
            $table->integer('rows_detected')->nullable()->comment('Total number of data rows (excluding header)');
            $table->integer('valid_rows')->nullable()->comment('Number of valid rows after validation');
            $table->integer('invalid_rows')->nullable()->comment('Number of invalid rows');
            $table->timestamp('processed_at')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->index(['type', 'status']);
            $table->index(['created_by', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('files');
    }
};
