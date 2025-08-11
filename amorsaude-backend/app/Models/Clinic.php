<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Clinic extends Model
{
    protected $table = 'clinics';

    // Campos que podem ser atribuídos em massa
    protected $fillable = [
        'corporate_name',
        'fantasy_name',
        'cnpj',
        'region',
        'inauguration_date',
        'active',
        'medical_specialties',
    ];

    // Cast dos campos específicos
    protected $casts = [
        'inauguration_date' => 'date',
        'active' => 'boolean',
        'medical_specialties' => 'array', // Laravel converterá JSON para array automaticamente
    ];
}