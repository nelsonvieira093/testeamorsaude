<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ClinicController;
use App\Http\Controllers\Api\AuthController;
use App\Models\User;

Route::apiResource('clinics', ClinicController::class);

// Atenção: A rota abaixo é redundante se já existe a rota store via apiResource
// Pode ser removida. Caso queira sobrescrever store, mantenha-a, mas não é necessário.
// Route::post('/clinics', [ClinicController::class, 'store']);

Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->get('/user', function (Request $request): User {
    return $request->user();
});