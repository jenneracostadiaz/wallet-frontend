import { getCurrencies } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import type { Currency } from '@/type/Currencies';

export const useCurrenciesData = ({ initialCurrencies }: { initialCurrencies: { data: Currency[] } }) => {
    const { data: session } = useSession();
    const token = session?.accessToken || '';
    const { data: currencies } = useQuery({
        queryKey: ['currencies', token],
        queryFn: () => getCurrencies(token),
        initialData: initialCurrencies,
        enabled: !!token,
    });

    return currencies;
};
