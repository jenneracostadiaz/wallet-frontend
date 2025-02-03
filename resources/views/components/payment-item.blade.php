<div class="w-full py-4 px-4 rounded-md shadow-lg bg-slate-700">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div class="flex flex-col gap-1">
            <span
                class="flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                {{ $payment->payment_description }}
            </span>
            <span class="text-xs font-medium text-gray-900 dark:text-slate-300">
                {{__('Dues')}}: {{ $payment->total_installments }} → {{__('Total payment')}}: S/.{{ $payment->total_amount }}
            </span>
        </div>
        <div class="flex-1 flex flex-col gap-1">
            <span class="text-sm font-medium text-gray-900 dark:text-white">
                {{__('Pay now')}}: S/.{{ $payment->installment_amount }}
            </span>
            <span class="text-xs font-medium text-gray-900 dark:text-slate-300">
                {{__('Remaining payable')}}: S/.{{ $payment->remaining_amount }}
            </span>
        </div>
        <div class="flex justify-end items-end gap-2">
            <button
                wire:click="openModal({{$payment->id}})"
                class="flex justify-center items-center py-2.5 px-3 gap-1 text-sm font-medium text-white text-center ">
                ✏️
            </button>
            <div class="relative">
                <button type="button" wire:click="delete({{$payment->id}})"
                        wire:confirm.prompt="Are you sure?\n\nType DELETE to confirm|DELETE"
                        class="flex justify-center items-center py-2.5 px-1 text-sm font-medium text-white text-center">
                    🗑️
                </button>
            </div>
        </div>
    </div>
</div>
