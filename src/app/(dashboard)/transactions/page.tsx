import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { Header } from '@/components/Header';
import { getBalance, getTransactions } from '@/lib/api';
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

export default async function TransactionsPage() {
    const session = await auth();
    if (!session?.accessToken) {
        redirect('/login');
    }

    const token = session.accessToken;

    const [initialTransactions, initialBalance] = await Promise.all([getTransactions(token), getBalance(token)]);

    return (
        <>
            <Header breadcrumbs={breadcrumbs} />
            <Suspense fallback={<TransactionsSkeleton />}>
                <TransactionsClient initialTransactions={initialTransactions} initialBalance={initialBalance} />
            </Suspense>
        </>
    );
}
