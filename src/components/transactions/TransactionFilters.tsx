import { AccountsSelect } from '@/components/commons/AccountsSelect';
import { CategoriesSelect } from '@/components/commons/CategoriesSelect';
import { CurrencySelect } from '@/components/commons/CurrencySelect';
import { RangeDateFilter } from '@/components/commons/RangeDateFilter';
import { TypeSelect } from '@/components/commons/TypeSelect';
import { Input } from '@/components/ui';

import type { AmountFilter } from '@/hooks/useTransactionFilters';
import type { Account } from '@/type/Accounts';
import type { Category } from '@/type/Categories';
import type { Currency } from '@/type/Currencies';
import type { DateRange } from 'react-day-picker';

interface TransactionFiltersProps {
    onFilterChange: (id: string, value: string | AmountFilter) => void;
    onDateRangeChange: (range: DateRange | undefined) => void;
    clearDateRange: () => void;
    getFilterValue: <T>(id: string) => T | undefined;
    dateRange: DateRange | undefined;
    initialAccounts: { data: Account[] };
    initialCategories: { data: Category[] };
    initialCurrencies: { data: Currency[] };
}

export function TransactionFilters({
    onFilterChange,
    onDateRangeChange,
    clearDateRange,
    getFilterValue,
    dateRange,
    initialAccounts,
    initialCategories,
    initialCurrencies,
}: TransactionFiltersProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            <AccountsSelect
                value={getFilterValue<string>('account') ?? ''}
                onChange={value => onFilterChange('account', value)}
                initialAccounts={initialAccounts}
            />

            <CategoriesSelect
                value={getFilterValue<string>('category_date') ?? ''}
                onChange={value => onFilterChange('category_date', value)}
                initialCategories={initialCategories}
            />

            <CurrencySelect
                value={getFilterValue<AmountFilter>('amount')?.currency ?? ''}
                onChange={value =>
                    onFilterChange('amount', {
                        ...(getFilterValue<AmountFilter>('amount') ?? {}),
                        currency: value,
                    })
                }
                initialCurrencies={initialCurrencies}
            />

            <TypeSelect
                value={getFilterValue<AmountFilter>('amount')?.type ?? ''}
                onChange={value =>
                    onFilterChange('amount', {
                        ...(getFilterValue<AmountFilter>('amount') ?? {}),
                        type: value,
                    })
                }
            />

            <Input
                placeholder="Filter descriptions..."
                value={getFilterValue<string>('description') ?? ''}
                onChange={event => onFilterChange('description', event.target.value)}
                className="w-full lg:col-span-3"
            />

            <RangeDateFilter
                dateRange={dateRange}
                onDateRangeChange={onDateRangeChange}
                clearDateRange={clearDateRange}
            />
        </div>
    );
}
