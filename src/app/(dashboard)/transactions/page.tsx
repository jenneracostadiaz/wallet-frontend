'use client';
import { DataTable } from '@/components/DataTable';
import { Header } from '@/components/Header';
import { TransactionsColum } from '@/components/transactions/TransactionsColum';
import { Alert, AlertDescription, AlertTitle, Input, Skeleton } from '@/components/ui';
import { useGetTransactions } from '@/hooks/useTransactions';
import type { ColumnFiltersState } from '@tanstack/react-table';
import { Terminal } from 'lucide-react';
import { useState } from 'react';

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

    const onFilterChange = (id: string, value: string) => {
        setColumnFilters(prev => {
            const newFilters = prev.filter(f => f.id !== id);
            if (value) {
                newFilters.push({ id, value });
            }
            return newFilters;
        });
    };

    return (
        <>
            <Header breadcrumbs={breadcrumbs} />
            <section className="px-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Transactions</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5  gap-4 items-center py-4">
                    <Input
                        placeholder="Filter descriptions..."
                        value={(columnFilters.find(f => f.id === 'description')?.value as string) ?? ''}
                        onChange={event => onFilterChange('description', event.target.value)}
                        className="w-full lg:col-span-2"
                    />
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
