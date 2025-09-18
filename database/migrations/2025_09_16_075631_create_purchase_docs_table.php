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
        Schema::create('purchase_docs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('file_id')->constrained('files')->onDelete('cascade');
            $table->foreignId('source_row_id')->constrained('raw_rows')->onDelete('cascade');
            $table->enum('doc_type', ['po', 'gr', 'invoice'])->comment('Document type: PO, Goods Receipt, or Invoice');
            $table->string('doc_no', 80)->nullable()->comment('Document number from BOH if present');
            $table->date('doc_date')->comment('Document date');
            $table->string('supplier_code', 80)->comment('Supplier code mapped to Accurate');
            $table->string('warehouse_code', 80)->comment('Warehouse code');
            $table->char('currency', 3)->default('IDR')->comment('Currency code');
            $table->decimal('subtotal', 18, 2)->default(0)->comment('Subtotal amount');
            $table->decimal('tax_total', 18, 2)->default(0)->comment('Tax amount');
            $table->decimal('grand_total', 18, 2)->default(0)->comment('Grand total amount');
            $table->enum('status', ['staged', 'posted', 'failed'])->default('staged')->comment('Processing status');
            $table->string('posting_ext_id', 80)->nullable()->comment('External ID from Accurate after posting');
            $table->json('errors')->nullable()->comment('Validation or posting errors');
            $table->timestamps();

            $table->index(['doc_type', 'doc_no']);
            $table->index(['status', 'file_id']);
            $table->index(['supplier_code', 'doc_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_docs');
    }
};
