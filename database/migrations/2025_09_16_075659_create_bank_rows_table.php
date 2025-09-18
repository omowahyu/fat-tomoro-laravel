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
        Schema::create('bank_rows', function (Blueprint $table) {
            $table->id();
            $table->foreignId('file_id')->constrained('files')->onDelete('cascade');
            $table->date('txn_date')->comment('Transaction date');
            $table->string('description', 255)->comment('Transaction description');
            $table->decimal('debit', 18, 2)->default(0)->comment('Debit amount');
            $table->decimal('credit', 18, 2)->default(0)->comment('Credit amount');
            $table->decimal('balance', 18, 2)->nullable()->comment('Account balance after transaction');
            $table->string('channel_guess', 40)->nullable()->comment('Guessed channel from mapping/patterns');
            $table->string('match_key', 120)->nullable()->comment('Hash key for matching with sales');
            $table->foreignId('matched_sales_doc_id')->nullable()->constrained('sales_docs')->onDelete('set null');
            $table->enum('status', ['unmatched', 'matched', 'ignored'])->default('unmatched')->comment('Matching status');
            $table->json('meta')->nullable()->comment('Additional metadata');
            $table->timestamps();

            $table->index(['txn_date', 'status']);
            $table->index(['description', 'channel_guess']);
            $table->index(['match_key', 'status']);
            $table->index('matched_sales_doc_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bank_rows');
    }
};
