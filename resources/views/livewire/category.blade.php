<div>
    <x-nav-filters
        :name="'Categories'"
        :placeholder="'Search categories...'"
        :icon="'🤖'"
        :showStoreBy="false"
    />

    <div class="flex flex-col gap-4 items-end py-4 px-4 mt-4">
        @foreach ($categories as $category)
            <x-category-item :id="$category->id" :icon="$category->icon" :name="$category->name"/>
            @foreach ($category->subcategories as $subcategory)
                <x-category-item :id="$subcategory->id" :icon="$subcategory->icon" :name="$subcategory->name"
                                 :subItem="true"/>
            @endforeach
        @endforeach
    </div>

    {{ $categories->links() }}

    <x-modal :maxWidth="'lg'" wire:model="modal">
        <div class="px-8 py-6 flex flex-col justify-center items-center">
            <h2 class="text-xl font-semibold text-gray-200">{{__($nameModal)}}</h2>
            <div class="mt-4 w-full">
                <form wire:submit.prevent="{{$edit ? 'update' : 'save'}}" class="flex flex-col gap-4">
                    <div class="flex-1 flex flex-col space-y-2">
                        <x-label for="name" value="{{__('Name')}}"/>
                        <x-input id="name" type="text" wire:model="name" placeholder="Ex. Joe Done"/>
                        <x-input-error for="name"/>
                    </div>
                    <div class="flex-1 flex flex-col space-y-2">
                        <x-label for="icon" value="{{__('Icon')}}"/>
                        <x-input id="icon" class="w-full" type="text" wire:model="icon" placeholder="Ex. 💵"/>
                        <x-input-error for="icon"/>
                    </div>
                    <div class="flex-1 flex flex-col space-y-2">
                        <x-label for="parent" value="{{__('Parent Category')}}"/>
                        <x-select id="parent" wire:model="parent" class="font-mono">
                            <option selected>None--</option>
                            @foreach($categories->where('id', '!=', $categoryId) as $category)
                                <option value="{{$category->id}}">{{$category->icon}} {{$category->name}}</option>
                            @endforeach
                        </x-select>
                        <x-input-error for="icon"/>
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
            </div>
        </div>
    </x-modal>
</div>
