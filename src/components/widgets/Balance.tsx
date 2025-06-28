'use client';

import {useGetBalance} from "@/hooks/useBalance";
import {TotalBalance} from "@/components/balance/TotalBalance";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui";
import {Terminal} from "lucide-react";
import {BalancesByCurrency} from "@/components/balance/BalancesByCurrency";

export const Balance = () => {

    const { balance, isLoading, isError } = useGetBalance();
    const balanceData = balance?.data;
    console.log('balanceData', balanceData);

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
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <TotalBalance loading={isLoading} balance={balanceData?.total_balance} />
                    <BalancesByCurrency loading={isLoading} accounts={balanceData?.accounts_summary} />
                </div>
            )}
        </>
    )

}