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
        Schema::create('scheduler_jobs', function (Blueprint $table) {
            $table->id();
            $table->string('job_type', 80)->comment('Job type: retry_failed_posts, daily_resume, etc.');
            $table->string('schedule_cron', 40)->comment('Cron expression for scheduling');
            $table->enum('state', ['idle', 'running', 'paused'])->default('idle')->comment('Current job state');
            $table->timestamp('last_run_at')->nullable()->comment('Last execution timestamp');
            $table->integer('retry_count')->unsigned()->default(0)->comment('Number of retry attempts');
            $table->json('meta')->nullable()->comment('Job metadata and configuration');
            $table->timestamps();

            $table->index(['job_type', 'state']);
            $table->index('last_run_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scheduler_jobs');
    }
};
