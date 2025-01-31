<?php

namespace App\Livewire\Widgets;

use Illuminate\View\View;
use Livewire\Component;

class Balance extends Component
{
    public function render(): View
    {

        return view('livewire.widgets.balance', [
            'balances' => $this->getBalances(),
            'categories' => auth()->user()->categories,
        ]);
    }

    private function getBalances(): array
    {
        $accounts = auth()->user()->accounts;
        $balances = [
            'total' => 0,
            'pen' => 0,
            'usd' => 0,
            'eur' => 0,
        ];
        $exchangeRates = [
            'USD' => 3.72,
            'EUR' => 3.86,
        ];

        foreach ($accounts as $account) {
            $currencyCode = strtolower($account->currency->code);
            $currentBalance = $account->current_balance;

            if (isset($balances[$currencyCode])) {
                $balances[$currencyCode] += $currentBalance;
                $balances['total'] += $currencyCode === 'pen' ? $currentBalance : $currentBalance * $exchangeRates[strtoupper($currencyCode)];
            }
        }
        return $balances;
    }
}
