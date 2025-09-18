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
        Schema::create('mappings', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['column', 'item', 'channel', 'coa', 'bank'])->comment('Mapping type');
            $table->string('source')->comment('Source value (external field/pattern)');
            $table->string('target')->comment('Target value (internal field/ID)');
            $table->decimal('confidence', 5, 4)->default(1.0000)->comment('Confidence score (0-1)');
            $table->json('rules')->nullable()->comment('Mapping rules and conditions');
            $table->boolean('is_active')->default(true);
            $table->integer('version')->default(1)->comment('Version for mapping changes');
            $table->string('created_by_type')->nullable()->comment('Created by: user, ai, system');
            $table->foreignId('created_by_user')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('last_used_at')->nullable();
            $table->integer('usage_count')->default(0);
            $table->timestamps();

            $table->index(['type', 'source']);
            $table->index(['type', 'is_active']);
            $table->unique(['type', 'source', 'version']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mappings');
    }
};
