'use client';
import { DataTable } from '@/components/DataTable';
import { Header } from '@/components/Header';
import { AccountsColumns } from '@/components/accounts/AccountsColumns';
import { Alert, AlertDescription, AlertTitle, Skeleton } from '@/components/ui';
import { useAccountsTableData, useGetAccounts } from '@/hooks/useAccounts';
import type { Account } from '@/type/Accounts';
import { Terminal } from 'lucide-react';

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

export default function AccountsPage() {
    const { data, isLoading, isError } = useGetAccounts();
    const accounts: Account[] = useAccountsTableData({ accounts: data?.data });
    return (
        <>
            <Header breadcrumbs={breadcrumbs} />

            <section className="px-4">
                {isError && (
                    <Alert variant="destructive">
                        <Terminal />
                        <AlertTitle>Account Error</AlertTitle>
                        <AlertDescription>Error fetching accounts. Please try again later.</AlertDescription>
                    </Alert>
                )}

                {!isError &&
                    (isLoading ? (
                        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                        </div>
                    ) : (
                        accounts && accounts.length > 0 && <DataTable columns={AccountsColumns} data={accounts} />
                    ))}
            </section>
        </>
    );
}
