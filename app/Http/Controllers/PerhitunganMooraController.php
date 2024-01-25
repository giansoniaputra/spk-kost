<?php

namespace App\Http\Controllers;

use App\Models\Kriteria;
use App\Models\Alternatif;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\PerhitunganMoora;
use Illuminate\Support\Facades\DB;

class PerhitunganMooraController extends Controller
{
    public function index()
    {
        $data = [
            'title' => 'Perhitungan Moora',
            'mooras' => DB::table('perhitungan_mooras as a')
                ->join('alternatifs as b', 'a.alternatif_uuid', '=', 'b.uuid')
                ->select('a.*', 'b.alternatif', 'b.keterangan')
                ->orderBy('b.alternatif', 'asc'),
            'kriterias' => Kriteria::orderBy('kode', 'asc')->get(),
            'alternatifs' => Alternatif::orderBy('alternatif', 'asc')->get(),
            'sum_kriteria' => Kriteria::count('id'),
        ];
        return view('moora.index', $data);
    }

    public function create()
    {
        $count = PerhitunganMoora::count('id');
        if ($count > 0) {
            DB::table('perhitungan_mooras')->truncate();
        }
        $kriterias = Kriteria::orderBy('kode', 'asc')->get();
        $alternatifs = Alternatif::orderBy('alternatif', 'asc')->get();
        foreach ($alternatifs as $alternatif) {
            foreach ($kriterias as $kriteria) {
                $data = [
                    'uuid' => Str::orderedUuid(),
                    'alternatif_uuid' => $alternatif->uuid,
                    'kriteria_uuid' => $kriteria->uuid,
                    'bobot' => 0
                ];
                PerhitunganMoora::create($data);
            }
        }
        return response()->json(['success' => 'Perhitungan Baru Berhasil Ditambahkan! Silahkan Masukan Nilainya']);
    }

    public function update(PerhitunganMoora $moora, Request $request)
    {
        PerhitunganMoora::where('uuid', $moora->uuid)->update(['bobot' => $request->bobot]);
        return response()->json(['success' => $request->bobot]);
    }

    public function normalisasi()
    {
        $array_pembilang = [];
        $array_pembagi = [];
        $count_alternatif = Alternatif::count('id');
        $kriterias = Kriteria::orderBy('kode', 'asc')->get();
        $alternatifs = Alternatif::orderBy('alternatif', 'asc')->get();
        foreach ($kriterias as $kriteria) {
            foreach ($alternatifs as $alternatif) {
                $query = PerhitunganMoora::where('alternatif_uuid', $alternatif->uuid)->where('kriteria_uuid', $kriteria->uuid)->first();
                $array_pembagi[] = pow($query->bobot, 2);
                $array_pembilang[] = $query->bobot;
            }
        }
        $kuadrat = array_chunk($array_pembagi, $count_alternatif);
        $pembilang = array_chunk($array_pembilang, $count_alternatif);
        $pembagi = [];
        foreach ($kuadrat as $row) {
            $jumlah = array_sum($row);
            $akarKuadrat = floatval(number_format(sqrt($jumlah), 3));
            $pembagi[] = $akarKuadrat;
        }
        $hasil = [];
        foreach ($pembilang as $row => $val) {
            $hasil[$row] = array_map(function ($value) use ($row, $pembagi) {
                return floatval(number_format($value / $pembagi[$row], 3));
            }, $val);
        }
        return response()->json(['hasil' => $hasil]);
    }

    public function preferensi(Request $request)
    {
        $data = $request->data;
        $kriterias = Kriteria::orderBy('kode', 'asc');

        $bobot = [];
        foreach ($kriterias->get() as $kriteria) {
            $bobot[] = kriteria::bobot($kriteria->bobot);
        }
        $result_array = [];
        for ($i = 0; $i < count($data); $i++) {
            for ($j = 0; $j < count($bobot); $j++) {
                $result_array[] = floatval(number_format($data[$i][$j] * $bobot[$j], 3));
            }
        }
        $final_result = array_chunk($result_array, $kriterias->count('id'));
        return response()->json(['result' => $final_result]);
    }
}
