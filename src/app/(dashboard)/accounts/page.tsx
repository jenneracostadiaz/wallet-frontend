import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { Header } from '@/components/Header';
import { AccountsClient } from '@/components/accounts/AccountsClient';
import { AccountsSkeleton } from '@/components/accounts/AccountsSkeleton';
import { getAccounts, getCurrencies } from '@/lib/api';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Accounts',
        href: '/accounts',
    },
];

export default async function AccountsPage() {
    const session = await auth();
    if (!session?.accessToken) {
        redirect('/login');
    }

    const token = session.accessToken;

    const [initialAccounts, initialCurrencies] = await Promise.all([getAccounts(token), getCurrencies(token)]);

    return (
        <>
            <Header breadcrumbs={breadcrumbs} />
            <Suspense fallback={<AccountsSkeleton />}>
                <AccountsClient initialAccounts={initialAccounts} initialCurrencies={initialCurrencies} />
            </Suspense>
        </>
    );
}
