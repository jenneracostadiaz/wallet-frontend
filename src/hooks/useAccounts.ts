import type { Account } from '@/type/Accounts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

export const useAccountsTableData = ({ accounts }: { accounts: Account[] }) => {
    return useMemo(() => {
        if (!accounts) return [];
        return accounts.map((account: Account) => {
            return {
                ...account,
            };
        });
    }, [accounts]);
};

interface useAccountsDeleteProps {
    account: Account;
    setOpen: (open: boolean) => void;
}

export const useAccountsDelete = ({ account, setOpen }: useAccountsDeleteProps) => {
    const queryClient = useQueryClient();
    const { data: session } = useSession();

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/${account.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to delete account');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['accounts'] }).then(r => console.log(r));
            setOpen(false);
        },
    });

    return { mutate, isPending };
};
