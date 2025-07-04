import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { Header } from '@/components/Header';
import { AccountsSkeleton } from '@/components/accounts/AccountsSkeleton';
import { getAccounts } from '@/lib/api';
import { AccountsClient } from './AccountsClient';

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

    const initialAccounts = await getAccounts(token);

    return (
        <>
            <Header breadcrumbs={breadcrumbs} />
            <Suspense fallback={<AccountsSkeleton />}>
                <AccountsClient initialAccounts={initialAccounts} />
            </Suspense>
        </>
    );
}
