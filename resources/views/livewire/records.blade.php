<div>
    <div>
        <x-nav-filters
            :name="'Records'"
            :placeholder="'Search records...'"
            :icon="'💵'"
            :showCreateButton="false"
        />
        <div class="flex flex-col gap-4 items-center py-4 px-4 mt-4">
            @foreach ($records as $record)
                <x-record-item :record="$record"/>
            @endforeach
        </div>
        {{ $records->links() }}
    </div>
</div>
