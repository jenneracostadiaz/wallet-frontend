'use client';
import { DataTable } from '@/components/DataTable';
import { Header } from '@/components/Header';
import { CreateTransaction } from '@/components/transactions/CreateTransaction';
import { TransactionFilters } from '@/components/transactions/TransactionFilters';
import { TransactionsColum } from '@/components/transactions/TransactionsColum';
import { Alert, AlertDescription, AlertTitle, Skeleton } from '@/components/ui';
import { Balance } from '@/components/widgets';
import { useTransactionFilters } from '@/hooks/useTransactionFilters';
import { useGetTransactions, useTransactionsTableData } from '@/hooks/useTransactions';
import type { Transaction } from '@/type/Transactions';
import { Terminal } from 'lucide-react';

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
    const transactions: Transaction[] = useTransactionsTableData({ transactions: data?.data });
    const {
        columnFilters,
        dateRange,
        onFilterChange,
        onDateRangeChange,
        clearDateRange,
        getFilterValue,
        setColumnFilters,
    } = useTransactionFilters();

    return (
        <>
            <Header breadcrumbs={breadcrumbs} />
            <section className="px-4 flex flex-col gap-4 w-full max-w-7xl mx-auto">
                <Balance />

                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Transactions</h1>
                    <CreateTransaction />
                </div>
                <TransactionFilters
                    onFilterChange={onFilterChange}
                    onDateRangeChange={onDateRangeChange}
                    clearDateRange={clearDateRange}
                    getFilterValue={getFilterValue}
                    dateRange={dateRange}
                />

                {isError && (
                    <Alert variant="destructive">
                        <Terminal />
                        <AlertTitle>Transactions Error</AlertTitle>
                        <AlertDescription>Error fetching transactions. Please try again later.</AlertDescription>
                    </Alert>
                )}

                {!isError && (
                    <DataTable
                        columns={TransactionsColum}
                        data={transactions}
                        isLoading={isLoading}
                        pageSize={20}
                        columnFilters={columnFilters}
                        onColumnFiltersChange={setColumnFilters}
                    />
                )}
            </section>
        </>
    );
}
