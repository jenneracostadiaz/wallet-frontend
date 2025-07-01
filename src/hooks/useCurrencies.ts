import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

const fetchCurrencies = async (token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/currencies`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Could not fetch currencies');
    }
    return response.json();
};

export const useGetCurrencies = () => {
    const { data: session } = useSession();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['currencies', session?.accessToken],
        queryFn: () => fetchCurrencies(session?.accessToken || ''),
        enabled: !!session?.accessToken,
        refetchOnWindowFocus: false,
    });

    return {
        data,
        isLoading,
        isError,
    };
};

export const useCurrencyList = () => {
    const { data, isLoading, isError } = useGetCurrencies();
    const list = Array.isArray(data) ? data : (data?.data ?? []);
    return {
        currencyList: list,
        isLoadingCurrency: isLoading,
        isErrorCurrency: isError,
    };
};

export const createEmptyCurrency = () => ({
    id: 0,
    code: '',
    name: '',
    symbol: '',
    decimal_places: 0,
});
