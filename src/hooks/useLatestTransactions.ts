import type { Account } from '@/type/Accounts';
import type { Transaction } from '@/type/Transactions';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

export const fetchLatestTransactions = async (token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/latest-transactions`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Could not fetch latest transactions');
    }
    return response.json();
};

export const useGetLatestTransactions = () => {
    const { data: session } = useSession();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['transactions', session?.accessToken],
        queryFn: () => fetchLatestTransactions(session?.accessToken || ''),
        enabled: !!session?.accessToken,
        refetchOnWindowFocus: false,
    });

    return {
        data,
        isLoading,
        isError,
    };
};

interface UseGetLatestTransactionsProps {
    transactions?: Transaction[];
}

export const useTransactionsTableData = ({ transactions }: UseGetLatestTransactionsProps) => {
    return useMemo(() => {
        if (!transactions) return [];
        return transactions.map(transaction => {
            return {
                ...transaction,
            };
        });
    }, [transactions]);
};
