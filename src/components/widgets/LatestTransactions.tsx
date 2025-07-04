'use client';
import { DataTable } from '@/components/DataTable';
import { TransactionsColum } from '@/components/transactions/TransactionsColum';
import type { Transaction } from '@/type/Transactions';

export const LatestTransactions = ({ initialtransactions }: { initialtransactions: Transaction[] }) => {
    return <DataTable columns={TransactionsColum} data={initialtransactions} pageSize={10} />;
};
