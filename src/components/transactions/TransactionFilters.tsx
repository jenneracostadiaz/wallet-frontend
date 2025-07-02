import { AccountsSelect } from '@/components/commons/AccountsSelect';
import { CategoriesSelect } from '@/components/commons/CategoriesSelect';
import { CurrencySelect } from '@/components/commons/CurrencySelect';
import { TypeSelect } from '@/components/commons/TypeSelect';
import { Button, Calendar, Input, Popover, PopoverContent, PopoverTrigger } from '@/components/ui';
import type { AmountFilter } from '@/hooks/useTransactionFilters';
import { format } from 'date-fns';
import { CalendarIcon, X } from 'lucide-react';
import type { DateRange } from 'react-day-picker';

interface TransactionFiltersProps {
    onFilterChange: (id: string, value: string | AmountFilter) => void;
    onDateRangeChange: (range: DateRange | undefined) => void;
    clearDateRange: () => void;
    getFilterValue: <T>(id: string) => T | undefined;
    dateRange: DateRange | undefined;
}

export function TransactionFilters({
    onFilterChange,
    onDateRangeChange,
    clearDateRange,
    getFilterValue,
    dateRange,
}: TransactionFiltersProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            <AccountsSelect
                value={getFilterValue<string>('account') ?? ''}
                onChange={value => onFilterChange('account', value)}
            />
            <CategoriesSelect
                value={getFilterValue<string>('category_date') ?? ''}
                onChange={value => onFilterChange('category_date', value)}
            />
            <CurrencySelect
                value={getFilterValue<AmountFilter>('amount')?.currency ?? ''}
                onChange={value =>
                    onFilterChange('amount', {
                        ...(getFilterValue<AmountFilter>('amount') ?? {}),
                        currency: value,
                    })
                }
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
            <div className="flex gap-2 relative">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            data-empty={!dateRange?.from}
                            className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal w-full"
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateRange?.from ? (
                                dateRange.to ? (
                                    <>
                                        {format(dateRange.from, 'LLL dd, y')} - {format(dateRange.to, 'LLL dd, y')}
                                    </>
                                ) : (
                                    format(dateRange.from, 'LLL dd, y')
                                )
                            ) : (
                                <span>Pick date range</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="range"
                            defaultMonth={dateRange?.from}
                            selected={dateRange}
                            onSelect={onDateRangeChange}
                            numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>
                {dateRange?.from && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={clearDateRange}
                        className="absolute right-0 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-muted-foreground"
                    >
                        <X className="size-4" />
                    </Button>
                )}
            </div>
        </div>
    );
}
