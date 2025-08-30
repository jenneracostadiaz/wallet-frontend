import { getPayments } from '@/app/(dashboard)/payments/_lib/fetch';
import type { DebtDetail, Payment, PaymentSchedule } from '@/app/(dashboard)/payments/_lib/types';
import { useAccountsData } from '@/hooks/useAccounts';
import { fetchWithAuth } from '@/lib/api';
import type { Account } from '@/type/Accounts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export const usePaymentsData = ({ initialPayments }: { initialPayments: { data: Payment[] } }) => {
    const { data: session } = useSession();
    const token = session?.accessToken || '';

    const paymentsQuery = useQuery({
        queryKey: ['payments', token],
        queryFn: () => getPayments(token),
        initialData: initialPayments,
        enabled: !!token,
    });

    return {
        payments: paymentsQuery.data,
        isLoading: paymentsQuery.isLoading,
        isError: paymentsQuery.isError,
    };
};

export const savePayment = (token: string, paymentData: Partial<Payment>, paymentId?: number): Promise<Payment> => {
    const method = paymentId ? 'PUT' : 'POST';
    const endpoint = paymentId ? `scheduled-payments/${paymentId}` : 'scheduled-payments';

    return fetchWithAuth(endpoint, token, {
        method,
        body: JSON.stringify(paymentData),
    });
};

const getInitialState = (payment?: Payment) => {
    return {
        name: payment?.name || '',
        description: payment?.description || '',
        payment_type: payment?.payment_type || 'recurring',
        status: payment?.status || '',
        amount: payment?.amount || 0,
        color: payment?.color || '',
        icon: payment?.icon || '',
        start_date: payment?.start_date || '',
        next_payment_date: payment?.next_payment_date || '',
        end_date: payment?.end_date || '',
        metadata: payment?.metadata || [],
        order: payment?.order || 0,
        created_at: payment?.created_at || '',
        updated_at: payment?.updated_at || '',
        account_id: payment?.account_id || 0,
        category_id: payment?.category_id || 0,
        payment_schedule: payment?.payment_schedule || ({} as PaymentSchedule),
        debt_detail: payment?.debt_detail || ({} as DebtDetail),
    };
};

interface UsePaymentFormProps {
    payment?: Payment;
    onSuccess?: () => void;
    initialAccounts: { data: Account[] };
}
export const usePaymentForm = ({ payment, onSuccess, initialAccounts }: UsePaymentFormProps) => {
    const [form, setForm] = useState(() => getInitialState(payment));
    const accounts: { data: Account[] } = useAccountsData({ initialAccounts });
    const { mutate, isPending, error } = usePaymentMutation({ paymentId: payment?.id, onSuccess });

    useEffect(() => {
        setForm(getInitialState(payment));
    }, [payment]);

    const handleInputChange = (field: keyof typeof form, value: string | number | string[]) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handlePaymentTypeChange = (value: string) => {
        setForm(prev => ({
            ...prev,
            payment_type: value,
        }));
    };

    const handleAccountChange = (value: string) => {
        const accountId = value === '0' || value === '' ? 0 : Number.parseInt(value);
        setForm(prev => ({
            ...prev,
            account_id: Number.isNaN(accountId) ? 0 : accountId,
        }));
    };

    const handleCategoryChange = (value: string) => {
        const categoryId = value === '0' || value === '' ? 0 : Number.parseInt(value);
        setForm(prev => ({
            ...prev,
            category_id: Number.isNaN(categoryId) ? 0 : categoryId,
        }));
    };

    const handleSubmit = () => {
        mutate(form);
    };

    const currencySymbol = accounts.data.find((account: Account) => account.id === form.account_id)?.currency?.symbol;

    return {
        form,
        setForm,
        isPending,
        error,
        currencySymbol,
        handlePaymentTypeChange,
        handleInputChange,
        handleAccountChange,
        handleCategoryChange,
        handleSubmit,
    };
};

interface UsePaymentMutationProps {
    paymentId?: number;
    onSuccess?: () => void;
}

export const usePaymentMutation = ({ paymentId, onSuccess }: UsePaymentMutationProps) => {
    const queryClient = useQueryClient();
    const { data: session } = useSession();
    const token = session?.accessToken || '';

    const { mutate, isPending, error } = useMutation({
        mutationFn: (paymentData: Partial<Payment>) => {
            return savePayment(token, paymentData, paymentId);
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['payments'] });
            onSuccess?.();
        },
    });

    return { mutate, isPending, error };
};
