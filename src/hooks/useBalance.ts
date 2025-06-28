import {useSession} from "next-auth/react";
import {useQuery} from "@tanstack/react-query";

export const fetchBalance = async (token: string) => {
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

export const useGetBalance = () => {
    const { data: session } = useSession();

    const { data: balance, isLoading, isError } = useQuery({
        queryKey: ['balance', session?.accessToken],
        queryFn: () => fetchBalance(session?.accessToken || ''),
        enabled: !!session?.accessToken,
        refetchOnWindowFocus: false,
    });

    return {
        balance,
        isLoading,
        isError,
    };
}