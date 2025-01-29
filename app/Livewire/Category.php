<?php

namespace App\Livewire;

use App\Models\Category as CategoryModel;
use Illuminate\View\View;
use Livewire\Attributes\Layout;
use Livewire\Component;

class Category extends Component
{
    public bool $modal = false;
    public string $nameModal = 'Create new Category';
    public bool $edit = false;

    public function openModal(?CategoryModel $category = null): void
    {
        $this->modal = true;
        $this->nameModal = $category->getAttributes() ? 'Edit Category' : 'Create new Category';
        $this->edit = (bool)$category->getAttributes();
    }


    #[Layout('layouts.app')]
    public function render(): View
    {
        return view('livewire.category', [
            'categories' => CategoryModel::all()
        ]);
    }
}
