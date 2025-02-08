<div class="grid gap-4 my-10">
    <div class="flex flex-wrap items-center lg:items-start gap-4 justify-between">
        <div class="grid">
            <h2 class="text-2xl font-bold">{{__('Total in accounts')}}</h2>
            <p class="text-3xl font-bold">
                S/. {{ number_format($balances['total'], 2) }}
            </p>
            <p class="text-sm text-gray-300 dark:text-gray-400 my-2">
                {{__('Installment amount')}}: <span
                    class="text-gray-100">S/. {{ number_format($balances['payments'], 2) }}</span>
            </p>
            <p class="text-sm text-gray-300 dark:text-gray-400">
                {{__('Difference')}}: <span
                    class="text-gray-100">S/. {{ number_format($balances['difference'], 2) }}</span>
            </p>
        </div>
        <div class="grid gap-2 font-semibold">
            <p>Total (PEN) S/. {{number_format($balances['pen'], 2)}}</p>
            <p>Total (USD) $ {{number_format($balances['usd'], 2)}}</p>
            <p>Total (EUR) € {{number_format($balances['eur'], 2)}}</p>
        </div>
    </div>

    <div class="my-8 grid lg:grid-cols-2 gap-12">

        <div class="grid">
            <x-get_categories :categories="$categories_expense"/>
        </div>

        <div class="grid">
            <x-get_categories :categories="$categories_income" :type="'income'"/>
        </div>

    </div>

</div>
