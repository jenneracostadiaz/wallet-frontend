'use client';
import { DataTable } from '@/components/DataTable';
import { TransactionsColum } from '@/components/transactions/TransactionsColum';

import type { Account } from '@/type/Accounts';
import type { Category } from '@/type/Categories';
import type { Transaction } from '@/type/Transactions';
import type { ColumnDef } from '@tanstack/table-core';

interface LatestTransactionsProps {
    initialTransactions: Transaction[];
    initialAccounts: { data: Account[] };
    initialCategories: { data: Category[] };
}

export const LatestTransactions = ({
    initialTransactions,
    initialAccounts,
    initialCategories,
}: LatestTransactionsProps) => {
    const columns: ColumnDef<Transaction>[] = TransactionsColum({ initialAccounts, initialCategories });
    return <DataTable columns={columns} data={initialTransactions} pageSize={10} />;
};
