'use client';

import { DataTable } from '@/components/DataTable';
import { AccountsColumns } from '@/components/accounts/AccountsColumns';
import { CreateAccount } from '@/components/accounts/CreateAccount';
import { useAccountsData } from '@/hooks/useAccounts';
import { useAccountsFilters } from '@/hooks/useAccountsFilters';

import type { Account } from '@/type/Accounts';
import type { Currency } from '@/type/Currencies';

interface AccountsClientProps {
    initialAccounts: { data: Account[] };
    initialCurrencies: { data: Currency[] };
}

export function AccountsClient({ initialAccounts, initialCurrencies }: AccountsClientProps) {
    const accounts = useAccountsData({ initialAccounts });
    const { columnFilters, setColumnFilters } = useAccountsFilters();
    const columns = AccountsColumns({ initialCurrencies });

    return (
        <section className="px-4 w-full max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Accounts</h1>
                <div className="flex items-center gap-2">
                    <CreateAccount initialCurrencies={initialCurrencies} />
                </div>
            </div>

            <DataTable
                columns={columns}
                data={accounts.data}
                pageSize={50}
                columnFilters={columnFilters}
                onColumnFiltersChange={setColumnFilters}
            />
        </section>
    );
}
