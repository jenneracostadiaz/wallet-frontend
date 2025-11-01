import type { Payment } from '@/app/(dashboard)/payments/_lib/types';
import { fetchWithAuth } from '@/lib/api';

export const getPayments = (token: string): Promise<{ data: Payment[] }> => {
    return fetchWithAuth('scheduled-payments', token);
};
