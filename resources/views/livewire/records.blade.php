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
            :showCategories="true"
            :categories="$categories"
            :showDate="false"
            :showMonth="true"
            :filterYear="$filterYear"
            :filterMonth="$filterMonth"
            :showTypes="true"
        />
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 items-center py-4 px-4 mt-4">

            @forelse($records as $record)
                <x-record-item :record="$record"/>
            @empty
                <x-card-empty title="{{__('No records found')}}"
                              message="{{__('No records found with the selected filters')}}"
                />
            @endforelse
        </div>
        {{ $records->links() }}
    </div>
</div>
