'use client';

import {useGetBalance} from "@/hooks/useBalance";

export const Balance = () => {

    const { balance, isLoading, isError } = useGetBalance();
    const balanceData = balance.data;

    return (
        <div className="p-4 shadow rounded">
            <h2 className="text-lg font-semibold">Balance: S/{balanceData?.total_balance}</h2>
        </div>
    );

}