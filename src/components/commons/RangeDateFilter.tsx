import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from '@/components/ui';
import { format } from 'date-fns';
import { CalendarIcon, X } from 'lucide-react';

interface RangeDateFilterProps {
    dateRange: { from: Date | undefined; to?: Date | undefined } | undefined;
    onDateRangeChange: (range: { from: Date | undefined; to?: Date | undefined } | undefined) => void;
    clearDateRange: () => void;
}

export const RangeDateFilter = ({ dateRange, onDateRangeChange, clearDateRange }: RangeDateFilterProps) => {
    return (
        <div className="flex gap-2 relative">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        data-empty={!dateRange?.from}
                        className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal w-full"
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange?.from ? (
                            dateRange.to ? (
                                <>
                                    {format(dateRange.from, 'LLL dd, y')} - {format(dateRange.to, 'LLL dd, y')}
                                </>
                            ) : (
                                format(dateRange.from, 'LLL dd, y')
                            )
                        ) : (
                            <span>Pick date range</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="range"
                        defaultMonth={dateRange?.from}
                        selected={dateRange}
                        onSelect={onDateRangeChange}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
            {dateRange?.from && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearDateRange}
                    className="absolute right-0 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-muted-foreground"
                >
                    <X className="size-4" />
                </Button>
            )}
        </div>
    );
};
