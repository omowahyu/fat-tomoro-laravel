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
        Schema::create('sales_order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('file_id')->constrained('files')->onDelete('cascade');
            $table->string('line_no')->comment('Line number from sales order');
            $table->string('product_code')->comment('Product code');
            $table->text('product_name')->nullable()->comment('Product name/description');
            $table->decimal('price_incl_tax', 15, 2)->default(0)->comment('Price including tax');
            $table->decimal('qty', 10, 3)->default(0)->comment('Quantity');
            $table->string('uom')->nullable()->comment('Unit of measure');
            $table->decimal('amt_incl_tax', 15, 2)->default(0)->comment('Amount including tax');
            $table->timestamps();

            $table->index(['file_id', 'line_no']);
            $table->index('product_code');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales_order_items');
    }
};
