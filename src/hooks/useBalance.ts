import type { Balance } from '@/type/Balance';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const fetchBalance = async (token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/balance`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Could not fetch balance');
    }
    return response.json();
};

export const useGetBalance = (initialData?: Balance[]) => {
    const { data: session } = useSession();

    const {
        data: balance,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['balance', session?.accessToken],
        queryFn: () => fetchBalance(session?.accessToken || ''),
        enabled: !!session?.accessToken,
        refetchOnWindowFocus: false,
        initialData,
    });

    return {
        balance,
        isLoading,
        isError,
    };
};
