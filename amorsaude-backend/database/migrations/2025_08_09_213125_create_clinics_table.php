<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('clinics', function (Blueprint $table) {
            $table->id();
            $table->string('company_name');       // Razão Social (obrigatório)
            $table->string('fantasy_name');       // Nome Fantasia (obrigatório)
            $table->string('cnpj', 18)->unique(); // CNPJ (com formatação)
            $table->string('region');             // Regional (ex: "Centro", "SP")
            $table->date('inauguration_date');    // Data de inauguração
            $table->boolean('active')->default(true); // Status (Ativa/Inativa)
            $table->json('medical_specialties');  // Array de especialidades
            $table->timestamps();                 // created_at e updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('clinics');
    }
};