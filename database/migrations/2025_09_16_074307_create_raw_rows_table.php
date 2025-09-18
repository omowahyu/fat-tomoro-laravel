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
        Schema::create('raw_rows', function (Blueprint $table) {
            $table->id();
            $table->foreignId('file_id')->constrained('files')->onDelete('cascade');
            $table->integer('row_number')->comment('Original row number in the file');
            $table->json('row_json')->comment('Raw row data as JSON');
            $table->string('row_hash')->nullable()->comment('Hash for duplicate detection');
            $table->timestamps();

            $table->index(['file_id', 'row_number']);
            $table->index(['file_id', 'row_hash']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('raw_rows');
    }
};
