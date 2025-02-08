<div>
    <button wire:click="openModal"
            class="fixed bottom-4 right-4 py-4 px-8 flex gap-1 text-sm rounded-full transition bg-teal-400 text-gray-700 hover:bg-teal-300">
        <span>➕</span>{{__('Add Record')}}
    </button>
    <x-modal :maxWidth="'3xl'" wire:model="modal">
        <x-modal-content :name="'Create Record'">
            <nav class="flex flex-wrap gap-3 ">
                @foreach($types as $type)
                    <button
                        class="flex-1 capitalize  font-semibold border {{ $type == $selectType ? 'border-teal-400 text-teal-400' : 'border-gray-400 text-gray-400' }} py-4 px-8 rounded-lg {{!$disabled_types ? 'cursor-pointer' : 'cursor-not-allowed'}}"
                        @if(!$disabled_types)
                            wire:click.prevent="setType('{{$type}}')"
                        @endif
                    >{{$type}}</button>
                @endforeach
            </nav>
            <form wire:submit.prevent="save" class="my-8 flex gap-4 flex-col">
                <div class="flex flex-col md:flex-row justify-center gap-4 md:gap-8">

                    <div class="flex-1 flex flex-col gap-2">
                        <div class="flex flex-col gap-2">
                            <x-label value="{{__('From Account')}}"/>
                            <x-select wire:model="from_account" wire:change="handleAccountChange"
                                      :disabled="$disabled_amount">
                                @forelse($accounts as $account)
                                    <option value="{{$account->id}}">{{$account->icon}} {{$account->name}}</option>
                                @empty
                                    <option value="">{{__('None--')}}</option>
                                @endforelse
                            </x-select>
                        </div>

                        <div class="flex justify-between gap-2">
                            <div class="flex-1 flex flex-col gap-2">
                                <x-label value="{{__('Amount')}}"/>
                                <div class="flex items-center gap-1">
                                    {{$selectType === 'expense' || $selectType === 'transfer' ? '➖' : '➕'}}
                                    <x-input class="w-full" x-ref="amountInput" x-on:input="handleInput"
                                             wire:model="amount" type="text" step="0.01" min="0"
                                             placeholder="Ex. 1000.00" :disabled="$disabled_amount"/>
                                </div>
                            </div>
                            <div class="flex-1 flex flex-col gap-2">
                                <x-label value="{{__('Currency')}}"/>
                                <x-select class="w-full" wire:model="from_currency"
                                          wire:change="handleCurrencyChange('from')" :disabled="$disabled_amount">
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
                                <x-label value="{{__('To Account')}}"/>
                                <x-select wire:model="to_account">
                                    @foreach($to_accounts as $account)
                                        <option
                                            value="{{$account->id}}">{{$account->icon}} {{$account->name}}</option>
                                    @endforeach
                                </x-select>
                            </div>
                            <div class="flex justify-between gap-2">
                                <div class="flex-1 flex flex-col gap-2">
                                    <x-label value="{{__('Amount')}}"/>
                                    <div class="flex items-center gap-1">
                                        {{$selectType === 'expense' || $selectType === 'transfer' ? '➕' : '➖'}}
                                        <x-input class="w-full" x-ref="amountInput" x-on:input="handleInput"
                                                 wire:model="amount" type="text" step="0.01" min="0"
                                                 placeholder="Ex. 1000.00"/>
                                    </div>
                                </div>
                                <div class="flex-1 flex flex-col gap-2">
                                    <x-label value="{{__('Currency')}}"/>
                                    <x-select class="w-full" wire:model="to_currency"
                                              wire:change="handleCurrencyChange('to')">
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
                            <option>{{__('None--')}}</option>
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

                <div class="flex-1 flex flex-col space-y-2">
                    <div class="flex items-center gap-2">
                        <x-input type="checkbox" id="for_payment" wire:model="for_payment"
                                 wire:change="toggle_payment($event.target.checked)"/>
                        <x-label for="for_payment" value="{{__('Realize one Payment')}}"/>
                    </div>
                    <x-input-error for="for_payment"/>
                </div>

                @if($for_payment)
                    <div class="flex-1 flex flex-col space-y-2">
                        <x-label value="{{__('Payments')}}"/>
                        <x-select wire:model="payment_id">
                            <option value="">{{__('None--')}}</option>
                            @foreach($payments as $payment)
                                <option value="{{$payment->id}}">{{$payment->payment_description}} - ({{__('Dues')}}
                                    : {{$payment->total_installments}})
                                </option>
                            @endforeach
                        </x-select>
                        <x-input-error for="payments"/>
                    </div>
                @endif

                <div class="flex justify-between gap-2">
                    <x-button class="flex-1 py-4 justify-center bg-teal-400 text-gray-600"
                              type="submit">➕ {{__('Save')}}</x-button>
                </div>
            </form>
            @if (session()->has('message'))
                <div
                    class="text-sm {{session()->has('message_style') && session('message_style') == 'danger' ? 'text-red-400' : 'text-teal-400'}}">
                    {{ session('message') }}
                </div>
            @endif

            <x-input-error for="amount"/>
            <x-input-error for="from_account"/>
            <x-input-error for="to_account"/>
            <x-input-error for="category"/>
            <x-input-error for="label"/>
            <x-input-error for="date"/>
            <x-input-error for="time"/>

        </x-modal-content>
    </x-modal>
</div>
