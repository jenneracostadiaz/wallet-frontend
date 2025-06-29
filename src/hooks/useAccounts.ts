import type { Account } from '@/type/Accounts';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

export const fetchAccounts = async (token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Could not fetch accounts');
    }
    return response.json();
};

export const useGetAccounts = () => {
    const { data: session } = useSession();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['accounts', session?.accessToken],
        queryFn: () => fetchAccounts(session?.accessToken || ''),
        enabled: !!session?.accessToken,
        refetchOnWindowFocus: false,
    });

    return {
        data,
        isLoading,
        isError,
    };
};

interface useAccountsTableDataProps {
    accounts?: Account[];
}

export const useAccountsTableData = ({ accounts }: useAccountsTableDataProps) => {
    return useMemo(() => {
        if (!accounts) return [];
        return accounts.map((account: Account) => {
            return {
                ...account,
            };
        });
    }, [accounts]);
};
