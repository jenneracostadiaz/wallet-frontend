<?php

namespace App\Livewire\Records;

use Illuminate\View\View;
use Livewire\Component;

class Create extends Component
{
    public bool $modal = false;

    public function openModal(): void
    {
        $this->modal = true;
    }

    public function render(): View
    {
        return view('livewire.records.create');
    }
}
