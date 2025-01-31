<div>
    <div>
        <x-nav-filters
            :name="'Records'"
            :placeholder="'Search records...'"
            :icon="'💵'"
            :accounts="$accounts"
            :types="$types"
            :showSearch="false"
            :showCreateButton="false"
            :showStoreBy="false"
            :showAccounts="true"
            :showDate="true"
            :showTypes="true"
        />
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 items-center py-4 px-4 mt-4">

            @forelse($records as $record)
                <x-record-item :record="$record"/>
            @empty
                <p class="text-center text-gray-500 dark:text-gray-400">{{__('No records found')}}</p>
            @endforelse
        </div>
        {{ $records->links() }}
    </div>
</div>
