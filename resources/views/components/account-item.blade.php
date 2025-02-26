<div class="w-full py-4 px-8 gap-4 rounded-md shadow-lg bg-slate-700 border-l-4"
     style="border-color: {{ $account->color }}">
    <div class="flex flex-row justify-between items-center gap-2">
        <div class="flex flex-col gap-1">
            <span
                class="flex items-center gap-1 text-sm font-medium text-white">
                {{ $account->icon }} {{ $account->name }}
            </span>
        </div>
        <div class="flex flex-col gap-1">
            <span class="text-sm font-medium text-white capitalize">
                {{$account->type}}
            </span>
        </div>
        <div class="flex flex-col gap-1">
            <span class="text-sm font-medium text-white">
                {{ $account->currency->symbol }} {{ $account->current_balance }}
            </span>
            <span class="text-xs font-medium text-slate-300">
                Starting Balance:
                {{ $account->currency->symbol }} {{ $account->starting_balance }}
            </span>
        </div>
        <div class="flex justify-end items-end gap-2">
            <button
                wire:click="openModal({{$account->id}})"
                class="flex justify-center items-center py-2.5 px-3 gap-1 text-sm font-medium text-white text-center ">
                ✏️
                <span class="sm:ms-1">Edit</span>
            </button>
            <div class="relative">
                <button type="button" wire:click="delete({{$account->id}})"
                        wire:confirm.prompt="Are you sure?\n\nType DELETE to confirm|DELETE"
                        class="flex justify-center items-center py-2.5 px-1 text-sm font-medium text-white text-center">
                    🗑️
                </button>
            </div>
        </div>
    </div>
</div>
