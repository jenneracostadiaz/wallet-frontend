'use client';
import { DataTable } from '@/components/DataTable';
import { TransactionsColum } from '@/components/transactions/TransactionsColum';
import type { Transaction } from '@/type/Transactions';

export const LatestTransactions = ({ initialTransactions }: { initialTransactions: Transaction[] }) => {
    return <DataTable columns={TransactionsColum} data={initialTransactions} pageSize={10} />;
};
