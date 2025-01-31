<?php

use App\Livewire\Account;
use App\Livewire\Category;
use App\Livewire\Label;
use App\Livewire\Payments;
use App\Livewire\Receivables;
use App\Livewire\Records;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');

    Route::get('/labels', Label::class)->name('labels');
    Route::get('/categories', Category::class)->name('categories');
    Route::get('/accounts', Account::class)->name('accounts');
    Route::get('/records', Records::class)->name('records');
    Route::get('/receivables', Receivables::class)->name('receivables');
    Route::get('/payments', Payments::class)->name('payments');
});
