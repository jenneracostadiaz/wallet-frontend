<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
    @foreach($accounts as $account)
        <x-card-account :account="$account"/>
    @endforeach
</div>
