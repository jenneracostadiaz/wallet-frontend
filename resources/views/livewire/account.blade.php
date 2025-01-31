<div>
    <div>
        <x-nav-filters
            :name="'Accounts'"
            :placeholder="'Search accounts...'"
            :icon="'💰️'"
        />
        <div class="flex flex-col gap-4 items-center py-4 px-4 mt-4">
            @foreach ($accounts as $account)
                <x-account-item :account="$account"/>
            @endforeach
        </div>
        {{ $accounts->links() }}
    </div>

    <x-modal :maxWidth="'lg'" wire:model="modal">
        <x-modal-content :name="$nameModal">
            <form wire:submit.prevent="{{$edit ? 'update' : 'save'}}" class="flex flex-col gap-4">

                <div class="flex-1 flex flex-col space-y-2">
                    <x-label for="name" value="{{__('Name')}}"/>
                    <x-input type="text" wire:model="name" placeholder="Ex. Joe Done"/>
                    <x-input-error for="name"/>
                </div>

                <div class="flex-1 flex flex-col space-y-2">
                    <x-label for="type" value="{{__('Type')}}"/>
                    <x-select wire:model="type" class="w-full font-mono capitalize">
                        @foreach($types as $type)
                            <option value="{{$type}}">{{$type}}</option>
                        @endforeach
                    </x-select>
                    <x-input-error for="type"/>
                </div>

                <div class="flex gap-4">
                    <div class="flex-1 flex flex-col space-y-2">
                        <x-label for="color" value="{{__('Color')}}"/>
                        <x-input class="w-full" type="color" wire:model="color" placeholder="Color"/>
                        <x-input-error for="color"/>
                    </div>

                    <div class="flex-1 flex flex-col space-y-2">
                        <x-label for="icon" value="{{__('Icon')}}"/>
                        <x-input type="text" wire:model="icon" placeholder="Ex. 💵"/>
                        <x-input-error for="icon"/>
                    </div>
                </div>

                <div class="flex gap-4">
                    <div class="flex-1 flex flex-col space-y-2">
                        <x-label for="starting_balance" value="{{__('Starting Balance')}}"/>

                        <x-input wire:model="starting_balance" name="starting_balance" type="number"
                                 pattern="^\d*(\.\d{0,2})?$" min="0" step="any"
                                 placeholder="Ex. 1000" autofocus/>
                        <x-input-error for="starting_balance"/>
                    </div>
                    <div class="flex-1 flex flex-col space-y-2">
                        <x-label for="type" value="{{__('Currency')}}"/>
                        <x-select wire:model="currency" class="w-full font-mono capitalize">
                            @foreach($currencies as $currency)
                                <option value="{{$currency->id}}">{{$currency->name}} {{$currency->symbol}}</option>
                            @endforeach
                        </x-select>
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
