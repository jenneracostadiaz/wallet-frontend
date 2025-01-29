<?php

namespace App\Livewire;

use App\Models\Category as CategoryModel;
use Illuminate\View\View;
use Livewire\Attributes\Layout;
use Livewire\Component;
use Livewire\WithoutUrlPagination;
use Livewire\WithPagination;

class Category extends Component
{

    use WithPagination, WithoutUrlPagination;

    public bool $modal = false;
    public string $nameModal = 'Create new Category';
    public bool $edit = false;
    public string $name = '';
    public string $icon = '';
    public $parent;
    public $categoryId = 0;

    public function resetFields(): void
    {
        $this->name = '';
        $this->icon = '';
        $this->parent = null;
    }

    public function openModal(?CategoryModel $category = null): void
    {
        $this->modal = true;
        $this->nameModal = $category->getAttributes() ? 'Edit Category' : 'Create new Category';
        $this->categoryId = $category->id ?? 0;
        $this->edit = (bool)$category->getAttributes();
        $this->name = $category->name ?? '';
        $this->icon = $category->icon ?? '';
        $this->parent = $category->parent_id ?? null;
    }

    public function closeModal(): void
    {
        $this->modal = false;
    }

    public function save(): void
    {
        CategoryModel::query()->create([
            'name' => $this->name,
            'icon' => $this->icon,
            'parent_id' => $this->parent,
            'user_id' => auth()->id()
        ]);

        $this->closeModal();
        $this->resetFields();
    }

    public function update(): void
    {
        CategoryModel::query()
            ->where('id', $this->categoryId)
            ->update([
                'name' => $this->name,
                'icon' => $this->icon,
                'parent_id' => $this->parent === 'None--' ? null : $this->parent,
            ]);

        $this->closeModal();
        $this->resetFields();
    }

    public function delete(CategoryModel $category): void
    {
        $category->delete();
    }

    #[Layout('layouts.app')]
    public function render(): View
    {
        return view('livewire.category', [
            'categories' => CategoryModel::query()
                ->where('parent_id', null)
                ->paginate(20),
        ]);
    }
}
