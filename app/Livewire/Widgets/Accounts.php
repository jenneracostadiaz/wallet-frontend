<?php

namespace App\Livewire\Widgets;

use Illuminate\View\View;
use Livewire\Attributes\On;
use Livewire\Component;

class Accounts extends Component
{
    #[On('refreshRecords')]
    public function refreshRecords(): void
    {
        $this->render();
    }

    public function render(): View
    {
        return view('livewire.widgets.accounts', [
            'accounts' => auth()->user()->accounts->where('current_balance', '>', 0),
        ]);
    }
}
