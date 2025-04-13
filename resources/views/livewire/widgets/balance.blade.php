<div class="grid gap-4 my-10">
    <div class="flex flex-wrap items-center lg:items-start gap-4 justify-between">
        <div class="grid">
            <h2 class="text-2xl font-bold">{{__('Total in accounts')}}</h2>
            <p class="text-3xl font-bold">
                {{$balances['symbol']}} {{ number_format($balances['total'], 2) }}
            </p>
            <p class="text-sm :text-gray-400 my-2">
                {{__('Installment amount')}}: <span
                    class="text-gray-100">{{$balances['symbol']}} {{ number_format($balances['payments'], 2) }}</span>
            </p>
            <p class="text-sm :text-gray-400">
                {{__('Difference')}}: <span
                    class="text-gray-100">{{$balances['symbol']}} {{ number_format($balances['difference'], 2) }}</span>
            </p>
        </div>
    </div>
</div>
