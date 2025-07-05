import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { useCurrenciesData } from '@/hooks/useCurrencies';
import type { Currency } from '@/type/Currencies';

interface CurrencySelectProps {
    value: string;
    onChange: (value: string) => void;
    initialCurrencies: { data: Currency[] };
}

export const CurrencySelect = ({ value, onChange, initialCurrencies }: CurrencySelectProps) => {
    const currencies = useCurrenciesData({ initialCurrencies });
    const currencyIdExists = currencies.data.some((c: Currency) => String(c.id) === String(value));

    return (
        <Select onValueChange={val => onChange(val === 'none' ? '' : val)} value={currencyIdExists ? value : ''}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="none">No Currencies</SelectItem>
                {currencies.data.map((currency: Currency) => (
                    <SelectItem key={currency.id} value={String(currency.id)}>
                        {currency.symbol}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
