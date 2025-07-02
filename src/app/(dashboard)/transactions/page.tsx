'use client';
import { DataTable } from '@/components/DataTable';
import { Header } from '@/components/Header';
import { AccountsSelect } from '@/components/commons/AccountsSelect';
import { CategoriesSelect } from '@/components/commons/CategoriesSelect';
import { CurrencySelect } from '@/components/commons/CurrencySelect';
import { TypeSelect } from '@/components/commons/TypeSelect';
import { CreateTransaction } from '@/components/transactions/CreateTransaction';
import { TransactionsColum } from '@/components/transactions/TransactionsColum';
import {
    Alert,
    AlertDescription,
    AlertTitle,
    Calendar,
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Skeleton,
} from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Balance } from '@/components/widgets';
import { useGetTransactions } from '@/hooks/useTransactions';
import type { ColumnFiltersState } from '@tanstack/react-table';
import { format } from 'date-fns';
import { CalendarIcon, Terminal, X } from 'lucide-react';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Transactions',
        href: '/transactions',
    },
];

type AmountFilter = {
    currency?: string;
    type?: string;
};

export default function TransactionsPage() {
    const { data, isLoading, isError } = useGetTransactions();
    const transactions = data?.data || [];
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [dateRange, setDateRange] = useState<DateRange | undefined>();

    const onFilterChange = (id: string, value: string | AmountFilter) => {
        setColumnFilters(prev => {
            const newFilters = prev.filter(f => f.id !== id);

            let shouldAddNewFilter = false;
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                if (Object.values(value).some(v => v)) {
                    shouldAddNewFilter = true;
                }
            } else if (value) {
                shouldAddNewFilter = true;
            }

            if (shouldAddNewFilter) {
                newFilters.push({ id, value });
            }

            return newFilters;
        });
    };

    const onDateRangeChange = (range: DateRange | undefined) => {
        setDateRange(range);
        if (range?.from || range?.to) {
            setColumnFilters(prev => {
                const newFilters = prev.filter(f => f.id !== 'category_date');
                newFilters.push({ id: 'category_date', value: range });
                return newFilters;
            });
        } else {
            setColumnFilters(prev => prev.filter(f => f.id !== 'category_date'));
        }
    };

    const clearDateRange = () => {
        setDateRange(undefined);
        setColumnFilters(prev => prev.filter(f => f.id !== 'category_date'));
    };

    return (
        <>
            <Header breadcrumbs={breadcrumbs} />
            <section className="px-4 flex flex-col gap-4 w-full">
                <Balance />

                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Transactions</h1>
                    <CreateTransaction />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                    <Input
                        placeholder="Filter descriptions..."
                        value={(columnFilters.find(f => f.id === 'description')?.value as string) ?? ''}
                        onChange={event => onFilterChange('description', event.target.value)}
                        className="w-full"
                    />
                    <AccountsSelect
                        value={(columnFilters.find(f => f.id === 'account')?.value as string) ?? ''}
                        onChange={value => onFilterChange('account', value)}
                    />
                    <CategoriesSelect
                        value={(columnFilters.find(f => f.id === 'category_date')?.value as string) ?? ''}
                        onChange={value => onFilterChange('category_date', value)}
                    />
                    <CurrencySelect
                        value={(columnFilters.find(f => f.id === 'amount')?.value as AmountFilter)?.currency ?? ''}
                        onChange={value =>
                            onFilterChange('amount', {
                                ...((columnFilters.find(f => f.id === 'amount')?.value as AmountFilter) ?? {}),
                                currency: value,
                            })
                        }
                    />
                    <TypeSelect
                        value={(columnFilters.find(f => f.id === 'amount')?.value as AmountFilter)?.type ?? ''}
                        onChange={value =>
                            onFilterChange('amount', {
                                ...((columnFilters.find(f => f.id === 'amount')?.value as AmountFilter) ?? {}),
                                type: value,
                            })
                        }
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
                                                {format(dateRange.from, 'LLL dd, y')} -{' '}
                                                {format(dateRange.to, 'LLL dd, y')}
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

                {isError && (
                    <Alert variant="destructive">
                        <Terminal />
                        <AlertTitle>Transactions Error</AlertTitle>
                        <AlertDescription>Error fetching transactions. Please try again later.</AlertDescription>
                    </Alert>
                )}

                {!isError &&
                    (isLoading ? (
                        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                        </div>
                    ) : (
                        transactions &&
                        transactions.length > 0 && (
                            <DataTable
                                columns={TransactionsColum}
                                data={transactions}
                                pageSize={20}
                                columnFilters={columnFilters}
                                onColumnFiltersChange={setColumnFilters}
                            />
                        )
                    ))}
            </section>
        </>
    );
}
