'use client';
import { DataTable } from '@/components/DataTable';
import { CreateTransaction } from '@/components/transactions/CreateTransaction';
import { DrawerTransactionFilters } from '@/components/transactions/DrawerTransactionFilters';
import { TransactionFilters } from '@/components/transactions/TransactionFilters';
import { TransactionsColum } from '@/components/transactions/TransactionsColum';
import { ErrorMessage } from '@/components/ui/error-message';
import { useIsMobile } from '@/hooks/use-mobile';
import { useGetLatestTransactions, useTransactionsTableData } from '@/hooks/useLatestTransactions';
import { useTransactionFilters } from '@/hooks/useTransactionFilters';
import type { Transaction } from '@/type/Transactions';

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
    const isMobile = useIsMobile();

    return (
        <section className="flex flex-col gap-4">
            <div className="flex flex-wrap justify-between items-center">
                <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
                    Latest Transactions
                </h2>
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
                    title="Latest Transactions Error"
                    message="Error fetching latest transactions. Please try again later."
                />
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
