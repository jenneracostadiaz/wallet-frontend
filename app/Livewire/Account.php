<?php

namespace App\Livewire;

use App\Models\Account as AccountModel;
use App\Models\Currency;
use Illuminate\View\View;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Validate;
use Livewire\Component;
use Livewire\WithoutUrlPagination;
use Livewire\WithPagination;

class Account extends Component
{
    use WithPagination, WithoutUrlPagination;

    public bool $modal = false;
    public string $nameModal = 'Create new Account';
    public bool $edit = false;

    public string $name = '';
    public string $type = 'general';
    public string $color = '';
    public string $icon = '';
    public float $starting_balance = 0;
    public int $currency = 1;
    public int $accountId = 0;
    public $search = '';
    public $storeBy = 'created_at';

    public function resetFields(): void
    {
        $this->name = '';
        $this->type = 'general';
        $this->color = '';
        $this->icon = '';
        $this->starting_balance = 0;
        $this->currency = 1;

    }

    public function openModal(?AccountModel $account = null): void
    {
        $this->modal = true;
        $this->nameModal = $account->getAttributes() ? 'Edit Account' : 'Create new Account';
        $this->edit = (bool)$account->getAttributes();
        $this->accountId = $account->id ?? 0;
        $this->name = $account->name ?? '';
        $this->type = $account->type ?? 'general';
        $this->color = $account->color ?? '';
        $this->icon = $account->icon ?? '';
        $this->starting_balance = $account->starting_balance ?? 0;
        $this->currency = $account->currency_id ?? 1;
    }

    public function closeModal(): void
    {
        $this->modal = false;
        $this->resetFields();
    }

    public function save(): void
    {
        auth()->user()->accounts()->create([
            'name' => $this->name,
            'type' => $this->type,
            'color' => $this->color,
            'icon' => $this->icon,
            'starting_balance' => $this->starting_balance,
            'current_balance' => $this->starting_balance,
            'currency_id' => $this->currency,
        ]);
        $this->closeModal();
        $this->resetFields();
    }

    public function update(): void
    {
        $account = auth()->user()->accounts()->findOrFail($this->accountId);
        $account->update([
            'name' => $this->name,
            'type' => $this->type,
            'color' => $this->color,
            'icon' => $this->icon,
            'starting_balance' => $this->starting_balance,
            'currency_id' => $this->currency,
        ]);
        $this->closeModal();
        $this->resetFields();
    }

    public function delete(AccountModel $account): void
    {
        $account->delete();
    }

    #[Layout('layouts.app')]
    public function render(): View
    {
        return view('livewire.account', [
            'accounts' => auth()->user()->accounts()
                ->where('name', 'like', "%$this->search%")
                ->orderBy($this->storeBy)
                ->paginate(10),
            'types' => ['general', 'cash', 'bank', 'credit_card', 'saving_account', 'other'],
            'currencies' => Currency::all(),
        ]);
    }
}
