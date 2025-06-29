'use client';
import { DataTable } from '@/components/DataTable';
import { LatestTransactionsColumns } from '@/components/transactions/LatestTransactionsColumns';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui';
import { useGetLatestTransactions, useTransactionsTableData } from '@/hooks/useLatestTransactions';
import type { Transaction } from '@/type/Transactions';
import { Terminal } from 'lucide-react';

export const LatestTransactions = () => {
    const { data, isLoading, isError } = useGetLatestTransactions();
    const transactions: Transaction[] = useTransactionsTableData({ transactions: data?.data });
    // console.log(transactions);

    return (
        <section className="flex flex-col">
            <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0 mb-4">
                Latest Transactions
            </h2>

            {isError && (
                <Alert variant="destructive">
                    <Terminal />
                    <AlertTitle>Latest Transactions Error</AlertTitle>
                    <AlertDescription>Error fetching latest transactions. Please try again later.</AlertDescription>
                </Alert>
            )}

            {!isError &&
                (isLoading ? (
                    <p>Loading...</p>
                ) : (
                    transactions &&
                    transactions.length > 0 && <DataTable columns={LatestTransactionsColumns} data={transactions} />
                ))}
        </section>
    );
};
