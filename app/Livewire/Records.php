<?php

namespace App\Livewire;

use App\Models\Record;
use Illuminate\View\View;
use Livewire\Attributes\Layout;
use Livewire\Attributes\On;
use Livewire\Component;
use Livewire\WithoutUrlPagination;
use Livewire\WithPagination;

class Records extends Component
{
    use WithPagination, WithoutUrlPagination;

    public $filterAccount;
    public $filterDate;
    public $filterType;

    public $perPage = 25;

    #[On('refreshRecords')]
    public function refreshRecords(): void
    {
        $this->render();
    }

    public function delete(Record $id): void
    {
        $type = $id->type;
        $account = $id->account;
        if ($type === 'expense') {
            $account->current_balance += $id->amount;
            $account->save();
            $id->delete();
        }
        if ($type === 'income') {
            $account->current_balance -= $id->amount;
            $account->save();
            $id->delete();
        }

        if ($type === 'transfer') {
            $to_account = $id->transfer()->first()->account;
            $account->current_balance += $id->amount;
            $account->save();
            $to_account->current_balance -= $id->amount;
            $to_account->save();
            $id->transfer()->delete();
            $id->delete();
        }
    }

    public function openModal(Record $record): void
    {
        $this->dispatch('edit_record', $record);
    }

    #[Layout('layouts.app')]
    public function render(): View
    {
        return view('livewire.records', [
            'records' => auth()->user()->records()
                ->when($this->filterType, fn($query) => $query->where('type', $this->filterType))
                ->when($this->filterAccount, fn($query) => $query->where('account_id', $this->filterAccount))
                ->when($this->filterDate, fn($query) => $query->whereDate('date', $this->filterDate))
                ->when($this->filterType == 'type', function ($query) {
                    $query->where('type', 'expense')
                        ->orWhere('type', 'income')
                        ->orWhere(function ($query) {
                            $query->where('type', 'transfer')
                                ->where('main_transfer', true);
                        });
                })
                ->when($this->filterType === 'transfer', fn($query) => $query->where('main_transfer', true))
                ->orderBy('date', 'desc')
                ->orderBy('time', 'desc')
                ->paginate($this->perPage),
            'accounts' => auth()->user()->accounts,
            'types' => ['expense', 'income', 'transfer'],
        ]);
    }
}
