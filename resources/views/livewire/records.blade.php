<div>
    <div>
        <x-nav-filters
            :name="'Records'"
            :placeholder="'Search records...'"
            :icon="'💵'"
            :accounts="$accounts"
            :types="$types"
            :showCreateButton="false"
            :showStoreBy="false"
            :showAccounts="true"
            :showDate="true"
            :showTypes="true"
        />
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 items-center py-4 px-4 mt-4">
            @foreach ($records as $record)
                <x-record-item :record="$record"/>
            @endforeach
        </div>
        {{ $records->links() }}
    </div>
</div>
