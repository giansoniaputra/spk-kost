<?php

use App\Http\Controllers\KriteriaController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    $data = [
        'title' => 'Dashboard'
    ];
    return view('welcome', $data);
});
// KRITERIA
Route::resource('/kriteria', KriteriaController::class);
Route::get('/dataTablesKriteria', [KriteriaController::class, 'dataTablesKriteria']);
Route::get('/kriteriaEdit/{kreteria:uuid}', [KriteriaController::class, 'edit']);
