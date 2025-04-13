<?php

namespace App\Livewire\Widgets;

use Illuminate\View\View;
use Livewire\Component;

class CategoriesReport extends Component
{
    public $type = 'expense';
    public $modal = false;
    public $allCategories = [];
    public $filterMonth;
    public $filterYear;

    public function __construct()
    {
        $this->filterMonth = now()->month;
        $this->filterYear = now()->year;
    }

    protected $listeners = ['updateAllCategories'];

    public function previousMonth(): void
    {
        if ($this->filterMonth == 1) {
            $this->filterMonth = 12;
            $this->filterYear--;
        } else {
            $this->filterMonth--;
        }

        $this->allCategories = $this->getCategoriesExpenses(0);
    }

    public function nextMonth(): void
    {
        if ($this->filterMonth == 12) {
            $this->filterMonth = 1;
            $this->filterYear++;
        } else {
            $this->filterMonth++;
        }

        $this->allCategories = $this->getCategoriesExpenses(0);
    }

    public function openModal(): void
    {
        $this->modal = true;
        $this->allCategories = $this->getCategoriesExpenses(0);
    }

    public function render(): View
    {
        return view('livewire.widgets.categories-report',
            [
                'categories' => $this->getCategoriesExpenses(5),
                'count' => $this->getCategoriesExpenses(0)->count(),
            ]
        );
    }

    private function getCategoriesExpenses(int $take)
    {
        return auth()->user()->records()
            ->where('type', $this->type)
            ->where('currency_id', 1)
            ->when($this->filterMonth, function ($query) {
                $query->whereMonth('date', $this->filterMonth)
                    ->whereYear('date', $this->filterYear);
            })
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
