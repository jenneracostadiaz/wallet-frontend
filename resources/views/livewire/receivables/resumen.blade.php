<div>
    <h2 class="font-bold text-xl mb-4">{{__('To be received this month')}}</h2>
    <x-table>
        <x-slot name="head">
            <x-th>{{__('Name')}}</x-th>
            <x-th>{{__('Amount')}}</x-th>
        </x-slot>
        <x-slot name="body">
            @foreach($resume as $receivable)
                <x-tr>
                    <x-td>{{$receivable->name}}</x-td>
                    <x-td>S/. {{$receivable->total_amount}}</x-td>
                </x-tr>
            @endforeach
        </x-slot>
    </x-table>
</div>
