<div class="w-full py-4 px-2 gap-4 rounded-md shadow-lg bg-slate-700 border-l-4"
     style="border-color: {{ $account->color }}">
    <div class="flex flex-row justify-between items-center gap-2">
        <span
            class="flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                {{ $account->icon }} {{ $account->name }}
            </span>

        <span class="text-sm font-medium text-gray-900 dark:text-white">
                {{ $account->currency->symbol }} {{ $account->current_balance }}
            </span>
    </div>
    <div class="flex justify-end">
        <span class="text-xs font-medium text-gray-900 dark:text-slate-300">
                Starting Balance:
                {{ $account->currency->symbol }} {{ $account->starting_balance }}
            </span>
    </div>
</div>




