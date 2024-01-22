<?php

namespace App\Http\Controllers;

use App\Models\Kriteria;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;
use Illuminate\Support\Facades\Validator;

class KriteriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = [
            'title' => 'Kriteria'
        ];
        return view('kriteria.index', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $rules = [
            'kode' => 'required',
            'kriteria' => 'required',
            'atribut' => 'required',
            'bobot' => 'required',
        ];
        $pesan = [
            'kode.required' => "Kode tidak boleh kosong",
            'kriteria.required' => "Kriteria tidak boleh kosong",
            'atribut.required' => "Atribut tidak boleh kosong",
            'bobot.required' => "Atribut tidak boleh kosong",
        ];
        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()]);
        } else {
            $data = [
                'uuid' => Str::orderedUuid(),
                'kode' => strtoupper($request->kode),
                'kriteria' => $request->kriteria,
                'atribut' => $request->atribut,
                'bobot' => $request->bobot,
            ];
            Kriteria::create($data);
            return response()->json(['success' => 'Kriteria Berhasil Disimpan']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Kriteria $kriteria)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kriteria $kriteria, Request $request)
    {
        $data = Kriteria::where('uuid', $request->uuid)->first();
        return response()->json(['data' => $data]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Kriteria $kriteria)
    {
        $rules = [
            'kode' => 'required',
            'kriteria' => 'required',
            'atribut' => 'required',
            'bobot' => 'required',
        ];
        $pesan = [
            'kode.required' => "Kode tidak boleh kosong",
            'kriteria.required' => "Kriteria tidak boleh kosong",
            'atribut.required' => "Atribut tidak boleh kosong",
            'bobot.required' => "Atribut tidak boleh kosong",
        ];
        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()]);
        } else {
            $data = [
                'kode' => strtoupper($request->kode),
                'kriteria' => $request->kriteria,
                'atribut' => $request->atribut,
                'bobot' => $request->bobot,
            ];
            Kriteria::where('uuid', $request->uuid)->update($data);
            return response()->json(['success' => 'Kriteria Berhasil Disimpan']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kriteria $kriteria, Request $request)
    {
        Kriteria::where('uuid', $request->uuid)->delete();
        return response()->json(['success' => 'Data Kriteria Berhasil Dihapus']);
    }

    public function dataTablesKriteria(Request $request)
    {
        $query = Kriteria::all();
        $sum_bobot = Kriteria::sum('bobot');
        foreach ($query as $row) {
            $row->bobot = floatval(number_format($row->bobot / $sum_bobot, 1));
        }
        return DataTables::of($query)->addColumn('action', function ($row) {
            $actionBtn =
                '
                <button class="btn btn-rounded btn-sm btn-warning text-dark edit-button" title="Edit Data" data-uuid="' . $row->uuid . '"><i class="fas fa-edit"></i></button>
                <button class="btn btn-rounded btn-sm btn-danger text-white delete-button" title="Hapus Data" data-uuid="' . $row->uuid . '" data-token="' . csrf_token() . '"><i class="fas fa-trash-alt"></i></button>';
            return $actionBtn;
        })->make(true);
    }
}
