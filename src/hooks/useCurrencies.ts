import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { getCurrencies } from '@/lib/api';

export const useGetCurrencies = () => {
    const { data: session } = useSession();
    const token = session?.accessToken || '';

    const { data, isLoading, isError } = useQuery({
        queryKey: ['currencies', token],
        queryFn: () => getCurrencies(token),
        enabled: !!token,
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
