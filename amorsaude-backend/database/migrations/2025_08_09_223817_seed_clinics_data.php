<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        DB::table('clinics')->insert([
            [
                'company_name' => 'Amor Saúde Centro Ltda',
                'fantasy_name' => 'Amor Saúde Centro',
                'cnpj' => '12.345.678/0001-99',
                'region' => 'Centro',
                'inauguration_date' => '2020-01-15',
                'active' => true,
                'medical_specialties' => json_encode(['Cardiologia', 'Dermatologia', 'Pediatria', 'Ginecologia', 'Ortopedia']),
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'company_name' => 'Bem Estar Saúde S/A',
                'fantasy_name' => 'Clínica Bem Estar',
                'cnpj' => '98.765.432/0001-11',
                'region' => 'Zona Norte',
                'inauguration_date' => '2019-05-20',
                'active' => true,
                'medical_specialties' => json_encode(['Cardiologia', 'Neurologia', 
                'Pediatria', 'Oftalmologia',
                'Ortopedia','Ginecologia', 'Dermatologia']),
                'created_at' => now(),
                'updated_at' => now()
            ],
            // Adicione as outras 5 clínicas seguindo o mesmo padrão
        ]);
    }

    public function down()
    {
        DB::table('clinics')->whereIn('cnpj', [
            '12.345.678/0001-99',
            '98.765.432/0001-11'
            // Adicione os outros CNPJs
        ])->delete();
    }
};