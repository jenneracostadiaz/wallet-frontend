<?php

namespace App\Livewire;

use Illuminate\View\View;
use Livewire\Attributes\Layout;
use Livewire\Component;

class Account extends Component
{
    #[Layout('layouts.app')]
    public function render(): View
    {
        return view('livewire.account');
    }
}
