<?php

namespace App\Livewire;

use App\Models\Receivable;
use Illuminate\View\View;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Validate;
use Livewire\Component;

class Receivables extends Component
{

    public bool $modal = false;
    public string $nameModal = 'Create new Receivable';
    public bool $edit = false;

    public string $name = '';
    #[Validate(['date', 'after_or_equal:today'])]
    public string $due_date = '';
    public float $amount = 0.0;
    public bool $is_paid = false;
    public int $receivableId = 0;

    public function resetFields(): void
    {
        $this->name = '';
        $this->due_date = now()->format('Y-m-d');
        $this->amount = 0.0;
        $this->is_paid = false;
    }

    public function openModal(?Receivable $receivable = null): void
    {
        $this->modal = true;
        $this->resetFields();
        $this->nameModal = $receivable->getAttributes() ? 'Edit Receivable' : 'Create new Receivable';
        $this->edit = (bool)$receivable->getAttributes();
        $this->receivableId = $receivable->id ?? 0;
        $this->name = $receivable->name ?? '';
        $this->due_date = $receivable->due_date?->format('Y-m-d') ?? now()->format('Y-m-d');
        $this->amount = $receivable->amount ?? 0.0;
        $this->is_paid = $receivable->is_paid ?? false;
    }

    public function closeModal(): void
    {
        $this->modal = false;
        $this->resetFields();
    }

    public function save(): void
    {
        auth()->user()->receivables()->create([
            'name' => $this->name,
            'due_date' => $this->due_date,
            'amount' => $this->amount,
            'is_paid' => $this->is_paid,
        ]);

        $this->closeModal();
        $this->resetFields();
        $this->dispatch('getReceivables');
    }


    public function complete(Receivable $receivable): void
    {
        $receivable->update([
            'is_paid' => true,
        ]);
        $this->dispatch('getReceivables');
    }

    public function update(): void
    {
        auth()->user()->receivables()->where('id', $this->receivableId)->update([
            'name' => $this->name,
            'due_date' => $this->due_date,
            'amount' => $this->amount,
            'is_paid' => $this->is_paid,
        ]);

        $this->closeModal();
        $this->resetFields();
        $this->dispatch('getReceivables');
    }

    public function delete(Receivable $receivable): void
    {
        $receivable->delete();
        $this->dispatch('getReceivables');
    }

    #[Layout('layouts.app')]
    public function render(): View
    {
        return view('livewire.receivables', [
            'receivables' => auth()->user()->receivables()
                ->where('is_paid', false)
                ->orderBy('due_date')
                ->get(),
        ]);
    }
}
