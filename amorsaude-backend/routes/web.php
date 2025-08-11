<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClinicController;

Route::get('/home', function () {
    return view('home');
})->name('home');

Route::get('/', function () {
    return redirect()->route('clinics.index');
});

Route::resource('clinics', ClinicController::class);
