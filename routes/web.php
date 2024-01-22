<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KriteriaController;
use App\Http\Controllers\SubKriteriaController;

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
        'title' => 'Kriteria'
    ];
    return view('kriteria.index', $data);
});
// KRITERIA
Route::resource('/kriteria', KriteriaController::class);
Route::get('/dataTablesKriteria', [KriteriaController::class, 'dataTablesKriteria']);
Route::get('/kriteriaEdit/{kreteria:uuid}', [KriteriaController::class, 'edit']);
// SUB KRITERIA
Route::resource('/subKriteria', SubKriteriaController::class);
Route::get('/dataTablesSubKriteria', [SubKriteriaController::class, 'dataTablesSubKriteria']);
