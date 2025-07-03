import { Header } from '@/components/Header';
import { BalanceSkeleton } from '@/components/widgets/BalanceSkeleton';
import { BalanceWidget } from '@/components/widgets/BalanceWidget';
import { auth } from '@/lib/auth';
import { Suspense } from 'react';
import { TransactionsClient } from './components/TransactionsClient';
import { TransactionsSkeleton } from './components/TransactionsSkeleton';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Transactions',
        href: '/transactions',
    },
];

async function getTransactions(token: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
    });
    if (!response.ok) {
        throw new Error('Could not fetch transactions');
    }
    return response.json();
}

async function TransactionsData() {
    const session = await auth();
    const transactions = await getTransactions(session?.accessToken || '');
    return <TransactionsClient initialTransactions={transactions} />;
}

export default function TransactionsPage() {
    return (
        <>
            <Header breadcrumbs={breadcrumbs} />
            <main className="p-4 grid gap-4 w-full max-w-7xl mx-auto">
                <Suspense fallback={<BalanceSkeleton />}>
                    <BalanceWidget />
                </Suspense>
                <Suspense fallback={<TransactionsSkeleton />}>
                    <TransactionsData />
                </Suspense>
            </main>
        </>
    );
}
