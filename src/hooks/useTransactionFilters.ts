import { useCallback, useState } from 'react';

import type { ColumnFiltersState } from '@tanstack/react-table';
import type { DateRange } from 'react-day-picker';

export type AmountFilter = {
    currency?: string;
    type?: string;
};

export function useTransactionFilters() {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [dateRange, setDateRange] = useState<DateRange | undefined>();

    const onFilterChange = useCallback((id: string, value: string | AmountFilter) => {
        setColumnFilters(prev => {
            const newFilters = prev.filter(f => f.id !== id);

            let shouldAddNewFilter = false;
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                if (Object.values(value).some(v => v)) {
                    shouldAddNewFilter = true;
                }
            } else if (value) {
                shouldAddNewFilter = true;
            }

            if (shouldAddNewFilter) {
                newFilters.push({ id, value });
            }

            return newFilters;
        });
    }, []);

    const onDateRangeChange = useCallback((range: DateRange | undefined) => {
        setDateRange(range);
        setColumnFilters(prev => {
            const newFilters = prev.filter(f => f.id !== 'date');
            if (range?.from || range?.to) {
                newFilters.push({ id: 'date', value: range });
            }
            return newFilters;
        });
    }, []);

    const clearDateRange = useCallback(() => {
        onDateRangeChange(undefined);
    }, [onDateRangeChange]);

    const getFilterValue = useCallback(
        <T>(id: string): T | undefined => {
            const filter = columnFilters.find(f => f.id === id);
            return filter?.value as T;
        },
        [columnFilters]
    );

    return {
        columnFilters,
        dateRange,
        onFilterChange,
        onDateRangeChange,
        clearDateRange,
        getFilterValue,
        setColumnFilters,
    };
}
