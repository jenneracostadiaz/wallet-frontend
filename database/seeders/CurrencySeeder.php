<?php

namespace Database\Seeders;

use App\Models\Currency;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CurrencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Currency::query()->create([
            'name' => 'Soles',
            'symbol' => 'S/',
            'code' => 'PEN',
        ]);

        Currency::query()->create([
            'name' => 'Dólares',
            'symbol' => '$',
            'code' => 'USD',
        ]);

        Currency::query()->create([
            'name' => 'Euros',
            'symbol' => '€',
            'code' => 'EUR',
        ]);
    }
}
