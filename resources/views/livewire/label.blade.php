<div>
    <div>
        <x-nav-filters
            :name="'Labels'"
            :placeholder="'Search labels...'"
            :icon="'🏷️'"
        />

        <div class="flex flex-col gap-4 items-center py-4 px-4 mt-4">
            @foreach ($labels as $label)
                <x-label-item :label="$label"/>
            @endforeach
        </div>

        {{ $labels->links() }}
    </div>

    <x-modal :maxWidth="'lg'" wire:model="modal">
        <x-modal-content :name="$nameModal">
            <form wire:submit.prevent="{{$edit ? 'update' : 'save'}}" class="flex flex-col gap-4">
                <div class="flex-1 flex flex-col space-y-2">
                    <x-label for="name" value="{{__('Name')}}"/>
                    <x-input type="text" wire:model="name" placeholder="{{__('Ex. Joe Done')}}"/>
                    <x-input-error for="name"/>
                </div>
                <div class="flex-1 flex flex-col space-y-2">
                    <x-label for="color" value="{{__('Color')}}"/>
                    <x-input class="w-full" type="color" wire:model="color" placeholder="{{__('Color')}}"/>
                    <x-input-error for="color"/>
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
        </x-modal-content>
    </x-modal>

</div>


