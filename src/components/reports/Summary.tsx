import type {Summary} from "@/type/MonthlyReport";
import type {Currency} from "@/type/Currencies";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Separator} from "@/components/ui";
import {TrendingDown, TrendingUp} from "lucide-react";

interface SummaryProps {
    summary: Summary;
    currency: Currency;
    loading: boolean;
}

export const Summary = ({summary, currency, loading}: SummaryProps) => {
    return (
        <>
            {loading && (
                <p>Loading...</p>
            )}

            {!loading && (
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription>Summary</CardDescription>
                        <CardTitle className="text-xl font-semibold">
                            {currency?.symbol}{summary?.net_income} <span className="text-muted-foreground text-xs">{currency?.code}</span>
                        </CardTitle>
                        <Separator className="my-4" />
                        <div className="flex gap-4 text-sm font-semibold">
                            <div className="flex items-baseline gap-1">
                                {currency?.symbol}{summary?.total_expenses}
                                <span className="text-muted-foreground text-xs">{currency?.code}</span>
                                <TrendingDown className="size-4 text-red-400" />
                            </div>
                            <div className="flex items-baseline gap-1">
                                {currency?.symbol}{summary?.total_income}
                                <span className="text-muted-foreground text-xs">{currency?.code}</span>
                                <TrendingUp className="size-4 text-green-400" />
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            )}
        </>
    )
}