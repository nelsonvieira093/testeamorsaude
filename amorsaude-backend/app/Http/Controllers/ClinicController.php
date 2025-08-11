<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ClinicController extends Controller
{
    // Lista mockada de clínicas (um exemplo com 3 para manter curto, você pode usar todas)
    private $mockClinics = [
        [
            'id' => 1,
            'corporateName' => 'Clínica Amor Saúde Ltda',
            'fantasyName' => 'Amor Saúde Centro',
            'cnpj' => '12.345.678/0001-99',
            'region' => 'Centro',
            'inaugurationDate' => '2020-01-15',
            'active' => true,
            'medicalSpecialties' => ['1', '2'],
            'address' => 'Rua Principal, 123',
            'city' => 'São Paulo',
            'state' => 'SP',
        ],
        [
            'id' => 2,
            'corporateName' => 'Saúde e Bem Estar S/A',
            'fantasyName' => 'Clínica Bem Estar',
            'cnpj' => '98.765.432/0001-11',
            'region' => 'Zona Norte',
            'inaugurationDate' => '2019-05-20',
            'active' => true,
            'medicalSpecialties' => ['3'],
            'address' => 'Av. Secundária, 456',
            'city' => 'São Paulo',
            'state' => 'SP',
        ],
        [
            'id' => 3,
            'corporateName' => 'Vida Saudável Serviços Médicos Ltda',
            'fantasyName' => 'Clínica Vida Saudável',
            'cnpj' => '23.456.789/0001-22',
            'region' => 'Zona Sul',
            'inaugurationDate' => '2018-08-10',
            'active' => true,
            'medicalSpecialties' => ['1', '4'],
            'address' => 'Rua das Flores, 789',
            'city' => 'São Paulo',
            'state' => 'SP',
        ],
        // ... Adicione as outras clínicas seguindo o mesmo padrão ...
    ];

    /**
     * Exibe a lista de clínicas (usando dados mockados).
     */
    public function index()
    {
        // Passa a lista para a view
        $clinics = collect($this->mockClinics);

        return view('clinics.index', compact('clinics'));
    }
}
