<section>
    <div class="flex items-end justify-between mb-4">
        <h2 class="text-2xl font-bold">{{$type === 'expense' ? __('Categories Expenses') : __('Categories Income')}}</h2>
        @if($count > 5)
            <button type="button" wire:click="openModal">{{__('See all categories')}}</button>
        @endif
    </div>

    <div class="flex items-center justify-center mb-4">
        <button type="button" wire:click="previousMonth" class="px-4 py-2 text-xs border-b border-slate-700"> {{ __('← prev') }}</button>
        <span class="mx-4 text-sm font-semibold">
            {{ \Carbon\Carbon::create($filterYear, $filterMonth)->format('F Y') }}
        </span>
        <button type="button" wire:click="nextMonth" class="px-4 py-2 text-xs border-b border-slate-700">{{ __('next →') }}</button>
    </div>

    <x-categories-table :categories="$categories" />


    <x-modal :maxWidth="'lg'" wire:model="modal">
        <x-modal-content :name="'All Categories Expenses Report'">
            <div class="flex items-center justify-center mb-4">
                <button type="button" wire:click="previousMonth" class="px-4 py-2 text-xs border-b border-slate-700"> {{ __('← prev') }}</button>
                <span class="mx-4 text-sm font-semibold">
            {{ \Carbon\Carbon::create($filterYear, $filterMonth)->format('F Y') }}
        </span>
                <button type="button" wire:click="nextMonth" class="px-4 py-2 text-xs border-b border-slate-700">{{ __('next →') }}</button>
            </div>
            <x-categories-table :categories="$allCategories" />
        </x-modal-content>
    </x-modal>

</section>
