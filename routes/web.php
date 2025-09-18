<?php

use App\Http\Controllers\FileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PurchasesController;
use App\Http\Controllers\SalesController;
use App\Http\Controllers\MasterController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Purchases Routes - BOH Data Import & Processing
    Route::prefix('purchases')->name('purchases.')->group(function () {
        Route::get('import', [PurchasesController::class, 'import'])->name('import');
        Route::post('upload', [PurchasesController::class, 'upload'])->name('upload'); // BOH file upload
        Route::get('transform', [PurchasesController::class, 'transform'])->name('transform');
        Route::get('mapping', [PurchasesController::class, 'mapping'])->name('mapping');
        Route::get('posting', [PurchasesController::class, 'posting'])->name('posting');
        Route::get('history', [PurchasesController::class, 'history'])->name('history');

        // API endpoints
        Route::post('process-transform', [PurchasesController::class, 'processTransform'])->name('process-transform');
        Route::post('update-mapping', [PurchasesController::class, 'updateMapping'])->name('update-mapping');
        Route::post('post-to-accurate', [PurchasesController::class, 'postToAccurate'])->name('post-to-accurate');

        // Sales Order Items API
        Route::get('files/{file}/sales-order-items', [PurchasesController::class, 'getSalesOrderItems'])->name('get-sales-order-items');
        Route::put('sales-order-items/{item}', [PurchasesController::class, 'updateSalesOrderItem'])->name('update-sales-order-item');
    });

    // Sales Routes - BI Sales & Bank Reconciliation
    Route::prefix('sales')->name('sales.')->group(function () {
        Route::get('upload-bi', [SalesController::class, 'uploadBi'])->name('upload-bi');
        Route::post('upload-bi', [SalesController::class, 'uploadBiFile'])->name('upload-bi-file'); // BI file upload
        Route::get('upload-bank', [SalesController::class, 'uploadBank'])->name('upload-bank');
        Route::post('upload-bank', [SalesController::class, 'uploadBankFile'])->name('upload-bank-file'); // Bank file upload
        Route::get('auto-discount', [SalesController::class, 'autoDiscount'])->name('auto-discount');
        Route::get('verification', [SalesController::class, 'verification'])->name('verification');
        Route::get('review', [SalesController::class, 'review'])->name('review');
        Route::get('resume', [SalesController::class, 'resume'])->name('resume');

        // API endpoints
        Route::post('process-bi-sales', [SalesController::class, 'processBiSales'])->name('process-bi-sales');
        Route::post('process-reconciliation', [SalesController::class, 'processReconciliation'])->name('process-reconciliation');
        Route::post('approve-differences', [SalesController::class, 'approveDifferences'])->name('approve-differences');
    });

    // Master Data & Mapping Routes
    Route::prefix('master')->name('master.')->group(function () {
        Route::get('coa', [MasterController::class, 'coa'])->name('coa');
        Route::get('channels', [MasterController::class, 'channels'])->name('channels');
        Route::get('items', [MasterController::class, 'items'])->name('items');
        Route::get('banks', [MasterController::class, 'banks'])->name('banks');
        Route::get('tax-rules', [MasterController::class, 'taxRules'])->name('tax-rules');

        // API endpoints
        Route::post('update-coa', [MasterController::class, 'updateCoa'])->name('update-coa');
        Route::post('update-channel', [MasterController::class, 'updateChannel'])->name('update-channel');
        Route::post('update-item', [MasterController::class, 'updateItem'])->name('update-item');
        Route::post('update-tolerance', [MasterController::class, 'updateTolerance'])->name('update-tolerance');
    });

    // Integration Routes - External System Connections
    Route::prefix('integration')->name('integration.')->group(function () {
        Route::get('boh', function () {
            return Inertia::render('integration/boh');
        })->name('boh');
        
        Route::get('bi', function () {
            return Inertia::render('integration/bi');
        })->name('bi');
        
        Route::get('accurate', function () {
            return Inertia::render('integration/accurate');
        })->name('accurate');
        
        Route::get('bank-api', function () {
            return Inertia::render('integration/bank-api');
        })->name('bank-api');
        
        Route::get('scheduler', function () {
            return Inertia::render('integration/scheduler');
        })->name('scheduler');
    });

    // Audit & Monitoring Routes
    Route::prefix('audit')->name('audit.')->group(function () {
        Route::get('logs', function () {
            return Inertia::render('audit/logs');
        })->name('logs');
        
        Route::get('errors', function () {
            return Inertia::render('audit/errors');
        })->name('errors');
        
        Route::get('notifications', function () {
            return Inertia::render('audit/notifications');
        })->name('notifications');
    });

    // File management routes
    Route::prefix('files')->name('files.')->group(function () {
        Route::get('/', [FileController::class, 'index'])->name('index');
        Route::post('/upload', [FileController::class, 'upload'])->name('upload');
        Route::post('/{file}/parse', [FileController::class, 'parse'])->name('parse');
        Route::get('/{file}/preview', [FileController::class, 'preview'])->name('preview');
        Route::get('/{file}', [FileController::class, 'show'])->name('show');
        Route::delete('/{file}', [FileController::class, 'destroy'])->name('destroy');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
