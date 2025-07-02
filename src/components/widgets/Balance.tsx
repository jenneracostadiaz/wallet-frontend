'use client';

import { BalanceByAccounts, BalancesByCurrency, TotalBalance } from '@/components/balance';
import { ErrorMessage } from '@/components/ui/error-message';
import { useGetBalance } from '@/hooks/useBalance';
import type { Balance as BalanceType } from '@/type/Balance';

export const Balance = () => {
    const { balance, isLoading, isError } = useGetBalance();
    const balanceData: BalanceType = balance?.data;

    return (
        <>
            {isError && (
                <ErrorMessage
                    title="Balance Error"
                    message="There was a problem fetching your balance. Please try again later."
                />
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
