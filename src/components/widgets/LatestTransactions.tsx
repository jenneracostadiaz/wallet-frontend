'use client';
import { DataTable } from '@/components/DataTable';
import { TransactionFilters } from '@/components/transactions/TransactionFilters';
import { TransactionsColum } from '@/components/transactions/TransactionsColum';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui';
import { useGetLatestTransactions, useTransactionsTableData } from '@/hooks/useLatestTransactions';
import { useTransactionFilters } from '@/hooks/useTransactionFilters';
import type { Transaction } from '@/type/Transactions';
import { Terminal } from 'lucide-react';

export const LatestTransactions = () => {
    const { data, isLoading, isError } = useGetLatestTransactions();
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
        <section className="flex flex-col gap-4">
            <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
                Latest Transactions
            </h2>

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
                    <AlertTitle>Latest Transactions Error</AlertTitle>
                    <AlertDescription>Error fetching latest transactions. Please try again later.</AlertDescription>
                </Alert>
            )}

            {!isError && (
                <DataTable
                    columns={TransactionsColum}
                    isLoading={isLoading}
                    data={transactions}
                    pageSize={10}
                    columnFilters={columnFilters}
                    onColumnFiltersChange={setColumnFilters}
                />
            )}
        </section>
    );
};
