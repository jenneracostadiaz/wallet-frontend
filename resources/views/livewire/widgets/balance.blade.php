<div class="my-4 grid lg:grid-cols-2 gap-12">
    <div class="flex flex-wrap items-center lg:items-start gap-4 justify-between">
        <div class="grid">
            <h2 class="text-2xl font-bold">{{__('Balance')}}</h2>
            <p class="text-3xl font-bold">
                S/. {{$balances['total']}}
            </p>
        </div>
        <div class="grid gap-2 font-semibold">
            <p>Total (PEN) S/. {{$balances['pen']}}</p>
            <p>Total (USD) $ {{$balances['usd']}}</p>
            <p>Total (EUR) € {{$balances['eur']}}</p>
        </div>
    </div>
    <div class="grid">
        <h2 class="text-2xl font-bold">{{__('By Categories')}}</h2>

        <div class="flex items-center gap-2 mt-4">
            <div class="flex-1 text-lg flex items-center">
                <p class="font-semibold">{{__('Category')}}</p>
            </div>
            <p class="w-24 font-semibold">{{__('Expense')}}</p>
            <p class="w-24 font-semibold">{{__('Income')}}</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 items-center my-2">
            @foreach($categories as $category)
                @php
                    $found = $category->records->groupBy('type')->map(function($records) {
                        return $records->sum('amount');
                    })->toArray();
                    $found['expense'] = $found['expense'] ?? 0;
                    $found['income'] = $found['income'] ?? 0;
                @endphp
                @if($found['expense'] || $found['income'])
                    <div class="flex items-center gap-2">
                        <div class="flex-1 text-lg flex items-center">
                            {!! $category->icon !!}
                            <p class="font-semibold">{{$category->name}}</p>
                            @if($category->parent)
                                →
                                <p class="text-xs text-gray-500 dark:text-gray-400">
                                    {{$category->parent->icon}}{{$category->parent->name}}
                                </p>
                            @endif
                        </div>
                        <p class="w-24 font-semibold">
                            ➖ S/. {{$found['expense'] ?? 0}}
                        </p>
                        <p class="w-24 font-semibold">
                            ➕ S/. {{$found['income'] ?? 0}}
                        </p>
                    </div>
                @endif
            @endforeach
        </div>
    </div>


</div>
