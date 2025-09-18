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
        Schema::create('post_results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('batch_id')->constrained('batches')->onDelete('cascade');
            $table->foreignId('transformed_row_id')->nullable()->constrained('transformed_rows')->onDelete('set null');
            $table->string('endpoint')->comment('Accurate API endpoint called');
            $table->enum('status', ['success', 'failed', 'retry'])->comment('Result status');
            $table->json('request_payload')->nullable()->comment('Request data sent to API');
            $table->json('response_data')->nullable()->comment('Response received from API');
            $table->integer('http_status_code')->nullable();
            $table->text('error_message')->nullable();
            $table->string('accurate_transaction_id')->nullable()->comment('Transaction ID from Accurate if successful');
            $table->decimal('processing_time_ms', 8, 2)->nullable()->comment('Processing time in milliseconds');
            $table->integer('retry_count')->default(0);
            $table->timestamp('last_retry_at')->nullable();
            $table->timestamps();

            $table->index(['batch_id', 'status']);
            $table->index(['endpoint', 'status']);
            $table->index(['accurate_transaction_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post_results');
    }
};
