<?php

namespace App\Livewire;

use App\Models\Payment;
use Illuminate\View\View;
use Livewire\Attributes\Layout;
use Livewire\Attributes\On;
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
    public bool $showPaid = true;

    public int $payment_id = 0;

    #[Validate('required|string|max:255')]
    public string $payment_description = '';

    #[Validate('required|integer')]
    public int $total_installments = 0;

    #[Validate('required|numeric')]
    public float $installment_amount = 0.0;

    #[Validate('required|numeric')]
    public float $total_amount = 0.0;

    #[Validate('required|date')]
    public string $payment_date;

    #[Validate('required|integer')]
    public ?int $category_id;

    #[On('refreshPayments')]
    public function refreshPayments(): void
    {
        $this->resetPage();
    }


    public function resetFields(): void
    {
        $this->payment_description = '';
        $this->total_installments = 0;
        $this->installment_amount = 0.0;
        $this->total_amount = 0.0;
        $this->payment_date = now()->format('Y-m-d');
        $this->category_id = $this->getCategory();
    }

    public function openModal(?Payment $payment = null): void
    {
        $this->modal = true;
        $this->resetFields();
        $this->nameModal = $payment->getAttributes() ? 'Edit Payment' : 'Create new Payment';
        $this->edit = (bool)$payment->getAttributes();
        $this->payment_id = $payment->id ?? 0;
        $this->payment_description = $payment->payment_description ?? '';
        $this->total_installments = $payment->total_installments ?? 0;
        $this->installment_amount = $payment->installment_amount ?? 0.0;
        $this->total_amount = $payment->total_amount ?? 0.0;
        $this->payment_date = $payment->payment_date ?? now()->format('Y-m-d');
        $this->category_id = $payment->category_id ?? $this->getCategory();

    }

    public function closeModal(): void
    {
        $this->modal = false;
        $this->resetFields();
    }

    public function calculateTotalAmount(): void
    {
        if ($this->total_installments && $this->installment_amount) {
            $this->total_amount = $this->total_installments * $this->installment_amount;
        }
    }

    public function save(): void
    {
        auth()->user()->payments()->create([
            'payment_description' => $this->payment_description,
            'total_installments' => $this->total_installments,
            'installment_amount' => $this->installment_amount,
            'total_amount' => $this->total_amount,
            'remaining_amount' => $this->total_amount,
            'payment_date' => $this->payment_date,
            'category_id' => $this->category_id,
        ]);

        $this->closeModal();
        $this->resetFields();

        $this->dispatch('refreshRecords');
    }

    public function update(): void
    {
        $payment = Payment::query()->find($this->payment_id);
        $payment->update([
            'payment_description' => $this->payment_description,
            'total_installments' => $this->total_installments,
            'installment_amount' => $this->installment_amount,
            'total_amount' => $this->total_amount,
            'remaining_amount' => $this->total_amount,
            'payment_date' => $this->payment_date,
            'category_id' => $this->category_id,
        ]);

        $this->closeModal();
        $this->resetFields();

        $this->dispatch('refreshRecords');
    }

    public function delete(Payment $payment): void
    {
        $payment->delete();
        $this->dispatch('refreshRecords');
    }

    public function pay(Payment $payment): void
    {
        $this->dispatch('payment:pay', $payment);
    }

    #[Layout('layouts.app')]
    public function render(): View
    {
        return view('livewire.payments', [
            'payments' => auth()->user()->payments()->where('is_paid', false)
                ->orderBy('payment_date')->paginate(10),
            'payed' => auth()->user()->payments()->where('is_paid', true)
                ->orderBy('payment_date')->paginate(10),
            'amount' => auth()->user()->payments()->where('is_paid', false)->whereMonth('payment_date', now()->month)
                ->whereYear('payment_date', now()->year)->sum('installment_amount'),
            'categories' => auth()->user()->categories->where('parent_id', null),
        ]);
    }

    /**
     * @return int|mixed|null
     */
    public function getCategory(): mixed
    {
        return auth()->user()->categories->first()
            ? (auth()->user()->categories->first()->subcategories->first()
                ? auth()->user()->categories->first()->subcategories->first()->id
                : auth()->user()->categories->first()->id)
            : null;
    }
}
