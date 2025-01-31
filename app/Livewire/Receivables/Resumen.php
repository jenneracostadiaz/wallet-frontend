<?php

namespace App\Livewire\Receivables;

use Illuminate\View\View;
use Livewire\Attributes\On;
use Livewire\Component;

class Resumen extends Component
{
    #[On('getReceivables')]
    public function getReceivables(): void
    {
        $this->render();
    }

    public function render(): View
    {
        return view('livewire.receivables.resumen', [
            'resume' => auth()->user()->receivables()
                ->whereMonth('due_date', now()->month)
                ->where('is_paid', false)
                ->selectRaw('name, strftime("%Y-%m", due_date) as month, SUM(amount) as total_amount')
                ->groupBy('name')
                ->orderBy('due_date')
                ->get(),
        ]);
    }
}
