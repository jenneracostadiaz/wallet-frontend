import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

const fetchTransactions = async (token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Could not fetch transactions');
    }
    return response.json();
};

export const useGetTransactions = () => {
    const { data: session } = useSession();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['transactions', session?.accessToken],
        queryFn: () => fetchTransactions(session?.accessToken || ''),
        enabled: !!session?.accessToken,
        refetchOnWindowFocus: false,
    });

    return {
        data,
        isLoading,
        isError,
    };
};
