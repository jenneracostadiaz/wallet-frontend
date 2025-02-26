<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
    @forelse($accounts as $account)
        <x-card-account :account="$account"/>
    @empty
        <div class="col-span-4">
            <x-card-empty title="{{__('No accounts registered')}}"
                          message="{{__('Register an account to start recording your movements')}}"
                          link="{{route('accounts')}}"
            />
        </div>
    @endforelse
</div>
