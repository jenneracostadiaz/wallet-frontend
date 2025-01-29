<?php

namespace Database\Seeders;

use App\Models\Label;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LabelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $labels = [
            [
                'name' => 'Pago Completo',
                'color' => '#3CD33E',
                'user_id' => User::query()->first()->id,
            ],
            [
                'name' => 'Pago Parcial',
                'color' => '#60FBF8',
                'user_id' => User::query()->first()->id,
            ],
            [
                'name' => 'Pendiente de Pago',
                'color' => '#FF0000',
                'user_id' => User::query()->first()->id,
            ],
        ];

        foreach ($labels as $label) {
            Label::query()->create($label);
        }
    }
}
