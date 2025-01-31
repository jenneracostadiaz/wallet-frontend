<?php

namespace App\Livewire\Records;

use App\Models\Currency;
use App\Models\Record;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;
use Livewire\Attributes\Validate;
use Livewire\Component;

class Create extends Component
{
    public bool $modal = false;
    public string $selectType = 'expense';

    #[Validate(['from_account' => 'required|numeric', 'amount' => 'required|numeric|min:0.01', 'from_currency' => 'required|numeric', 'to_account' => 'nullable|numeric', 'to_currency' => 'required|numeric', 'category' => 'required|numeric', 'label' => 'nullable|numeric', 'date' => 'required|date', 'time' => 'required|date_format:H:i'])]
    public ?int $from_account;

    public $amount;
    public int $from_currency;
    public ?int $to_account;
    public int $to_currency;
    public ?int $category;
    public $label;
    public $date;
    public $time;
    public $to_accounts;

    public function resetFields(): void
    {
        $this->from_account = auth()->user()->accounts->first()->id ?? null;
        $this->amount = 0;
        $this->from_currency = 1;
        $this->to_account = auth()->user()->accounts->skip(1)->first()->id ?? null;
        $this->to_currency = 1;
        $this->category = auth()->user()->categories->first()
            ? (auth()->user()->categories->first()->subcategories->first()
                ? auth()->user()->categories->first()->subcategories->first()->id
                : auth()->user()->categories->first()->id)
            : null;
        $this->label = null;
        $this->date = now()->format('Y-m-d');
        $this->time = now()->format('H:i');
        $this->to_accounts = auth()->user()->accounts->skip(1);
    }

    public function openModal(): void
    {
        $this->modal = true;
        $this->resetFields();
    }

    public function closeModal(): void
    {
        $this->modal = false;
        $this->resetFields();
    }

    public function setType(string $type): void
    {
        $this->selectType = $type;
    }

    public function handleAccountChange(): void
    {
        $this->to_accounts = auth()->user()->accounts->where('id', '!=', $this->from_account);
        $this->to_account = $this->to_accounts->first()->id ?? null;
    }

    public function handleCurrencyChange($currency): void
    {
        if ($currency === 'from') {
            $this->to_currency = $this->from_currency;
        } else {
            $this->from_currency = $this->to_currency;
        }
    }

    public function save(): void
    {
        DB::beginTransaction();
        try {
            $this->validate();
            $amount = match ($this->selectType) {
                'expense', 'transfer' => -abs($this->amount),
                'income' => abs($this->amount),
                default => $this->amount,
            };

            $account = auth()->user()->accounts()->find($this->from_account);

            if ($account->current_balance + $amount < 0) {
                session()->flash('message', 'Error: The user does not have enough funds.');
                session()->flash('message_style', 'danger');
                DB::rollback();
                return;
            }

            if ($this->selectType === 'transfer') {

                $from_record = auth()->user()->records()->create([
                    'type' => $this->selectType,
                    'account_id' => $this->from_account,
                    'amount' => $this->amount,
                    'currency_id' => $this->from_currency,
                    'category_id' => $this->category,
                    'label_id' => $this->label,
                    'main_transfer' => true,
                    'date' => $this->date,
                    'time' => $this->time,
                ]);

                $account->current_balance += $amount;
                $account->save();

                $to_record = auth()->user()->records()->create([
                    'type' => $this->selectType,
                    'account_id' => $this->to_account,
                    'amount' => $this->amount,
                    'currency_id' => $this->to_currency,
                    'category_id' => $this->category,
                    'label_id' => $this->label,
                    'transfer_id' => $from_record->id,
                    'date' => $this->date,
                    'time' => $this->time,
                ]);

                $from_record->update(['transfer_id' => $to_record->id]);
                
                $account = auth()->user()->accounts()->find($this->to_account);
                $account->current_balance += $this->amount;
            } else {

                auth()->user()->records()->create([
                    'type' => $this->selectType,
                    'account_id' => $this->from_account,
                    'amount' => $this->amount,
                    'currency_id' => $this->from_currency,
                    'category_id' => $this->category,
                    'label_id' => $this->label,
                    'date' => $this->date,
                    'time' => $this->time,
                ]);

                $account->current_balance += $amount;
            }
            $account->save();

            session()->flash('message', 'Record created successfully.');
            session()->flash('message_style', 'success');

            $this->closeModal();
            $this->dispatch('refreshRecords');

            DB::commit();

        } catch (\Exception $e) {
            DB::rollback();
            session()->flash('message', 'Record creation failed.');
            session()->flash('message_style', 'danger');
        }
    }

    public function render(): View
    {

        return view('livewire.records.create', [
            'types' => auth()->user()->accounts->count() > 1 ? ['expense', 'income', 'transfer'] : ['expense', 'income'],
            'accounts' => auth()->user()->accounts,
            'currencies' => Currency::all(),
            'categories' => auth()->user()->categories->where('parent_id', null),
            'labels' => auth()->user()->labels,
        ]);
    }
}
