<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;

beforeEach(function () {
    config()->set('database.default', 'sqlite');
    config()->set('database.connections.sqlite.database', ':memory:');
});

it('redirects guests to login for home', function () {
    $response = get('/');
    $response->assertRedirect(route('login'));
});

it('renders dashboard on home for authenticated users', function () {
    $user = User::factory()->make([
        'id' => 1,
        'email_verified_at' => now(),
    ]);
    actingAs($user);

    $response = get('/');

    $response->assertInertia(fn (Assert $page) => $page->component('dashboard'));
});