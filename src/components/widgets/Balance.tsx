'use client';

import { BalanceByAccounts, BalancesByCurrency, TotalBalance } from '@/components/balance';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui';
import { useGetBalance } from '@/hooks/useBalance';
import type { Balance as BalanceType } from '@/type/Balance';
import { Terminal } from 'lucide-react';

export const Balance = () => {
    const { balance, isLoading, isError } = useGetBalance();
    const balanceData: BalanceType = balance?.data;

    return (
        <>
            {isError && (
                <Alert variant="destructive">
                    <Terminal />
                    <AlertTitle>Balance Error</AlertTitle>
                    <AlertDescription>
                        There was a problem fetching your balance. Please try again later.
                    </AlertDescription>
                </Alert>
            )}

            {!isError && (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <BalancesByCurrency loading={isLoading} balances={balanceData?.balances_by_currency} />
                    <TotalBalance
                        loading={isLoading}
                        currency={balanceData?.total_balance.currency}
                        balance={balanceData?.total_balance.total}
                    />
                    <BalanceByAccounts loading={isLoading} accounts={balanceData?.accounts_summary} />
                </div>
            )}
        </>
    );
};
