'use client';
import { DataTable } from '@/components/DataTable';
import { Header } from '@/components/Header';
import { AccountsColumns } from '@/components/accounts/AccountsColumns';
import { CreateAccount } from '@/components/accounts/CreateAccount';
import { ErrorMessage } from '@/components/ui/error-message';
import { useAccountsTableData, useGetAccounts } from '@/hooks/useAccounts';
import type { Account } from '@/type/Accounts';
import type { ColumnFiltersState } from '@tanstack/react-table';
import { useState } from 'react';

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
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    return (
        <>
            <Header breadcrumbs={breadcrumbs} />

            <section className="px-4 w-full max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Accounts</h1>
                    <div className="flex items-center gap-2">
                        <CreateAccount />
                    </div>
                </div>

                {isError && (
                    <ErrorMessage title="Account Error" message="Error fetching accounts. Please try again later." />
                )}

                {!isError && (
                    <DataTable
                        columns={AccountsColumns}
                        isLoading={isLoading}
                        data={accounts}
                        pageSize={10}
                        columnFilters={columnFilters}
                        onColumnFiltersChange={setColumnFilters}
                    />
                )}
            </section>
        </>
    );
}
