'use client';

import {useGetBalance} from "@/hooks/useBalance";

export const Balance = () => {

    const { balance, isLoading, isError } = useGetBalance();
    const balanceData = balance?.data;
    console.log('balanceData', balanceData);

    if (isError) {
        return <div className="text-red-500">Error al cargar el balance</div>;
    }

    return (
        isLoading ? (
            <div className="text-gray-500">Cargando...</div>
        ) : (
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold">Balance</h2>
                <div className="p-4 rounded shadow">
                    <p className="text-lg font-semibold">Saldo Actual: ${balanceData?.total_balance}</p>
                </div>
            </div>
        )
    )

}