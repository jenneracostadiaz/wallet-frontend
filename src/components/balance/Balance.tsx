'use client';

import { BalanceByAccounts, BalancesByCurrency, TotalBalance } from '@/components/balance/index';
import type { Balance as BalanceType } from '@/type/Balance';

export const Balance = ({ initialBalance }: { initialBalance: BalanceType }) => {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <BalancesByCurrency balances={initialBalance.balances_by_currency} />

            <TotalBalance
                currency={initialBalance.total_balance.currency}
                balance={initialBalance.total_balance.total}
            />

            <BalanceByAccounts accounts={initialBalance.accounts_summary} />
        </div>
    );
};
