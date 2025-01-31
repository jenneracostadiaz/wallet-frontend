<div>
    <button wire:click="openModal" class="fixed bottom-0 left-0 w-full p-4 bg-teal-400 text-gray-700">
        <span class="text-xl">➕</span> <span class="text-lg">{{__('Add New Record')}}</span>
    </button>
    <x-modal :maxWidth="'3xl'" wire:model="modal">
        <x-modal-content :name="'Create Record'">
            <nav class="flex flex-wrap gap-3 ">
                @foreach($types as $type)
                    <button
                        class="flex-1 capitalize  font-semibold border {{ $type == $selectType ? 'border-teal-400 text-teal-400' : 'border-gray-400 text-gray-400' }} py-4 px-8 rounded-lg"
                        wire:click.prevent="setType('{{$type}}')">{{$type}}</button>
                @endforeach
            </nav>
            <form wire:submit.prevent="save" class="my-8 flex gap-4 flex-col">
                <div class="flex flex-col md:flex-row justify-center gap-4 md:gap-8">

                    <div class="flex-1 flex flex-col gap-2">
                        <div class="flex flex-col gap-2">
                            <x-label value="{{__('From Account')}}"/>
                            <x-select wire:model="from_account">
                                @forelse($accounts as $account)
                                    <option value="{{$account->id}}">{{$account->icon}} {{$account->name}}</option>
                                @empty
                                    <option value="">{{__('None--')}}</option>
                                @endforelse
                            </x-select>
                        </div>

                        <div class="flex justify-between gap-2">
                            <div class="flex-1 flex flex-col gap-2">
                                <x-label for="amount" value="{{__('Amount')}}"/>
                                <div class="flex items-center gap-1">
                                    {{$selectType === 'expense' || $selectType === 'transfer' ? '➖' : '➕'}}
                                    <x-input class="w-full" wire:model="from_amount" type="number" step="any" min="0"
                                             placeholder="Ex. 1000"/>
                                </div>
                            </div>
                            <div class="flex-1 flex flex-col gap-2">
                                <x-label for="date" value="{{__('Currency')}}"/>
                                <x-select class="w-full" wire:model="from_currency">
                                    @foreach($currencies as $currency)
                                        <option
                                            value="{{$currency->id}}">{{$currency->name}} {{$currency->symbol}}</option>
                                    @endforeach
                                </x-select>
                            </div>
                        </div>
                    </div>

                    @if($selectType === 'transfer')
                        <div class="flex text-3xl my-4 justify-center items-center">
                            <span class="rotate-90 md:rotate-0">➡️</span>
                        </div>
                        <div class="flex-1 flex flex-col gap-2">
                            <div class="flex flex-col gap-2">
                                <x-label for="amount" value="{{__('To Account')}}"/>
                                <x-select wire:model="to_account">
                                    @foreach($accounts as $account)
                                        <option value="{{$account->id}}">{{$account->icon}} {{$account->name}}</option>
                                    @endforeach
                                </x-select>
                            </div>
                            <div class="flex justify-between gap-2">
                                <div class="flex-1 flex flex-col gap-2">
                                    <x-label for="amount" value="{{__('Amount')}}"/>
                                    <div class="flex items-center gap-1">
                                        {{$selectType === 'expense' || $selectType === 'transfer' ? '➕' : '➖'}}
                                        <x-input class="w-full" wire:model="to_amount" type="number" step="any" min="0"
                                                 placeholder="Ex. 1000"/>
                                    </div>
                                </div>
                                <div class="flex-1 flex flex-col gap-2">
                                    <x-label for="date" value="{{__('Currency')}}"/>
                                    <x-select class="w-full" wire:model="to_currency">
                                        @foreach($currencies as $currency)
                                            <option
                                                value="{{$currency->id}}">{{$currency->name}} {{$currency->symbol}}</option>
                                        @endforeach
                                    </x-select>
                                </div>
                            </div>
                        </div>
                    @endif
                </div>

                <div class="grid grid-cols-2 gap-2">
                    <div class="flex-1 flex flex-col gap-2">
                        <x-label value="{{__('Category')}}"/>
                        <x-select wire:model="category" class="w-full">
                            @forelse($categories as $category)
                                @if($category->subcategories->isNotEmpty())
                                    <optgroup label="{{$category->icon}} {{$category->name}}">
                                        @foreach($category->subcategories as $subcategory)
                                            <option
                                                value="{{$subcategory->id}}">{{$subcategory->icon}} {{$subcategory->name}}</option>
                                        @endforeach
                                    </optgroup>
                                @else
                                    <option value="{{$category->id}}">{{$category->icon}} {{$category->name}}</option>
                                @endif
                            @empty
                                <option value="">{{__('None--')}}</option>
                            @endforelse
                        </x-select>
                    </div>
                    <div class="flex-1 flex flex-col gap-2">
                        <x-label value="{{__('Label')}}"/>
                        <x-select wire:model="label" class="w-full">
                            @forelse($labels as $label)
                                <option value="{{$label->id}}">{{$label->name}}</option>
                            @empty
                                <option value="">{{__('None--')}}</option>
                            @endforelse
                        </x-select>
                    </div>
                    <div class="flex-1 flex flex-col gap-2">
                        <x-label value="{{__('Date')}}"/>
                        <x-input type="date" wire:model="date"/>
                    </div>
                    <div class="flex-1 flex flex-col gap-2">
                        <x-label value="{{__('Time')}}"/>
                        <x-input type="time" wire:model="time"/>
                    </div>
                </div>

                <div class="flex justify-between gap-2">
                    <x-button class="flex-1 py-4 justify-center bg-teal-400 text-gray-600"
                              type="submit">➕ {{__('Save')}}</x-button>
                </div>
            </form>
        </x-modal-content>
    </x-modal>
</div>
