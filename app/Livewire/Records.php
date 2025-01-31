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
            if ($id->main_transfer) {
                $account->current_balance += $id->amount;
                $account->save();
                $to_account = Record::query()->find($id->transfer_id)->account;
                $to_account->current_balance -= $id->amount;
            } else {
                $account->current_balance -= $id->amount;
                $account->save();
                $to_account = Record::query()->where('transfer_id', $id->id)->first()->account;
                $to_account->current_balance += $id->amount;
            }
            $to_account->save();
            $record_transfer = Record::query()->where('transfer_id', $id->id)->get();
            foreach ($record_transfer as $record) {
                $record->delete();
            }

            $id->delete();
        }

    }

    #[Layout('layouts.app')]
    public function render(): View
    {
        return view('livewire.records', [
            'records' => auth()->user()->records()
                ->where('type', 'expense')
                ->orWhere(function ($query) {
                    $query->where('type', 'transfer')
                        ->where('main_transfer', true);
                })
                ->when($this->filterAccount, fn($query) => $query->where('account_id', $this->filterAccount))
                ->with('account', 'currency', 'category', 'label')
                ->when($this->filterDate, fn($query) => $query->whereDate('date', $this->filterDate))
                ->orderBy('date', 'desc')
                ->orderBy('time', 'desc')
                ->paginate(25),
            'accounts' => auth()->user()->accounts,
        ]);
    }
}
