'use client';
import {useQuery} from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const fetchBalance = async (token: string) => {
    const response = await fetch(`${process.env.REACT_APP_BALANCE_URL}/dashboard/balance`, {
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
    const token = session?.accessToken || "";
    const { data, isLoading, isError } = useQuery({
        queryKey: ['balance', token],
        queryFn: () => fetchBalance(token),
        enabled: !!token,
    });

    console.log(token, data, isLoading, isError);

    return <p>Balance</p>
}