<div>
    <div>
        <x-nav-filters
            :name="'Receivables'"
            :placeholder="'Search receivables...'"
            :icon="'️💰'"
            :showSearch="false"
            :showStoreBy="false"
        />

        <section class="my-8">
            <h2 class="font-bold text-xl mb-4">To be received this month</h2>

            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Amount
                        </th>
                    </tr>
                    </thead>
                    <tbody>

                    @foreach($receivables as $receivable)
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <td class="px-6 py-4">{{$receivable->name}}</td>
                            <td class="px-6 py-4">S/. {{$receivable->total_amount}}</td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>

        </section>

    </div>
    <x-modal :maxWidth="'lg'" wire:model="modal">
        <x-modal-content :name="$nameModal">
            <form wire:submit.prevent="{{$edit ? 'update' : 'save'}}" class="flex flex-col gap-4">
                <div class="flex-1 flex flex-col space-y-2">
                    <x-label for="name" value="{{__('Name')}}"/>
                    <x-input type="text" wire:model="name" placeholder="{{__('Ex. Hostbox')}}"/>
                    <x-input-error for="name"/>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="flex-1 flex flex-col space-y-2">
                        <x-label for="due_date" value="{{__('Due Date')}}"/>
                        <x-input type="date" wire:model="due_date" min="{{ now()->format('Y-m-d') }}"/>
                        <x-input-error for="due_date"/>
                    </div>
                    <div class="flex-1 flex flex-col space-y-2">
                        <x-label for="amount" value="{{__('Amount')}}"/>
                        <x-input type="number" step="0.01" wire:model="amount" placeholder="{{__('Ex. 100.00')}}"/>
                        <x-input-error for="amount"/>
                    </div>
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
