import type { Balance } from '@/type/Balance';
import type { MonthlyReport } from '@/type/MonthlyReport';
import type { Transaction } from '@/type/Transactions';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchWithAuth(endpoint: string, token: string, options: RequestInit = {}) {
    const response = await fetch(`${API_URL}/${endpoint}`, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        if (response.status === 422 && errorData.errors && typeof errorData.errors === 'object') {
            const validationMessages = Object.values(errorData.errors).flat();
            const error = new Error(validationMessages.join('. ')) as Error & {
                isValidationError: boolean;
                validationErrors: Record<string, unknown>;
            };
            error.isValidationError = true;
            error.validationErrors = errorData.errors;
            throw error;
        }

        throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

export const getBalance = (token: string): Promise<Balance> => {
    return fetchWithAuth('dashboard/balance', token);
};

export const getMonthlyReport = (token: string): Promise<MonthlyReport> => {
    return fetchWithAuth('dashboard/monthly-report', token);
};

export const getLatestTransactions = (token: string): Promise<Transaction[]> => {
    return fetchWithAuth('dashboard/latest-transactions', token);
};

export const getTransactions = (token: string): Promise<{ data: Transaction[] }> => {
    return fetchWithAuth('transactions', token);
};

export const deleteTransaction = (token: string, transactionId: number): Promise<null> => {
    return fetchWithAuth(`transactions/${transactionId}`, token, { method: 'DELETE' });
};

export const saveTransaction = (
    token: string,
    transactionData: Partial<Transaction>,
    transactionId?: number
): Promise<Transaction> => {
    const method = transactionId ? 'PUT' : 'POST';
    const endpoint = transactionId ? `transactions/${transactionId}` : 'transactions';

    return fetchWithAuth(endpoint, token, {
        method,
        body: JSON.stringify(transactionData),
    });
};
