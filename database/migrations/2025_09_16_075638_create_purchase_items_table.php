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
        Schema::create('purchase_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('purchase_doc_id')->constrained('purchase_docs')->onDelete('cascade');
            $table->integer('line_no')->comment('Line number in the document');
            $table->string('item_code', 80)->comment('Mapped Accurate item code');
            $table->string('item_name_src', 255)->comment('Raw item name for traceability');
            $table->string('uom', 20)->nullable()->comment('Unit of measure');
            $table->decimal('qty', 18, 4)->comment('Quantity');
            $table->decimal('unit_price', 18, 4)->comment('Unit price');
            $table->decimal('line_total', 18, 2)->comment('Line total amount');
            $table->string('tax_code', 20)->nullable()->comment('Tax code');
            $table->json('meta')->nullable()->comment('Additional metadata like DO reference');
            $table->timestamps();

            $table->index(['purchase_doc_id', 'line_no']);
            $table->index(['item_code', 'uom']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_items');
    }
};
