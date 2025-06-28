'use client';

import {useSession} from "next-auth/react";
import {useQuery} from "@tanstack/react-query";

const fetchBalance = async (token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/balance`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Could not fetch balance");
    }
    return response.json();
}

export const Balance = () => {
    const { data: session } = useSession();

    const {data: balance, isLoading, isError} = useQuery({
        queryKey: ['balance', session?.accessToken],
        queryFn: () => fetchBalance(session?.accessToken || ''),
        enabled: !!session?.accessToken, // Only run the query if we have a token
        refetchOnWindowFocus: false,
    })

    console.log('balance', balance);

    return (
        <div className="p-4 shadow rounded">
            <h2 className="text-lg font-semibold">Balance: S/{balance?.data.total_balance}</h2>
        </div>
    );

}