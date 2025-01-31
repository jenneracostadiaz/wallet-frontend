<div>
    <button wire:click="openModal" class="fixed bottom-0 left-0 w-full p-4 bg-teal-400 text-gray-700">
        <span class="text-xl">➕</span> <span class="text-lg">{{__('Add New Record')}}</span>
    </button>
    <x-modal :maxWidth="'lg'" wire:model="modal">
        <x-modal-content :name="'Create Record'">
        </x-modal-content>
    </x-modal>
</div>
