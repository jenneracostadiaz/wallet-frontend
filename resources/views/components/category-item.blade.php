@props(['id', 'name', 'icon', 'subItem' => false])
<div
    class="{{$subItem ? 'w-11/12' : 'w-full'}} flex justify-between items-center py-4 px-8 gap-4 rounded-md shadow-lg bg-slate-700">
    <div class="flex flex-col gap-1">
        <span class="text-sm font-medium text-white">{{ $icon }} {{ $name }}</span>
    </div>
    <div class="flex justify-end items-end gap-2">
        <button wire:click="openModal({{$id}})"
                class="flex justify-center items-center py-2.5 px-3 text-sm font-medium text-white text-center">
            ✏️
            <span class="sm:ms-1">Edit</span>
        </button>
        <div class="relative">
            <button type="button" wire:click="delete({{$id}})"
                    wire:confirm.prompt="Are you sure?\n\nType DELETE to confirm|DELETE"
                    class="flex justify-center items-center py-2.5 px-1 text-sm font-medium text-white text-center">
                🗑️
            </button>
        </div>
    </div>
</div>
