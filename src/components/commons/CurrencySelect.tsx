import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { getCurrencies } from '@/lib/api';
import type { Currency } from '@/type/Currencies';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

interface CurrencySelectProps {
    value: string;
    onChange: (value: string) => void;
    initialCurrencies: { data: Currency[] }; // New prop for initial data
}

export const CurrencySelect = ({ value, onChange, initialCurrencies }: CurrencySelectProps) => {
    const { data: session } = useSession();
    const token = session?.accessToken || '';

    const { data: currenciesData } = useQuery({
        queryKey: ['currencies', token],
        queryFn: () => getCurrencies(token),
        initialData: initialCurrencies,
        enabled: !!token,
    });

    const currencyList = currenciesData?.data || [];
    const currencyIdExists = currencyList.some((c: Currency) => String(c.id) === String(value));

    return (
        <Select onValueChange={val => onChange(val === 'none' ? '' : val)} value={currencyIdExists ? value : ''}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="none">No Currencies</SelectItem>
                {currencyList.map((currency: Currency) => (
                    <SelectItem key={currency.id} value={String(currency.id)}>
                        {currency.symbol}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
