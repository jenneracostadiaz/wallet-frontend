<section>

    <div class="flex items-end justify-between mb-4">
        <h2 class="text-2xl font-bold">Categories Expenses</h2>
        @if($count > 5)
            <button type="button" wire:click="openModal">{{__('See all categories')}}</button>
        @endif
    </div>

    <x-categories-table :categories="$categories" />


    <x-modal :maxWidth="'lg'" wire:model="modal">
        <x-modal-content :name="'All Categories Expenses Report'">
            <x-categories-table :categories="$allCategories" />
        </x-modal-content>
    </x-modal>

</section>
