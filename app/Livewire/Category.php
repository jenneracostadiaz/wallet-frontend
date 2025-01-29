<?php

namespace App\Livewire;

use App\Models\Category as CategoryModel;
use Illuminate\View\View;
use Livewire\Attributes\Layout;
use Livewire\Component;

class Category extends Component
{
    public bool $modal = false;

    public function openModal(): void
    {
        $this->modal = true;
    }


    #[Layout('layouts.app')]
    public function render(): View
    {
        return view('livewire.category', [
            'categories' => CategoryModel::all()
        ]);
    }
}
