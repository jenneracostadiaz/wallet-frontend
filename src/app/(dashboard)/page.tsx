import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { DashboardClient } from '@/components/dashboard/DashboardClient';
import { getAccounts, getBalance, getCategories, getLatestTransactions, getMonthlyReport } from '@/lib/api';

import { Header } from '@/components/Header';
import { DashboardSkeleton } from '@/components/dashboard/DashboardSkeleton';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/',
    },
];

export default async function DashboardPage() {
    const session = await auth();
    if (!session?.accessToken) {
        redirect('/login');
    }

    const token = session.accessToken;

    const [balanceResponse, monthlyReport, latestTransactions, initialAccounts, initialCategories] = await Promise.all([
        getBalance(token),
        getMonthlyReport(token),
        getLatestTransactions(token),
        getAccounts(token),
        getCategories(token),
    ]);

    return (
        <>
            <Header breadcrumbs={breadcrumbs} />
            <Suspense fallback={<DashboardSkeleton />}>
                <DashboardClient
                    initialBalance={balanceResponse}
                    initialMonthlyReport={monthlyReport}
                    initialLatestTransactions={latestTransactions}
                    initialAccounts={initialAccounts}
                    initialCategories={initialCategories}
                />
            </Suspense>
        </>
    );
}
