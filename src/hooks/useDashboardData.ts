'use client';
import { getBalance, getLatestTransactions, getMonthlyReport } from '@/lib/api';
import type { Balance as BalanceType } from '@/type/Balance';
import type { MonthlyReport as MonthlyReportType } from '@/type/MonthlyReport';
import type { Transaction as TransactionType } from '@/type/Transactions';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

interface UseDashboardDataProps {
    initialBalance: BalanceType;
    initialMonthlyReport: MonthlyReportType;
    initialLatestTransactions: TransactionType[];
}

export const useDashboardData = ({
    initialBalance,
    initialMonthlyReport,
    initialLatestTransactions,
}: UseDashboardDataProps) => {
    const { data: session } = useSession();
    const token = session?.accessToken || '';

    const balanceQuery = useQuery({
        queryKey: ['balance', token],
        queryFn: () => getBalance(token),
        initialData: initialBalance,
        enabled: !!token,
    });

    const monthlyReportQuery = useQuery({
        queryKey: ['monthlyReport', token],
        queryFn: () => getMonthlyReport(token),
        initialData: initialMonthlyReport,
        enabled: !!token,
    });

    const latestTransactionsQuery = useQuery({
        queryKey: ['latestTransactions', token],
        queryFn: () => getLatestTransactions(token),
        initialData: initialLatestTransactions,
        enabled: !!token,
    });

    return {
        balance: balanceQuery.data,
        monthlyReport: monthlyReportQuery.data,
        latestTransactions: latestTransactionsQuery.data,
        isLoading: balanceQuery.isLoading || monthlyReportQuery.isLoading || latestTransactionsQuery.isLoading,
        isError: balanceQuery.isError || monthlyReportQuery.isError || latestTransactionsQuery.isError,
    };
};
