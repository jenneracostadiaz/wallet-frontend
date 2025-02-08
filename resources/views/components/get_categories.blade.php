@props([
    'categories',
    'type' => 'expense'
])

<h2 {{ $attributes->class(['text-2xl font-bold']) }}>{{__('By Categories')}} {{$type == 'expense' ? __('Expense') : __('Income')}}</h2>

<div class="flex items-center gap-2 mt-4">
    <div class="flex-1 text-lg flex items-center">
        <p class="font-semibold">{{__('Category')}}</p>
    </div>
    <p class="w-36 font-semibold">{{$type == 'expense' ? __('Expense') : __('Income')}}</p>
</div>

<div class="grid grid-cols-1 gap-4 items-center my-2">
    @foreach($categories as $category)
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
            <p class="w-36 font-semibold">
                @if($type == 'expense')
                    ➖ S/. {{number_format($category->expense, 2)}}
                @else
                    ➕ S/. {{number_format($category->income, 2)}}
                @endif
            </p>
        </div>
    @endforeach
</div>
