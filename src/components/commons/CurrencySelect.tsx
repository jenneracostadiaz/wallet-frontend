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

    return (
        <Select
            onValueChange={val => onChange(val === 'none' ? '' : val)}
            value={currencyIdExists ? value : ''}
            disabled={isLoadingCurrency || isErrorCurrency}
        >
            <SelectTrigger className="w-full">
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
                <SelectItem value="none">No Currencies</SelectItem>
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
