@props(['name', 'showCreateButton' => true, 'showSearch' => true, 'showStoreBy' => true, 'placeholder' => 'Search', 'icon' => '', 'showAccounts' => false, 'accounts' => [], 'showDate' => false, 'showTypes' => false, 'types' => []])

<div class="flex flex-col sm:flex-row gap-4 sm:gap-24 items-center py-4">

    <h2 class="text-2xl font-bold">{{__($name)}}</h2>

    <div class="w-full flex flex-col sm:flex-row flex-1 justify-end gap-4">

        @if($showCreateButton)
            <button wire:click="openModal"
                    class="flex justify-center items-center gap-2 py-2.5 px-3 text-sm font-medium text-white text-center bg-teal-700 rounded-lg border border-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6Z"/>
                </svg>
                <span class="sm:ms-2">{{__('Create New')}}</span>
            </button>
        @endif

        @if($showSearch)
            <div class="flex items-center flex-1">
                <label for="voice-search" class="sr-only">{{__('Search')}}</label>
                <div class="relative w-full">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        {{$icon}}
                    </div>
                    <input type="text" id="voice-search" wire:model.live="search"
                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                           placeholder="{{__($placeholder)}}" required>
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
        @endif

        @if($showStoreBy)
            <div class="flex">
                <label for="store-by" class="sr-only">{{__('Store By')}}</label>
                <select id="store-by" wire:model.live="storeBy"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500">
                    <option value="created_at">{{__('Created At')}}</option>
                    <option value="name">{{__('Name')}}</option>
                </select>
            </div>
        @endif

        @if($showTypes)
            <div class="flex">
                <label class="sr-only">{{__('Type')}}</label>
                <select wire:model.live="filterType"
                        class="capitalize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500">
                    <option value="">{{__('All Types')}}</option>
                    @foreach($types as $type)
                        <option value="{{$type}}">{{$type}}</option>
                    @endforeach()
                </select>
            </div>
        @endif

        @if($showAccounts)
            <div class="flex">
                <label class="sr-only">{{__('Accounts')}}</label>
                <select wire:model.live="filterAccount"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500">
                    <option value="">{{__('All Accounts')}}</option>
                    @foreach($accounts as $account)
                        <option value="{{$account->id}}">{{$account->icon}} {{$account->name}}</option>
                    @endforeach()
                </select>
            </div>
        @endif

        @if($showDate)
            <div class="flex">
                <label class="sr-only">{{__('Date')}}</label>
                <input type="date" wire:model.live="filterDate"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500">

            </div>
        @endif
    </div>
</div>
