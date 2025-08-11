<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Clinic;
use Illuminate\Http\Request;

class ClinicController extends Controller
{
    /**
     * Listar todas as clínicas com paginação.
     */
    public function index()
    {
        $clinics = Clinic::paginate(10); // 10 por página
        return response()->json($clinics);
    }

    /**
     * Exibir uma clínica específica pelo ID.
     */
    public function show($id)
    {
        $clinic = Clinic::find($id);

        if (!$clinic) {
            return response()->json(['message' => 'Clínica não encontrada'], 404);
        }

        return response()->json($clinic);
    }

    /**
     * Criar uma nova clínica.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'corporate_name' => 'required|string|max:255',
            'fantasy_name' => 'required|string|max:255',
            'cnpj' => 'required|string|max:20|unique:clinics,cnpj',
            'region' => 'required|string|max:255',
            'inauguration_date' => 'required|date',
            'active' => 'boolean',
            'medical_specialties' => 'required|array|min:5',
            'medical_specialties.*' => 'string',
        ]);

        $clinic = Clinic::create($validated);

        return response()->json($clinic, 201);
    }

    /**
     * Atualizar dados de uma clínica pelo ID.
     */
    public function update(Request $request, $id)
    {
        $clinic = Clinic::find($id);

        if (!$clinic) {
            return response()->json(['message' => 'Clínica não encontrada'], 404);
        }

        $validated = $request->validate([
            'corporate_name' => 'sometimes|required|string|max:255',
            'fantasy_name' => 'sometimes|required|string|max:255',
            'cnpj' => 'sometimes|required|string|max:20|unique:clinics,cnpj,' . $id,
            'region' => 'sometimes|required|string|max:255',
            'inauguration_date' => 'sometimes|required|date',
            'active' => 'boolean',
            'medical_specialties' => 'sometimes|required|array|min:5',
            'medical_specialties.*' => 'string',
        ]);

        $clinic->update($validated);

        return response()->json($clinic);
    }

    /**
     * Deletar uma clínica pelo ID.
     */
    public function destroy($id)
    {
        $clinic = Clinic::find($id);

        if (!$clinic) {
            return response()->json(['message' => 'Clínica não encontrada'], 404);
        }

        $clinic->delete();

        return response()->json(null, 204);
    }
}