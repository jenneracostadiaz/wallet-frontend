import { getPayments } from '@/app/(dashboard)/payments/_lib/fetch';
import type { Payment } from '@/app/(dashboard)/payments/_lib/types';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

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
