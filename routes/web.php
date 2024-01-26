<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KriteriaController;
use App\Http\Controllers\AlternatifController;
use App\Http\Controllers\PerhitunganMooraController;
use App\Http\Controllers\SubKriteriaController;
use App\Models\PerhitunganMoora;

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
// Alternatif
Route::get('alternatif', [AlternatifController::class, 'index']);
Route::get('/dataTablesAlternatif', [AlternatifController::class, 'dataTablesAlternatif']);
Route::post('/alternatif-store', [AlternatifController::class, 'store']);
Route::get('/alternatif-edit/{alternatif:uuid}', [AlternatifController::class, 'edit']);
Route::post('/alternatif-update/{alternatif:uuid}', [AlternatifController::class, 'update']);
Route::post('/alternatif-destroy/{alternatif:uuid}', [AlternatifController::class, 'destroy']);
// Perhitunga Moora
Route::get('/moora', [PerhitunganMooraController::class, 'index']);
Route::get('/moora-create', [PerhitunganMooraController::class, 'create']);
Route::get('/moora-update/{moora:uuid}', [PerhitunganMooraController::class, 'update']);
Route::get('/moora-normalisasi', [PerhitunganMooraController::class, 'normalisasi']);
Route::get('/moora-preferensi', [PerhitunganMooraController::class, 'preferensi']);
Route::get('/saw', [PerhitunganMooraController::class, 'index_saw']);
