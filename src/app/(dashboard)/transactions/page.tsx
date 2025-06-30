'use client';
import { DataTable } from '@/components/DataTable';
import { Header } from '@/components/Header';
import { CategoriesSelect } from '@/components/commons/CategoriesSelect';
import { CurrencySelect } from '@/components/commons/CurrencySelect';
import { TransactionsColum } from '@/components/transactions/TransactionsColum';
import {
    Alert,
    AlertDescription,
    AlertTitle,
    Button,
    Calendar,
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Skeleton,
} from '@/components/ui';
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

export default function TransactionsPage() {
    const { data, isLoading, isError } = useGetTransactions();
    const transactions = data?.data || [];
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [dateRange, setDateRange] = useState<DateRange | undefined>();

    const onFilterChange = (id: string, value: string) => {
        setColumnFilters(prev => {
            const newFilters = prev.filter(f => f.id !== id);
            if (value) {
                newFilters.push({ id, value });
            }
            return newFilters;
        });
    };

    const onDateRangeChange = (range: DateRange | undefined) => {
        setDateRange(range);
        if (range?.from || range?.to) {
            setColumnFilters(prev => {
                const newFilters = prev.filter(f => f.id !== 'date');
                newFilters.push({ id: 'date', value: range });
                return newFilters;
            });
        } else {
            setColumnFilters(prev => prev.filter(f => f.id !== 'date'));
        }
    };

    const clearDateRange = () => {
        setDateRange(undefined);
        setColumnFilters(prev => prev.filter(f => f.id !== 'date'));
    };

    return (
        <>
            <Header breadcrumbs={breadcrumbs} />
            <section className="px-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Transactions</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 items-center py-4">
                    <Input
                        placeholder="Filter descriptions..."
                        value={(columnFilters.find(f => f.id === 'description')?.value as string) ?? ''}
                        onChange={event => onFilterChange('description', event.target.value)}
                        className="w-full"
                    />
                    <CategoriesSelect
                        value={(columnFilters.find(f => f.id === 'category')?.value as string) ?? ''}
                        onChange={value => onFilterChange('category', value)}
                    />
                    <CurrencySelect
                        value={(columnFilters.find(f => f.id === 'amount')?.value as string) ?? ''}
                        onChange={value => onFilterChange('amount', value)}
                    />
                    <div className="flex gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    data-empty={!dateRange?.from}
                                    className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal flex-1"
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
                            <Button variant="outline" size="icon" onClick={clearDateRange} className="shrink-0">
                                <X className="h-4 w-4" />
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
