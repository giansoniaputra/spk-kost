@extends('layouts.main')
@section('container')
<div class="row">
    <div class="col-lg-3 col-6">

        <div class="small-box bg-info">
            <div class="inner">
                <h3>{{ $alternatif }}</h3>
                <p>Alternatif</p>
            </div>
            <div class="icon">
                <i class="ion ion-bag"></i>
            </div>
            <a href="/alternatif" class="small-box-footer">Selengkapnya <i class="fas fa-arrow-circle-right"></i></a>
        </div>
    </div>

    <div class="col-lg-3 col-6">

        <div class="small-box bg-success">
            <div class="inner">
                <h3>{{ $kriteria }}</h3>
                <p>Kriteria</p>
            </div>
            <div class="icon">
                <i class="ion ion-stats-bars"></i>
            </div>
            <a href="/kriteria" class="small-box-footer">Selengkapnya <i class="fas fa-arrow-circle-right"></i></a>
        </div>
    </div>

    <div class="col-lg-3 col-6">

        <div class="small-box bg-warning">
            <div class="inner">
                <h3>{{ $alternatif }}</h3>
                <p>Penilaian</p>
            </div>
            <div class="icon">
                <i class="ion ion-person-add"></i>
            </div>
            <a href="/moora" class="small-box-footer">Selengkapnya <i class="fas fa-arrow-circle-right"></i></a>
        </div>
    </div>
</div>
<p>Metode <b>Multi-Objective Optimization by Ratio Analysis (MOORA)</b> adalah suatu teknik optimasi multi objective
    yang dapat berhasil diterapkan untuk memecahkan berbagai jenis masalah pengambilan keputusan yang kompleks.
    Metode <b>SAW (Simple Additive Weighting)</b> merupakan teknik pengambilan keputusan yang menggabungkan
    preferensi berdasarkan bobot kriteria pada setiap alternatif. Aplikasi ini Mengkombinasikan antara Metode <b>MOORA</b>
    dan metode <b>SAW</b>, untuk perhitungan pertama menggunakan metode <b>MOORA</b> untuk mencari nilai normalisasi
    kemudian menggunakan metode <b>SAW</b> untuk mencari nilai preferensi, setelah diketahui nilai preferensi maka
    dilakukan perankingan</p>
@endsection
