<div class="w-full py-4 px-8 lg:px-4 gap-4 rounded-md shadow-lg bg-slate-700 border-t-4 lg:border-l-4 lg:border-t-0
    {{ $record->type === 'income' ? 'border-green-500' : '' }}
    {{ $record->type === 'expense' ? 'border-red-500' : '' }}
    {{ $record->type === 'transfer' ? 'border-blue-500' : '' }}
">
    <div class="flex flex-col gap-2 lg:flex-row justify-between items-center">
        <div
            class="relative flex flex-1 flex-col items-center lg:items-start gap-1 lg:gap-0 text-sm font-medium text-white order-3 lg:order-1">
            <p>
                @if($record->category->parent)
                    <span class="font-bold">
                    {{ $record->category->parent->icon }}
                        {{ $record->category->parent->name }}
                </span> →
                @endif
                {{ $record->category->icon }}
                {{ $record->category->name }}
            </p>
            <div class="text-[12px] text-slate-400">
                Date: {{ \Carbon\Carbon::parse($record->date)->format('d/m/Y') }}
                - Time: {{ \Carbon\Carbon::parse($record->time)->format('H:i') }}
            </div>
        </div>
        @if (isset($record->account))
            <div class="flex flex-1 flex-col gap-1 order-1 lg:order-2">
                {{ $record->account->icon }}
                {{ $record->account->name }}
                @if($record->type === 'transfer')
                    →
                    {{$record->transfer->account->icon}}
                    {{$record->transfer->account->name}}
                @endif
            </div>
        @else
            <div class="flex flex-col gap-1 order-1 lg:order-2">
            </div>
        @endif
        <div class="flex-1 flex flex-col lg:flex-row items-center gap-2 relative order-2 lg:order-4">
            <div class="block font-black text-md lg:text-sm
                {{ $record->type === 'income' ? 'text-green-500' : '' }}
                {{ $record->type === 'expense' ? 'text-red-500' : '' }}
                {{ $record->type === 'transfer' ? 'text-white' : '' }}
            ">
                {{ $record->currency->symbol }}
                {{ number_format($record->amount, 2) }}
            </div>
            @if (isset($record->label))
                <div class="flex items-center gap-1">
                    @if (isset($record->label->color))
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19.75 2C20.3467 2 20.919 2.23705 21.341 2.65901C21.7629 3.08097 22 3.65326 22 4.25V9.712C21.9999 10.5739 21.6575 11.4005 21.048 12.01L12.548 20.513C11.9379 21.1217 11.1114 21.4636 10.2497 21.4637C9.38792 21.4639 8.56127 21.1224 7.95096 20.514L3.48896 16.06C2.879 15.451 2.53591 14.6247 2.53516 13.7628C2.53441 12.9009 2.87606 12.074 3.48496 11.464L11.985 2.954C12.2869 2.65178 12.6454 2.41206 13.0401 2.24853C13.4347 2.08501 13.8578 2.00089 14.285 2.001L19.75 2ZM17 5.502C16.803 5.502 16.6079 5.5408 16.4259 5.61618C16.2439 5.69156 16.0786 5.80205 15.9393 5.94134C15.8 6.08063 15.6895 6.24599 15.6141 6.42797C15.5388 6.60996 15.5 6.80502 15.5 7.002C15.5 7.19898 15.5388 7.39404 15.6141 7.57603C15.6895 7.75801 15.8 7.92337 15.9393 8.06266C16.0786 8.20195 16.2439 8.31244 16.4259 8.38782C16.6079 8.4632 16.803 8.502 17 8.502C17.3978 8.502 17.7793 8.34396 18.0606 8.06266C18.3419 7.78136 18.5 7.39982 18.5 7.002C18.5 6.60418 18.3419 6.22264 18.0606 5.94134C17.7793 5.66004 17.3978 5.502 17 5.502Z"
                                fill="{{$record->label->color}}"/>
                        </svg>
                    @endif
                    {{ $record->label->name }}
                </div>
            @endif
        </div>
        <div class="flex justify-end items-end gap-2 order-4 lg:order-5">
            <button type="button" wire:click="openModal({{ $record->id }})">
                ✏️
            </button>
            <button type="button" wire:click="delete({{ $record->id }})"
                    wire:confirm.prompt="Are you sure?\n\nType DELETE RECORD to confirm|DELETE RECORD">
                🗑️
            </button>
        </div>
    </div>
</div>
