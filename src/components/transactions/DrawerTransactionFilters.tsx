import { TransactionFilters } from '@/components/transactions/TransactionFilters';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui';
import type { AmountFilter } from '@/hooks/useTransactionFilters';
import { SlidersHorizontal } from 'lucide-react';
import type { DateRange } from 'react-day-picker';

interface DrawerTransactionFiltersProps {
    onFilterChange: (id: string, value: string | AmountFilter) => void;
    onDateRangeChange: (range: DateRange | undefined) => void;
    clearDateRange: () => void;
    getFilterValue: <T>(id: string) => T | undefined;
    dateRange: DateRange | undefined;
}

export const DrawerTransactionFilters = ({
    onFilterChange,
    onDateRangeChange,
    clearDateRange,
    getFilterValue,
    dateRange,
}: DrawerTransactionFiltersProps) => {
    return (
        <Drawer>
            <DrawerTrigger>
                <SlidersHorizontal className="size-4" />
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>This action cannot be undone.</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <TransactionFilters
                        onFilterChange={onFilterChange}
                        onDateRangeChange={onDateRangeChange}
                        clearDateRange={clearDateRange}
                        getFilterValue={getFilterValue}
                        dateRange={dateRange}
                    />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
