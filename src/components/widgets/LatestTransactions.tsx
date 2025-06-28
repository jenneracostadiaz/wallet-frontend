'use client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui';
import { useGetLatestTransactions } from '@/hooks/useLatestTransactions';
import type { Transaction } from '@/type/Transactions';
import { Terminal } from 'lucide-react';

export const LatestTransactions = () => {
    const { data, isLoading, isError } = useGetLatestTransactions();
    const transactions: Transaction = data?.data;
    console.log(transactions);

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

            {!isError && (
                <div className="grid gap-4">
                    <p>Transactions</p>
                </div>
            )}
        </section>
    );
};
