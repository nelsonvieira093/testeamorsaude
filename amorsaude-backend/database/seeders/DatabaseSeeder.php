<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;
use Database\Seeders\UsersTableSeeder; // Import UsersTableSeeder so it can be referenced below

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Desabilita as checagens de foreign keys para permitir truncate
        Schema::disableForeignKeyConstraints();

        // Trunca a tabela users para limpar dados antigos e evitar duplicação
        DB::table('users')->truncate();

        // Reabilita as checagens de foreign keys após truncate
        Schema::enableForeignKeyConstraints();

        // Chame os outros seeders aqui, por exemplo:
        ///$this->call(UsersTableSeeder::class);
        // $this->call(OutrosSeeders::class); // Removido porque OutrosSeeders não está definido
    }
}