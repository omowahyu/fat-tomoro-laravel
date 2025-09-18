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
        // If table already matches new schema, skip migration (helps for SQLite/testing)
        if (Schema::hasColumn('files', 'original_name') && Schema::hasColumn('files', 'storage_path') && Schema::hasColumn('files', 'size_bytes')) {
            return;
        }
        $driver = Schema::getConnection()->getDriverName();

        if ($driver === 'sqlite') {
            // SQLite: avoid dropColumn, use rename + add with existence checks
            Schema::table('files', function (Blueprint $table) {
                if (Schema::hasColumn('files', 'type')) {
                    $table->renameColumn('type', 'type_old');
                }
            });

            Schema::table('files', function (Blueprint $table) {
                if (!Schema::hasColumn('files', 'type')) {
                    $table->enum('type', ['boh_purchase', 'bi_sales', 'bank_statement'])->after('id')
                        ->comment('File type: boh_purchase (BOH), bi_sales (BI Sales), bank_statement (Bank)');
                }

                if (Schema::hasColumn('files', 'name')) {
                    $table->renameColumn('name', 'original_name');
                }
                if (Schema::hasColumn('files', 'file_path')) {
                    $table->renameColumn('file_path', 'storage_path');
                }
                if (Schema::hasColumn('files', 'size')) {
                    $table->renameColumn('size', 'size_bytes');
                }
                if (Schema::hasColumn('files', 'total_rows')) {
                    $table->renameColumn('total_rows', 'rows_detected');
                }
            });

            Schema::table('files', function (Blueprint $table) {
                if (Schema::hasColumn('files', 'status')) {
                    $table->renameColumn('status', 'status_old');
                }
            });

            Schema::table('files', function (Blueprint $table) {
                if (!Schema::hasColumn('files', 'status')) {
                    $table->enum('status', ['uploaded', 'parsed', 'validated', 'committed', 'failed'])->after('rows_detected')
                        ->default('uploaded');
                }
                if (Schema::hasColumn('files', 'uploaded_by')) {
                    $table->renameColumn('uploaded_by', 'created_by');
                }
                if (!Schema::hasColumn('files', 'deleted_at')) {
                    $table->softDeletes();
                }
            });

            // Clean up old columns if they exist
            Schema::table('files', function (Blueprint $table) {
                if (Schema::hasColumn('files', 'type_old')) {
                    $table->dropColumn('type_old');
                }
                if (Schema::hasColumn('files', 'status_old')) {
                    $table->dropColumn('status_old');
                }
            });
        } else {
            // MySQL/MariaDB etc: original flow using drop/add
            Schema::table('files', function (Blueprint $table) {
                // Update type enum to match new schema
                if (Schema::hasColumn('files', 'type')) {
                    $table->dropColumn('type');
                }
            });

            Schema::table('files', function (Blueprint $table) {
                $table->enum('type', ['boh_purchase', 'bi_sales', 'bank_statement'])->after('id')
                    ->comment('File type: boh_purchase (BOH), bi_sales (BI Sales), bank_statement (Bank)');

                // Add new columns to match enhanced schema
                if (Schema::hasColumn('files', 'name')) {
                    $table->renameColumn('name', 'original_name');
                }
                if (Schema::hasColumn('files', 'file_path')) {
                    $table->renameColumn('file_path', 'storage_path');
                }
                if (Schema::hasColumn('files', 'size')) {
                    $table->renameColumn('size', 'size_bytes');
                }
                if (Schema::hasColumn('files', 'total_rows')) {
                    $table->renameColumn('total_rows', 'rows_detected');
                }

                // Update status enum
                if (Schema::hasColumn('files', 'status')) {
                    $table->dropColumn('status');
                }
            });

            Schema::table('files', function (Blueprint $table) {
                $table->enum('status', ['uploaded', 'parsed', 'validated', 'committed', 'failed'])->after('rows_detected')
                    ->default('uploaded')->index();

                if (Schema::hasColumn('files', 'uploaded_by')) {
                    $table->renameColumn('uploaded_by', 'created_by');
                }
                $table->softDeletes();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('files', function (Blueprint $table) {
            $table->dropSoftDeletes();
            $table->dropColumn(['type', 'status']);
            $table->renameColumn('original_name', 'name');
            $table->renameColumn('storage_path', 'file_path');
            $table->renameColumn('size_bytes', 'size');
            $table->renameColumn('rows_detected', 'total_rows');
            $table->renameColumn('created_by', 'uploaded_by');
        });

        Schema::table('files', function (Blueprint $table) {
            $table->enum('type', ['BOH', 'BI', 'BANK'])->after('id');
            $table->enum('status', ['uploaded', 'parsing', 'parsed', 'validating', 'validated', 'mapping', 'mapped', 'processing', 'completed', 'failed'])->default('uploaded');
        });
    }
};
