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
            <livewire:receivables.resumen/>
            <h2 class="font-bold text-xl my-8">{{__('Registers')}}</h2>
            <x-table>
                <x-slot name="head">
                    <x-th>Name</x-th>
                    <x-th>Date</x-th>
                    <x-th>Amount</x-th>
                    <x-th></x-th>
                </x-slot>
                <x-slot name="body">
                    @foreach($receivables as $receivable)
                        <x-tr>
                            <x-td>{{$receivable->name}}</x-td>
                            <x-td>{{\Carbon\Carbon::parse($receivable->due_date)->format('d M Y')}}</x-td>
                            <x-td>S/. {{$receivable->amount}}</x-td>
                            <x-td class="flex gap-4 justify-end">
                                <button
                                    wire:click="complete({{$receivable->id}})"
                                    wire:confirm="Are you sure?"
                                    class="flex justify-center items-center py-2.5 px-3 gap-1 text-sm font-medium text-white text-center ">
                                    ✅
                                </button>
                                <button
                                    wire:click="openModal({{$receivable->id}})"
                                    class="flex justify-center items-center py-2.5 px-3 gap-1 text-sm font-medium text-white text-center ">
                                    ✏️
                                    <span class="sm:ms-1">Edit</span>
                                </button>
                                <div class="relative">
                                    <button type="button" wire:click="delete({{$receivable->id}})"
                                            wire:confirm.prompt="Are you sure?\n\nType DELETE to confirm|DELETE"
                                            class="flex justify-center items-center py-2.5 px-1 text-sm font-medium text-white text-center">
                                        🗑️
                                    </button>
                                </div>
                            </x-td>
                        </x-tr>
                    @endforeach
                </x-slot>
            </x-table>

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
