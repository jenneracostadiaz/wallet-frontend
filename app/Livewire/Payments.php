<?php

namespace App\Livewire;

use App\Models\Payment;
use Illuminate\View\View;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Validate;
use Livewire\Component;
use Livewire\WithoutUrlPagination;
use Livewire\WithPagination;

class Payments extends Component
{
    use WithPagination, WithoutUrlPagination;

    public bool $modal = false;
    public string $nameModal = 'Create new Label';
    public bool $edit = false;

    #[Validate('required|string|max:255')]
    public string $payment_description = '';

    #[Validate('required|integer')]
    public int $total_installments;

    #[Validate('required|numeric')]
    public float $installment_amount;

    #[Validate('required|numeric')]
    public float $total_amount;

    #[Validate('required|date')]
    public string $payment_date;


    public function resetFields(): void
    {
        $this->payment_description = '';
        $this->total_installments = 0;
        $this->installment_amount = 0;
        $this->total_amount = 0;
        $this->payment_date = '';
    }

    public function openModal(?Payment $payment = null): void
    {
        $this->modal = true;
        $this->nameModal = $payment->getAttributes() ? 'Edit Payment' : 'Create new Payment';
    }

    #[Layout('layouts.app')]
    public function render(): View
    {
        return view('livewire.payments', [
            'payments' => auth()->user()->payments()->latest()->paginate(10),
        ]);
    }
}
