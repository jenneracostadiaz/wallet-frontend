<div>
    <div>
        <x-nav-filters
            :name="'Payments'"
            :placeholder="'Search payments...'"
            :icon="'💎'"
        />

        <div class="flex flex-col gap-4 items-center py-4 px-4 mt-4">
            @foreach ($payments as $payment)
                <pre>{{$payment}}</pre>
            @endforeach
        </div>

        {{ $payments->links() }}
    </div>
    <x-modal :maxWidth="'xl'" wire:model="modal">
        <x-modal-content :name="$nameModal">
            <form wire:submit.prevent="{{$edit ? 'update' : 'save'}}" class="flex flex-col gap-4">
                <div class="flex-1 flex flex-col space-y-2">
                    <x-label value="{{__('Description')}}"/>
                    <x-input type="text" wire:model="payment_description" placeholder="{{__('Ex. Deuda CMR')}}"/>
                    <x-input-error for="payment_description"/>
                </div>

                <div class="flex gap-4">
                    <div class="flex-1 flex flex-col space-y-2">
                        <x-label value="{{__('Total Installments')}}"/>
                        <x-input class="w-full" type="number" wire:model="total_installments"
                                 placeholder="{{__('Ex. 12')}}"/>
                        <x-input-error for="total_installments"/>
                    </div>

                    <div class="flex-1 flex flex-col space-y-2">
                        <x-label value="{{__('Installment Amount')}}"/>
                        <x-input class="w-full" type="number" step="0.01" wire:model="installment_amount"
                                 placeholder="{{__('Ex. 100.00')}}"/>
                        <x-input-error for="installment_amount"/>
                    </div>

                    <div class="flex-1 flex flex-col space-y-2">
                        <x-label value="{{__('Total Amount')}}"/>
                        <x-input class="w-full" type="number" step="0.01" wire:model="total_amount"
                                 placeholder="{{__('Ex. 1200.00')}}"/>
                        <x-input-error for="total_amount"/>
                    </div>
                </div>

                <div class="flex-1 flex flex-col space-y-2">
                    <x-label value="{{__('Payment Date')}}"/>
                    <x-input type="date" wire:model="payment_date"/>
                    <x-input-error for="payment_date"/>
                </div>
            </form>
        </x-modal-content>
    </x-modal>
</div>
