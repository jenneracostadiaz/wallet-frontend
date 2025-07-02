import { Card, CardContent, CardDescription, CardHeader, CardTitle, Separator, Skeleton } from '@/components/ui';
import type { Currency } from '@/type/Currencies';
import type { Summary as SummaryType } from '@/type/MonthlyReport';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface SummaryProps {
    summary: SummaryType;
    currency: Currency;
    loading: boolean;
}

export const Summary = ({ summary, currency, loading }: SummaryProps) => {
    return (
        <>
            {loading && <Skeleton className="h-44 w-full rounded-2xl" />}

            {!loading && (
                <Card className="@container/card gap-0 p-0">
                    <CardHeader className="p-4">
                        <CardDescription>Summary</CardDescription>
                        <CardTitle className="text-xl font-semibold flex items-baseline gap-1 border-b">
                            {currency?.symbol}
                            {summary?.net_income}{' '}
                            <span className="text-muted-foreground text-xs">{currency?.code}</span>
                            {summary?.net_income > 0 ? (
                                <TrendingUp className="size-4 text-green-400" />
                            ) : (
                                <TrendingDown className="size-4 text-red-400" />
                            )}
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-4 pt-0">
                        <div className="flex justify-between gap-4 h-5 text-sm font-semibold">
                            <div className="flex items-baseline gap-1">
                                {currency?.symbol}
                                {summary?.total_income}
                                <TrendingDown className="size-4 text-red-400" />
                            </div>
                            <Separator orientation="vertical" />
                            <div className="flex items-baseline gap-1">
                                {currency?.symbol}
                                {summary?.total_income}
                                <TrendingUp className="size-4 text-green-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </>
    );
};
