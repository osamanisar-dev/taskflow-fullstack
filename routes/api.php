<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\Website\WebsiteBlogController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group(['prefix' => 'auth'], function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);

});

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::prefix('blogs')->group(function () {
        Route::get('/', [BlogController::class, 'index']);
        Route::post('/', [BlogController::class, 'store']);
        Route::put('/{blog}', [BlogController::class, 'update']);
        Route::delete('/{blog}', [BlogController::class, 'destroy']);
    });
});

Route::prefix('public')->group(function (){
    Route::get('blogs',[WebsiteBlogController::class,'index']);
    Route::get('blogs/{blog}',[WebsiteBlogController::class,'detail']);
});

