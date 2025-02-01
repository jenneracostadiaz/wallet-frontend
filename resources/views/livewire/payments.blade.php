<div>
    <div>
        <x-nav-filters
            :name="'Payments'"
            :placeholder="'Search payments...'"
            :icon="'💎'"
        />

        <div class="flex flex-col gap-4 items-center py-4 px-4 mt-4">
            @foreach ($payments as $payment)
                <x-payment-item :payment="$payment"/>
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
                                 placeholder="{{__('Ex. 12')}}" wire:change="calculateTotalAmount"/>
                        <x-input-error for="total_installments"/>
                    </div>

                    <div class="flex-1 flex flex-col space-y-2">
                        <x-label value="{{__('Installment Amount')}}"/>
                        <x-input class="w-full" type="number" step="0.01" wire:model="installment_amount"
                                 placeholder="{{__('Ex. 100.00')}}" wire:change="calculateTotalAmount"/>
                        <x-input-error for="installment_amount"/>
                    </div>

                    <div class="flex-1 flex flex-col space-y-2">
                        <x-label value="{{__('Total Amount')}}"/>
                        <x-input class="w-full" type="number" step="0.01" wire:model="total_amount" readonly/>
                        <x-input-error for="total_amount"/>
                    </div>
                </div>

                <div class="flex-1 flex flex-col space-y-2">
                    <x-label value="{{__('Payment Date')}}"/>
                    <x-input type="date" wire:model="payment_date"/>
                    <x-input-error for="payment_date"/>
                </div>
                <div class="flex gap-4 mt-2 items-center">
                    <x-button class="flex-1 justify-center bg-red-400 text-gray-200" type="button"
                              wire:click.prevent="closeModal">{{__('Cancel')}}</x-button>
                    @if($edit)
                        <x-button class="flex-1 justify-center bg-gray-200 text-gray-600"
                                  type="submit">{{__('Update')}}</x-button>
                    @endif
                    @if(!$edit)
                        <x-button class="flex-1 justify-center bg-gray-200 text-gray-600"
                                  type="submit">{{__('Save')}}</x-button>
                    @endif
                </div>
            </form>
        </x-modal-content>
    </x-modal>
</div>
