import type { Account } from '@/type/Accounts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { getAccounts, deleteAccount, saveAccount } from '@/lib/api';
import { createEmptyCurrency } from '@/hooks/useCurrencies';

export const useGetAccounts = () => {
    const { data: session } = useSession();
    const token = session?.accessToken || '';

    const { data, isLoading, isError } = useQuery({
        queryKey: ['accounts', token],
        queryFn: () => getAccounts(token),
        enabled: !!token,
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

export const useAccountsList = () => {
    const { data, isLoading, isError } = useGetAccounts();
    const list = Array.isArray(data) ? data : (data?.data ?? []);
    return {
        accountsList: list,
        isLoadingAccounts: isLoading,
        isErrorAccounts: isError,
    };
};

interface UseAccountsDeleteProps {
    onSuccess?: () => void;
}

export const useAccountsDelete = ({ onSuccess }: UseAccountsDeleteProps) => {
    const queryClient = useQueryClient();
    const { data: session } = useSession();
    const token = session?.accessToken || '';

    const { mutate, isPending } = useMutation({
        mutationFn: (accountId: number) => deleteAccount(token, accountId),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['accounts'] });
            onSuccess?.();
        },
    });

    return { mutate, isPending };
};

interface UseAccountsMutationProps {
    accountId?: number;
    onSuccess?: () => void;
}

export const useAccountsMutation = ({ accountId, onSuccess }: UseAccountsMutationProps) => {
    const queryClient = useQueryClient();
    const { data: session } = useSession();
    const token = session?.accessToken || '';

    const { mutate, isPending, error, reset } = useMutation({
        mutationFn: (accountData: Partial<Account>) => saveAccount(token, accountData, accountId),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['accounts'] });
            onSuccess?.();
        },
    });

    return { mutate, isPending, error, reset };
};

export const createEmptyAccount = () => ({
    id: 0,
    name: '',
    type: '',
    balance: 0,
    color: '',
    currency_id: 0,
    currency: createEmptyCurrency(),
    description: undefined,
    order: undefined,
});
