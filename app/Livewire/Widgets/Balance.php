<?php

namespace App\Livewire\Widgets;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;
use Livewire\Attributes\On;
use Livewire\Component;

class Balance extends Component
{
    #[On('refreshRecords')]
    public function refreshRecords(): void
    {
        $this->render();
    }

    public function render(): View
    {
        return view('livewire.widgets.balance', [
            'balances' => $this->getBalances()['balances'],
        ]);
    }

    private function getBalances(): array
    {
        $accounts = auth()->user()->accounts;
        $balances = [
            'total' => 0,
            'payments' => 0,
            'difference' => 0,
            'pen' => 0,
        ];

        foreach ($accounts as $account) {
            $currencyCode = strtolower($account->currency->code);
            $currentBalance = $account->current_balance;

            if (isset($balances[$currencyCode])) {
                $balances[$currencyCode] += $currentBalance;
                $balances['total'] += $currentBalance ;
            }
        }

        $balances['payments'] = auth()->user()->payments()
            ->where('is_paid', false)
            ->whereMonth('payment_date', now()->month)
            ->whereYear('payment_date', now()->year)
            ->sum('installment_amount');

        $balances['difference'] = $balances['total'] - $balances['payments'];
        $balances['symbol'] = auth()->user()->accounts->first()->currency->symbol;

        return [
            'balances' => $balances,
        ];
    }
}
