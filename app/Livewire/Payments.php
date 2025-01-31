<?php

namespace App\Livewire;

use Illuminate\View\View;
use Livewire\Attributes\Layout;
use Livewire\Component;

class Payments extends Component
{
    #[Layout('layouts.app')]
    public function render(): View
    {
        return view('livewire.payments');
    }
}
