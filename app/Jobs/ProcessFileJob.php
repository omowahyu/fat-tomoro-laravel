<?php

namespace App\Jobs;

use App\Models\File;
use App\Services\FileUploadService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Exception;

class ProcessFileJob implements ShouldQueue
{
    use Queueable, InteractsWithQueue, SerializesModels;

    public $timeout = 300; // 5 minutes
    public $tries = 3;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public File $file
    ) {}

    /**
     * Execute the job.
     */
    public function handle(FileUploadService $fileUploadService): void
    {
        try {
            // Parse the file
            $fileUploadService->parseFile($this->file);

        } catch (Exception $e) {
            // Log the error and mark file as failed
            $this->file->update(['status' => 'failed']);

            // Re-throw to trigger retry mechanism
            throw $e;
        }
    }

    /**
     * Handle a job failure.
     */
    public function failed(Exception $exception): void
    {
        $this->file->update(['status' => 'failed']);
    }
}
