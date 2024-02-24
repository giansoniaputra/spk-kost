<?php

use App\Models\Kriteria;
use App\Models\Alternatif;
use App\Models\PerhitunganMoora;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\KriteriaController;
use App\Http\Controllers\AlternatifController;
use App\Http\Controllers\SubKriteriaController;
use App\Http\Controllers\PerhitunganMooraController;

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
        'title' => 'Dashboard',
        'alternatif' => Alternatif::count('id'),
        'kriteria' => Kriteria::count('id'),
    ];
    return view('dashboard', $data);
});
Route::get('/home', function () {
    $data = [
        'title' => 'Dashboard',
        'alternatif' => Alternatif::count('id'),
        'kriteria' => Kriteria::count('id'),
    ];
    return view('dashboard', $data);
});
// AUTH
Route::get('/auth', [AuthController::class, 'index'])->name('login')->middleware('guest');
Route::post('/authenticate', [AuthController::class, 'authenticate']);
Route::get('/logout', [AuthController::class, 'logout']);
Route::get('/register', [AuthController::class, 'register']);
Route::post('/register-create', [AuthController::class, 'create']);
Route::get('/dataTablesUser', [AuthController::class, 'dataTables'])->middleware('auth');

// KRITERIA
Route::resource('/kriteria', KriteriaController::class)->middleware('auth');
Route::get('/dataTablesKriteria', [KriteriaController::class, 'dataTablesKriteria'])->middleware('auth');
Route::get('/kriteriaEdit/{kreteria:uuid}', [KriteriaController::class, 'edit'])->middleware('auth');
// SUB KRITERI->middleware('auth')A
Route::resource('/subKriteria', SubKriteriaController::class)->middleware('auth');
Route::get('/dataTablesSubKriteria', [SubKriteriaController::class, 'dataTablesSubKriteria'])->middleware('auth');
// Alternati->middleware('auth')f
Route::get('alternatif', [AlternatifController::class, 'index'])->middleware('auth');
Route::get('/dataTablesAlternatif', [AlternatifController::class, 'dataTablesAlternatif'])->middleware('auth');
Route::post('/alternatif-store', [AlternatifController::class, 'store'])->middleware('auth');
Route::get('/alternatif-edit/{alternatif:uuid}', [AlternatifController::class, 'edit'])->middleware('auth');
Route::post('/alternatif-update/{alternatif:uuid}', [AlternatifController::class, 'update'])->middleware('auth');
Route::post('/alternatif-destroy/{alternatif:uuid}', [AlternatifController::class, 'destroy'])->middleware('auth');
// Perhitunga Moor->middleware('auth')a
Route::get('/moora', [PerhitunganMooraController::class, 'index'])->middleware('auth');
Route::get('/moora-create', [PerhitunganMooraController::class, 'create'])->middleware('auth');
Route::get('/moora-update/{moora:uuid}', [PerhitunganMooraController::class, 'update'])->middleware('auth');
Route::get('/saw-normalisasi', [PerhitunganMooraController::class, 'normalisasi'])->middleware('auth');
Route::get('/moora-preferensi', [PerhitunganMooraController::class, 'preferensi'])->middleware('auth');
Route::get('/saw', [PerhitunganMooraController::class, 'index_saw'])->middleware('auth');
