import {deleteAccount, getAccountCsv, getAccountPdf, getAccounts, saveAccount} from '@/lib/api';
import type { Account } from '@/type/Accounts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const useAccountsData = ({ initialAccounts }: { initialAccounts: { data: Account[] } }) => {
    const { data: session } = useSession();
    const token = session?.accessToken || '';
    const { data: accounts } = useQuery({
        queryKey: ['accounts', token],
        queryFn: () => getAccounts(token),
        initialData: initialAccounts,
        enabled: !!token,
    });

    return accounts;
};

export const useAccountsPdf = (accountId: number) => {
    const { data: session } = useSession();
    const token = session?.accessToken || '';

    return useQuery({
        queryKey: ['accounts', accountId, 'pdf', token],
        queryFn: () => getAccountPdf(token, accountId),
        enabled: !!token && !!accountId,
        refetchOnWindowFocus: false,
    });
}

export const useAccountsCsv = (accountId: number) => {
    const { data: session } = useSession();
    const token = session?.accessToken || '';

    return useQuery({
        queryKey: ['accounts', accountId, 'csv', token],
        queryFn: () => getAccountCsv(token, accountId),
        enabled: !!token && !!accountId,
        refetchOnWindowFocus: false,
    });
}

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
