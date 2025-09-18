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
        Schema::create('sales_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sales_doc_id')->constrained('sales_docs')->onDelete('cascade');
            $table->integer('line_no')->comment('Line number in the sales document');
            $table->string('item_code', 80)->comment('Mapped Accurate item code');
            $table->string('item_name_src', 255)->comment('Raw item name from source');
            $table->decimal('qty', 18, 4)->comment('Quantity sold');
            $table->decimal('gross_amount', 18, 2)->comment('Gross amount for this item');
            $table->decimal('net_amount', 18, 2)->comment('Net amount after fees for this item');
            $table->json('meta')->nullable()->comment('Additional metadata');
            $table->timestamps();

            $table->index(['sales_doc_id', 'line_no']);
            $table->index('item_code');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales_items');
    }
};
