<section>

    <x-table>
        <x-slot name="head">
            <x-th>{{__('Category')}}</x-th>
            <x-th>{{__('Expense')}}</x-th>
        </x-slot>
        <x-slot name="body">
            @forelse ($categories as $category)
                <x-tr>
                    <x-td>
                        <div class="flex-1 text-lg flex items-center">
                            <p class="font-semibold">{{$category->category->icon}} {{$category->category->name}}</p> @if($category->parent) → <p class="text-xs text-gray-400">{{$category->parent->icon}} {{$category->parent->name}}</p>@endif
                        </div>
                    </x-td>
                    <x-td>{{$category->currency}} {{$category->total}}</x-td>
                </x-tr>
            @empty
                <x-tr>
                    <x-td colspan="2" class="text-center">
                        <x-card-empty
                            title="{{__('No categories found')}}"
                            message="{{__('You can add a new category by clicking the button below')}}"
                            link="{{ route('categories') }}"
                            />
                    </x-td>
                </x-tr>
            @endforelse
        </x-slot>
    </x-table>

    <button type="button" wire:click="openModal">{{__('See all categories')}}</button>

        <x-modal :maxWidth="'lg'" wire:model="modal">
            <x-modal-content :name="'All Categories Expenses Report'">
                @forelse ($allCategories as $category)
                    <li> {{$category->currency}} {{$category->total}}</li>
                @empty
                    <p>No categories</p>
                @endforelse
            </x-modal-content>
        </x-modal>

</section>
