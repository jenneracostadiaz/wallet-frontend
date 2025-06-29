import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { useCurrencyList } from '@/hooks/useCurrencies';
import type { Currency } from '@/type/Currencies';
import { useEffect } from 'react';

interface CurrencySelectProps {
    value: string;
    onChange: (value: string) => void;
}

export const CurrencySelect = ({ value, onChange }: CurrencySelectProps) => {
    const { currencyList, isLoadingCurrency, isErrorCurrency } = useCurrencyList();
    const currencyIdExists = currencyList.some((c: Currency) => String(c.id) === String(value));

    useEffect(() => {
        if (!isLoadingCurrency && !isErrorCurrency && currencyList.length > 0 && !currencyIdExists) {
            onChange(String(currencyList[0].id));
        }
    }, [isLoadingCurrency, isErrorCurrency, currencyList, currencyIdExists, onChange]);

    return (
        <Select
            onValueChange={onChange}
            value={currencyIdExists ? value : ''}
            disabled={isLoadingCurrency || isErrorCurrency}
        >
            <SelectTrigger className="w-16">
                <SelectValue
                    placeholder={
                        isLoadingCurrency
                            ? 'Loading...'
                            : isErrorCurrency
                              ? 'Error loading currencies'
                              : 'Select currency'
                    }
                />
            </SelectTrigger>
            <SelectContent>
                {!isLoadingCurrency &&
                    !isErrorCurrency &&
                    currencyList.map((currency: Currency) => (
                        <SelectItem key={currency.id} value={String(currency.id)}>
                            {currency.symbol}
                        </SelectItem>
                    ))}
            </SelectContent>
        </Select>
    );
};
