'use client';

import {useGetBalance} from "@/hooks/useBalance";
import {TotalBalance} from "@/components/balance/TotalBalance";
import {Alert, AlertDescription, AlertTitle, Skeleton} from "@/components/ui";
import {Terminal} from "lucide-react";
import {ifError} from "node:assert";

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
                <div className="flex flex-col gap-4">
                    <TotalBalance loading={isLoading} balance={balanceData?.total_balance} />
                </div>
            )}
        </>
    )

}