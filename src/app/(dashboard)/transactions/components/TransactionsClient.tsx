'use client';

import { Balance } from '@/components/balance';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTransactionFilters } from '@/hooks/useTransactionFilters';

import { DataTable } from '@/components/DataTable';
import { CreateTransaction } from '@/components/transactions/CreateTransaction';
import { TransactionFilters } from '@/components/transactions/TransactionFilters';
import { TransactionsColum } from '@/components/transactions/TransactionsColum';
import { useTransactionsData } from '@/hooks/useTransactions';

import type { Account } from '@/type/Accounts';
import type { Balance as BalanceType } from '@/type/Balance';
import type { Category } from '@/type/Categories';
import type { Currency } from '@/type/Currencies';
import type { Transaction } from '@/type/Transactions';
import type { ColumnDef } from '@tanstack/table-core';

interface TransactionsClientProps {
    initialBalance: BalanceType;
    initialTransactions: { data: Transaction[] };
    initialAccounts: { data: Account[] };
    initialCategories: { data: Category[] };
    initialCurrencies: { data: Currency[] };
}

export function TransactionsClient({
    initialBalance,
    initialTransactions,
    initialAccounts,
    initialCategories,
    initialCurrencies,
}: TransactionsClientProps) {
    const { balance, transactions } = useTransactionsData({ initialBalance, initialTransactions });

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

    const columns: ColumnDef<Transaction>[] = TransactionsColum({ initialAccounts, initialCategories });

    return (
        <section className="grid gap-12 w-full max-w-7xl mx-auto px-4">
            <Balance initialBalance={balance} />

            <div className="grid gap-4">
                <div className="flex flex-wrap justify-between items-center gap-4">
                    <h1 className="text-2xl font-bold">Transactions</h1>
                    <CreateTransaction initialAccounts={initialAccounts} initialCategories={initialCategories} />
                </div>

                {!isMobile && (
                    <TransactionFilters
                        onFilterChange={onFilterChange}
                        onDateRangeChange={onDateRangeChange}
                        clearDateRange={clearDateRange}
                        getFilterValue={getFilterValue}
                        dateRange={dateRange}
                        initialAccounts={initialAccounts}
                        initialCategories={initialCategories}
                        initialCurrencies={initialCurrencies}
                    />
                )}

                <DataTable
                    columns={columns}
                    data={transactions.data}
                    pageSize={22}
                    columnFilters={columnFilters}
                    onColumnFiltersChange={setColumnFilters}
                />
            </div>
        </section>
    );
}
