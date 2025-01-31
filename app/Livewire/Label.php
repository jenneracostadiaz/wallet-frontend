<?php

namespace App\Livewire;

use App\Models\Label as LabelModel;
use Illuminate\View\View;
use Livewire\Attributes\Layout;
use Livewire\Component;
use Livewire\WithoutUrlPagination;
use Livewire\WithPagination;

class Label extends Component
{
    use WithPagination, WithoutUrlPagination;

    public bool $modal = false;
    public string $name = '';
    public string $color = '';
    public int $labelId = 0;
    public string $nameModal = 'Create new Label';
    public bool $edit = false;

    public $search = '';
    public $storeBy = 'created_at';

    public function openModal(?LabelModel $label = null): void
    {
        $this->modal = true;
        $this->nameModal = $label->getAttributes() ? 'Edit Label' : 'Create new Label';
        $this->labelId = $label->id ?? 0;
        $this->name = $label->name ?? '';
        $this->color = $label->color ?? '';
        $this->edit = (bool)$label->getAttributes();
    }

    public function resetFields(): void
    {
        $this->name = '';
        $this->color = '';
    }

    public function closeModal(): void
    {
        $this->modal = false;
    }

    public function save(): void
    {
        auth()->user()->labels()->create([
            'name' => $this->name,
            'color' => $this->color,
        ]);

        $this->closeModal();
        $this->resetFields();
    }

    public function update(): void
    {
        auth()->user()->labels()->where('id', $this->labelId)->update([
            'name' => $this->name,
            'color' => $this->color,
        ]);

        $this->closeModal();
        $this->resetFields();
    }

    public function delete(LabelModel $label): void
    {
        $label->delete();
    }

    #[Layout('layouts.app')]
    public function render(): View
    {
        return view('livewire.label', [
            'labels' => auth()->user()->labels()
                ->where('name', 'like', '%' . $this->search . '%')
                ->orderBy($this->storeBy)
                ->paginate(20),
        ]);
    }
}
