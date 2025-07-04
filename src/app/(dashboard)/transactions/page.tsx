import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { Header } from '@/components/Header';
import { getAccounts, getBalance, getCategories, getCurrencies, getTransactions } from '@/lib/api';
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

    const [initialTransactions, initialBalance, initialAccounts, initialCategories, initialCurrencies] =
        await Promise.all([
            getTransactions(token),
            getBalance(token),
            getAccounts(token),
            getCategories(token),
            getCurrencies(token),
        ]);

    return (
        <>
            <Header breadcrumbs={breadcrumbs} />
            <Suspense fallback={<TransactionsSkeleton />}>
                <TransactionsClient
                    initialTransactions={initialTransactions}
                    initialBalance={initialBalance}
                    initialAccounts={initialAccounts}
                    initialCategories={initialCategories}
                    initialCurrencies={initialCurrencies}
                />
            </Suspense>
        </>
    );
}
