<?php

namespace App\Livewire\Widgets;

use Illuminate\View\View;
use Livewire\Component;

class CategoriesExpenses extends Component
{
    public $modal = false;
    public $allCategories = [];

    public function openModal(): void
    {
        $this->modal = true;
        $this->allCategories = $this->getCategoriesExpenses(0);
    }

    public function render(): View
    {
        return view('livewire.widgets.categories-expenses',
            [
                'categories' => $this->getCategoriesExpenses(5),
            ]
        );
    }

    private function getCategoriesExpenses(int $take)
    {
        return auth()->user()->records()
            ->where('type', 'expense')
            ->where('currency_id', 2)
            ->with('category', 'currency')
            ->get()
            ->groupBy('category.name')
            ->map(fn($group) => (object) [
                'category' => $group->first()->category,
                'parent_category' => $group->first()->category->parent,
                'currency_symbol' => $group->first()->currency->symbol,
                'total' => $group->sum('amount'),
            ])
            ->sortByDesc('total')
            ->when($take, fn($query) => $query->take($take))
            ->map(fn($item, $key) => (object) [
                'category' => $item->category,
                'parent' => $item->parent_category,
                'total' => $item->total,
                'currency' => $item->currency_symbol,
            ])
            ->values();

    }
}
