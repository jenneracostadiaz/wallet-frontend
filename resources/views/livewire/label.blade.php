<div>
    <div
        class="py-4 w-11/12 max-w-6xl mx-auto sm:px-6 lg:px-8 bg-gray-800 text-gray-200 overflow-hidden shadow-xl sm:rounded-lg my-8">
        <div class="flex flex-col sm:flex-row gap-4 sm:gap-24 items-center py-4 px-4">
            <h2 class="text-2xl font-bold">{{__('Labels')}}</h2>
            <div class="flex flex-col sm:flex-row flex-1 gap-4">
                <button wire:click="openModal"
                        class="flex justify-center items-center gap-2 py-2.5 px-3 text-sm font-medium text-white text-center bg-teal-700 rounded-lg border border-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6Z"/>
                    </svg>
                    <span class="sm:ms-2">{{__('Create New')}}</span>
                </button>
                <div class="flex items-center flex-1">
                    <label for="voice-search" class="sr-only">{{__('Search')}}</label>
                    <div class="relative w-full">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            🏷️
                        </div>
                        <input type="text" id="voice-search" wire:model.live="search"
                               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                               placeholder="Search label" required>
                        <button type="button" class="absolute inset-y-0 end-0 flex items-center pe-3">
                            <svg
                                class="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="flex">
                    <label for="store-by" class="sr-only">{{__('Store By')}}</label>
                    <select id="store-by" wire:model.live="storeBy"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500">
                        <option value="created_at">{{__('Created At')}}</option>
                        <option value="name">{{__('Name')}}</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="flex flex-col gap-4 items-center py-4 px-4 mt-4">
            @foreach ($labels as $label)
                <div class="w-full py-4 px-8 gap-4 rounded-md shadow-lg bg-slate-700 border-l-4"
                     style="border-color: {{ $label->color }}">
                    <div class="flex flex-row justify-between items-center gap-2">
                        <div class="flex flex-col gap-1">
                                    <span
                                        class="flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M19.75 2C20.3467 2 20.919 2.23705 21.341 2.65901C21.7629 3.08097 22 3.65326 22 4.25V9.712C21.9999 10.5739 21.6575 11.4005 21.048 12.01L12.548 20.513C11.9379 21.1217 11.1114 21.4636 10.2497 21.4637C9.38792 21.4639 8.56127 21.1224 7.95096 20.514L3.48896 16.06C2.879 15.451 2.53591 14.6247 2.53516 13.7628C2.53441 12.9009 2.87606 12.074 3.48496 11.464L11.985 2.954C12.2869 2.65178 12.6454 2.41206 13.0401 2.24853C13.4347 2.08501 13.8578 2.00089 14.285 2.001L19.75 2ZM17 5.502C16.803 5.502 16.6079 5.5408 16.4259 5.61618C16.2439 5.69156 16.0786 5.80205 15.9393 5.94134C15.8 6.08063 15.6895 6.24599 15.6141 6.42797C15.5388 6.60996 15.5 6.80502 15.5 7.002C15.5 7.19898 15.5388 7.39404 15.6141 7.57603C15.6895 7.75801 15.8 7.92337 15.9393 8.06266C16.0786 8.20195 16.2439 8.31244 16.4259 8.38782C16.6079 8.4632 16.803 8.502 17 8.502C17.3978 8.502 17.7793 8.34396 18.0606 8.06266C18.3419 7.78136 18.5 7.39982 18.5 7.002C18.5 6.60418 18.3419 6.22264 18.0606 5.94134C17.7793 5.66004 17.3978 5.502 17 5.502Z"
                                                fill="{{$label->color}}"/>
                                        </svg>
                                        {{ $label->name }}
                                    </span>
                        </div>
                        <div class="flex justify-end items-end gap-2">
                            <button
                                wire:click="openModal({{$label->id}})"
                                class="flex justify-center items-center py-2.5 px-3 gap-1 text-sm font-medium text-white text-center ">
                                ✏️
                                <span class="sm:ms-1">Edit</span>
                            </button>
                            <div class="relative">
                                <button type="button" wire:click="delete({{$label->id}})"
                                        wire:confirm.prompt="Are you sure?\n\nType DELETE to confirm|DELETE"
                                        class="flex justify-center items-center py-2.5 px-1 text-sm font-medium text-white text-center">
                                    🗑️
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
        {{ $labels->links() }}
    </div>

    <x-modal :maxWidth="'lg'" wire:model="modal">
        <div class="px-8 py-6 flex flex-col justify-center items-center">
            <h2 class="text-xl font-semibold text-gray-200">{{__($nameModal)}}</h2>
            <div class="mt-4 w-full">
                <form wire:submit.prevent="{{$edit ? 'update' : 'save'}}" class="flex flex-col gap-4">
                    <div class="flex-1 flex flex-col space-y-2">
                        <x-label for="name" value="{{__('Ex. Joe Done')}}"/>
                        <x-input type="text" wire:model="name" placeholder="Name"/>
                        <x-input-error for="name"/>
                    </div>
                    <div class="flex-1 flex flex-col space-y-2">
                        <x-label for="color" value="{{__('Color')}}"/>
                        <x-input class="w-full" type="color" wire:model="color" placeholder="Color"/>
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
            </div>
        </div>
    </x-modal>

</div>


