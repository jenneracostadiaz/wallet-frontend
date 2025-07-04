'use client';
import { getBalance, getTransactions } from '@/lib/api';
import type { Balance } from '@/type/Balance';
import type { Transaction } from '@/type/Transactions';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

interface UseTransitionsDataProps {
    initialBalance: Balance;
    initialTransactions: { data: Transaction[] };
}

export const useTransactionsData = ({ initialBalance, initialTransactions }: UseTransitionsDataProps) => {
    const { data: session } = useSession();
    const token = session?.accessToken || '';

    const balanceQuery = useQuery({
        queryKey: ['balance', token],
        queryFn: () => getBalance(token),
        initialData: initialBalance,
        enabled: !!token,
    });

    const transactionsQuery = useQuery({
        queryKey: ['transactions', token],
        queryFn: () => getTransactions(token),
        initialData: initialTransactions,
        enabled: !!token,
    });

    return {
        balance: balanceQuery.data,
        transactions: transactionsQuery.data,
        isLoading: balanceQuery.isLoading || transactionsQuery.isLoading,
        isError: balanceQuery.isError || transactionsQuery.isError,
    };
};
