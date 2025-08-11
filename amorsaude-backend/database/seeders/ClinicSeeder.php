<?php

namespace Database\Seeders;

use App\Models\Clinic;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClinicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $clinics = [
            [
                'company_name' => 'Amor Saúde Centro Ltda',
                'fantasy_name' => 'Amor Saúde Centro',
                'cnpj' => '12.345.678/0001-99',
                'region' => 'Centro',
                'inauguration_date' => '2020-01-15',
                'active' => true,
                'medical_specialties' => ['Cardiologia', 'Dermatologia', 'Pediatria', 'Ginecologia', 'Ortopedia']
            ],
            [
                'company_name' => 'Bem Estar Saúde S/A',
                'fantasy_name' => 'Clínica Bem Estar',
                'cnpj' => '98.765.432/0001-11',
                'region' => 'Zona Norte',
                'inauguration_date' => '2019-05-20',
                'active' => true,
                'medical_specialties' => ['Cardiologia', 'Neurologia', 'Pediatria', 'Oftalmologia', 'Ortopedia']
            ],
            [
                'company_name' => 'Vida Saudável Medicina Ltda',
                'fantasy_name' => 'Clínica Vida Saudável',
                'cnpj' => '23.456.789/0001-22',
                'region' => 'Zona Sul',
                'inauguration_date' => '2021-03-10',
                'active' => true,
                'medical_specialties' => ['Dermatologia', 'Ginecologia', 'Pediatria', 'Neurologia', 'Oftalmologia']
            ],
            [
                'company_name' => 'Bem Viver Centro Médico S/A',
                'fantasy_name' => 'Centro Médico Bem Viver',
                'cnpj' => '34.567.890/0001-33',
                'region' => 'Zona Leste',
                'inauguration_date' => '2018-11-05',
                'active' => true,
                'medical_specialties' => ['Cardiologia', 'Ortopedia', 'Neurologia', 'Oftalmologia', 'Ginecologia']
            ],
            [
                'company_name' => 'Saúde Integral Ltda',
                'fantasy_name' => 'Saúde Integral',
                'cnpj' => '45.678.901/0001-44',
                'region' => 'Zona Oeste',
                'inauguration_date' => '2022-02-28',
                'active' => false,
                'medical_specialties' => ['Pediatria', 'Dermatologia', 'Oftalmologia', 'Neurologia', 'Ginecologia']
            ],
            [
                'company_name' => 'Vida Plena Saúde S/A',
                'fantasy_name' => 'Vida Plena',
                'cnpj' => '56.789.012/0001-55',
                'region' => 'Centro',
                'inauguration_date' => '2020-07-15',
                'active' => true,
                'medical_specialties' => ['Cardiologia', 'Ortopedia', 'Neurologia', 'Dermatologia', 'Pediatria']
            ],
            [
                'company_name' => 'Horizonte Saúde Ltda',
                'fantasy_name' => 'Horizonte Saúde',
                'cnpj' => '67.890.123/0001-66',
                'region' => 'Zona Norte',
                'inauguration_date' => '2021-09-01',
                'active' => true,
                'medical_specialties' => ['Ginecologia', 'Oftalmologia', 'Cardiologia', 'Pediatria', 'Dermatologia']
            ]
        ];

        foreach ($clinics as $clinic) {
            Clinic::create([
                'company_name' => $clinic['company_name'],
                'fantasy_name' => $clinic['fantasy_name'],
                'cnpj' => $clinic['cnpj'],
                'region' => $clinic['region'],
                'inauguration_date' => $clinic['inauguration_date'],
                'active' => $clinic['active'],
                'medical_specialties' => json_encode($clinic['medical_specialties'])
            ]);
        }
    }
}