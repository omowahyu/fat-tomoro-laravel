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
        Schema::create('sales_docs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('file_id')->constrained('files')->onDelete('cascade');
            $table->string('channel_code', 40)->comment('Channel code: GOFOOD, GRABFOOD, SHOPEEFOOD, OFFLINE, etc.');
            $table->date('sales_date')->comment('Sales transaction date');
            $table->decimal('gross_amount', 18, 2)->default(0)->comment('Gross sales amount');
            $table->decimal('commission_fee', 18, 2)->default(0)->comment('Commission fee charged by platform');
            $table->decimal('ads_fee', 18, 2)->default(0)->comment('Advertisement fee');
            $table->decimal('net_amount', 18, 2)->default(0)->comment('Net amount after fees');
            $table->decimal('bank_in_amount', 18, 2)->nullable()->comment('Actual amount received in bank');
            $table->decimal('diff_amount', 18, 2)->default(0)->comment('Difference: net_amount - bank_in_amount');
            $table->enum('status', ['staged', 'reconciled', 'posted', 'failed'])->default('staged')->comment('Processing status');
            $table->string('posting_ext_id', 80)->nullable()->comment('External ID from Accurate after posting');
            $table->json('errors')->nullable()->comment('Validation or posting errors');
            $table->timestamps();

            $table->unique(['channel_code', 'sales_date']);
            $table->index(['status', 'file_id']);
            $table->index(['sales_date', 'channel_code']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales_docs');
    }
};
