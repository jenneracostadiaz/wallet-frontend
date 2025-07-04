import { deleteTransaction, saveTransaction } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';

import type { Transaction } from '@/type/Transactions';

interface UseTransactionDeleteProps {
    onSuccess?: () => void;
}

export const useTransactionDelete = ({ onSuccess }: UseTransactionDeleteProps) => {
    const queryClient = useQueryClient();
    const { data: session } = useSession();
    const token = session?.accessToken || '';

    const { mutate, isPending } = useMutation({
        mutationFn: (transactionId: number) => deleteTransaction(token, transactionId),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['transactions'] });
            void queryClient.invalidateQueries({ queryKey: ['balance'] });
            void queryClient.invalidateQueries({ queryKey: ['monthlyReport'] });
            onSuccess?.();
        },
    });

    return { mutate, isPending };
};

interface UseTransactionMutationProps {
    transactionId?: number;
    onSuccess?: () => void;
}

export const useTransactionMutation = ({ transactionId, onSuccess }: UseTransactionMutationProps) => {
    const queryClient = useQueryClient();
    const { data: session } = useSession();
    const token = session?.accessToken || '';

    const { mutate, isPending, error } = useMutation({
        mutationFn: (transactionData: Partial<Transaction>) => {
            const formattedData = {
                ...transactionData,
                date: transactionData.date
                    ? format(new Date(transactionData.date), 'yyyy-MM-dd HH:mm:ss')
                    : format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            } as unknown as Partial<Transaction>;
            return saveTransaction(token, formattedData, transactionId);
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['transactions'] });
            void queryClient.invalidateQueries({ queryKey: ['balance'] });
            void queryClient.invalidateQueries({ queryKey: ['monthlyReport'] });
            onSuccess?.();
        },
    });

    return { mutate, isPending, error };
};
