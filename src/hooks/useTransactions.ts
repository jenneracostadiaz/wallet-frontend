import type { Transaction } from '@/type/Transactions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

const fetchTransactions = async (token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
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

interface UseTransactionsTableDataProps {
    transactions?: Transaction[];
}

export const useTransactionsTableData = ({ transactions }: UseTransactionsTableDataProps) => {
    return useMemo(() => {
        if (!transactions) return [];
        return transactions.map(transaction => {
            return {
                ...transaction,
            };
        });
    }, [transactions]);
};

interface useTransactionDeleteProps {
    transaction: Transaction;
    setOpen: (open: boolean) => void;
}

export const useTransactionDelete = ({ transaction, setOpen }: useTransactionDeleteProps) => {
    const queryClient = useQueryClient();
    const { data: session } = useSession();

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions/${transaction.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            });
            if (!response.ok) {
                throw new Error('Could not delete transaction');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] }).then(r => console.log(r));
            queryClient.invalidateQueries({ queryKey: ['balance'] }).then(r => console.log(r));
            queryClient.invalidateQueries({ queryKey: ['monthlyReport'] }).then(r => console.log(r));
            setOpen(false);
        },
    });

    return { mutate, isPending };
};

interface useTransactionMutationProps {
    transaction?: Transaction;
    onSuccess?: () => void;
}

export const useTransactionMutation = ({ transaction, onSuccess }: useTransactionMutationProps) => {
    const queryClient = useQueryClient();
    const { data: session } = useSession();

    const { mutate, isPending, error } = useMutation({
        mutationFn: async (newTransaction: Transaction) => {
            const method = transaction ? 'PUT' : 'POST';
            const url = transaction
                ? `${process.env.NEXT_PUBLIC_API_URL}/transactions/${transaction.id}`
                : `${process.env.NEXT_PUBLIC_API_URL}/transactions`;

            const formattedTransaction = {
                ...newTransaction,
                date: newTransaction.date
                    ? format(new Date(newTransaction.date), 'yyyy-MM-dd HH:mm:ss')
                    : format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            };

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session?.accessToken}`,
                },
                body: JSON.stringify(formattedTransaction),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));

                // Check if it's a validation error with specific field errors
                if (errorData.errors && typeof errorData.errors === 'object') {
                    const validationMessages: string[] = [];
                    for (const [, messages] of Object.entries(errorData.errors)) {
                        if (Array.isArray(messages)) {
                            validationMessages.push(...messages);
                        } else if (typeof messages === 'string') {
                            validationMessages.push(messages);
                        }
                    }

                    if (validationMessages.length > 0) {
                        const error = new Error(validationMessages.join('. ')) as Error & {
                            isValidationError: boolean;
                            validationErrors: Record<string, unknown>;
                        };
                        error.isValidationError = true;
                        error.validationErrors = errorData.errors;
                        throw error;
                    }
                }

                // Fallback to generic error message
                throw new Error(errorData.message || 'Could not save transaction');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient
                .invalidateQueries({ queryKey: ['transactions', session?.accessToken] })
                .then(r => console.log(r));
            queryClient.invalidateQueries({ queryKey: ['balance'] }).then(r => console.log(r));
            queryClient.invalidateQueries({ queryKey: ['monthlyReport'] }).then(r => console.log(r));
            onSuccess?.();
        },
    });

    return { mutate, isPending, error };
};
