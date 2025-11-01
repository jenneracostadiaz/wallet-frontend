import { Card, CardContent, CardDescription, CardHeader, CardTitle, Separator } from '@/components/ui';
import type { Currency } from '@/type/Currencies';
import type { Summary as SummaryType } from '@/type/MonthlyReport';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface SummaryProps {
    summary: SummaryType;
    currency: Currency;
}

export const Summary = ({ summary, currency }: SummaryProps) => {
    // Helper function to parse numbers that come as strings with comma separators
    const parseNumber = (value: string | number): number => {
        if (typeof value === 'number') return value;
        return Number(String(value).replace(/,/g, '')) || 0;
    };

    const netIncome = parseNumber(summary?.net_income);
    const totalIncome = parseNumber(summary?.total_income);
    const totalExpenses = parseNumber(summary?.total_expenses);

    return (
        <Card className="@container/card gap-0 p-0">
            <CardHeader className="p-4">
                <CardDescription>Summary</CardDescription>
                <CardTitle className="text-xl font-semibold flex items-baseline gap-1 border-b">
                    {currency.symbol}
                    {netIncome.toFixed(2)}
                    <span className="text-muted-foreground text-xs">{currency.code}</span>
                    {netIncome >= 0 ? (
                        <TrendingUp className="size-4 text-green-400" />
                    ) : (
                        <TrendingDown className="size-4 text-red-400" />
                    )}
                </CardTitle>
            </CardHeader>

            <CardContent className="p-4 pt-0">
                <div className="flex justify-between gap-4 h-5 text-sm font-semibold">
                    <div className="flex items-baseline gap-1">
                        {currency.symbol}
                        {totalIncome.toFixed(2)}
                        <TrendingUp className="size-4 text-green-400" />
                    </div>
                    <Separator orientation="vertical" />
                    <div className="flex items-baseline gap-1">
                        {currency.symbol}
                        {totalExpenses.toFixed(2)}
                        <TrendingDown className="size-4 text-red-400" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
