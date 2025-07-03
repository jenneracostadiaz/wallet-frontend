'use client';
import { DataTable } from '@/components/DataTable';
import { CreateTransaction } from '@/components/transactions/CreateTransaction';
import { DrawerTransactionFilters } from '@/components/transactions/DrawerTransactionFilters';
import { TransactionFilters } from '@/components/transactions/TransactionFilters';
import { TransactionsColum } from '@/components/transactions/TransactionsColum';
import { ErrorMessage } from '@/components/ui/error-message';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTransactionFilters } from '@/hooks/useTransactionFilters';
import { useGetTransactions, useTransactionsTableData } from '@/hooks/useTransactions';
import type { Transaction } from '@/type/Transactions';

interface TransactionsClientProps {
    initialTransactions: Transaction[];
}

export function TransactionsClient({ initialTransactions }: TransactionsClientProps) {
    const { data, isLoading, isError } = useGetTransactions(initialTransactions);
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
    const isMobile = useIsMobile();

    return (
        <>
            <div className="flex flex-wrap justify-between items-center gap-4">
                <h1 className="text-2xl font-bold">Transactions</h1>

                {isMobile && (
                    <DrawerTransactionFilters
                        onFilterChange={onFilterChange}
                        onDateRangeChange={onDateRangeChange}
                        clearDateRange={clearDateRange}
                        getFilterValue={getFilterValue}
                        dateRange={dateRange}
                    />
                )}
                <CreateTransaction />
            </div>

            {!isMobile && (
                <TransactionFilters
                    onFilterChange={onFilterChange}
                    onDateRangeChange={onDateRangeChange}
                    clearDateRange={clearDateRange}
                    getFilterValue={getFilterValue}
                    dateRange={dateRange}
                />
            )}

            {isError && (
                <ErrorMessage
                    title="Transactions Error"
                    message="Error fetching transactions. Please try again later."
                />
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
        </>
    );
}
