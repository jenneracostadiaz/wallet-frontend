<?php

namespace App\Livewire;

use App\Models\Record;
use Illuminate\View\View;
use Livewire\Attributes\Layout;
use Livewire\Attributes\On;
use Livewire\Component;

class Records extends Component
{
    #[On('refreshRecords')]
    public function refreshRecords(): void
    {
        $this->render();
    }

    public function delete(Record $id): void
    {
        $id->delete();
    }

    #[Layout('layouts.app')]
    public function render(): View
    {
        return view('livewire.records', [
            'records' => auth()->user()->records()
                ->with('account', 'currency', 'category', 'label')
                ->orderBy('date', 'desc')
                ->orderBy('time', 'desc')
                ->paginate(25)
        ]);
    }
}
