<?php

use Illuminate\Support\Facades\Route;

it('home route points to DashboardController@index', function () {
    $route = Route::getRoutes()->getByName('home');
    expect($route)->not->toBeNull();
    expect($route->getActionName())->toBe('App\\Http\\Controllers\\DashboardController@index');
});

it('dashboard route points to DashboardController@index', function () {
    $route = Route::getRoutes()->getByName('dashboard');
    expect($route)->not->toBeNull();
    expect($route->getActionName())->toBe('App\\Http\\Controllers\\DashboardController@index');
});
