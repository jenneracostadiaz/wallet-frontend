import { Badge, ScrollArea, ScrollBar, Skeleton } from '@/components/ui';
import type { BalanceByCurrency } from '@/type/Balance';

interface BalancesByCurrencyProps {
    balances: BalanceByCurrency[];
    loading: boolean;
}

export const BalancesByCurrency = ({ balances, loading }: BalancesByCurrencyProps) => {
    return (
        <>
            {loading && (
                <ScrollArea className="lg:col-span-3 w-[328px] lg:w-96 pb-3 whitespace-nowrap">
                    <section className="flex w-max space-x-4">
                        <Skeleton className="h-5 w-32 rounded-md" />
                        <Skeleton className="h-5 w-32 rounded-md" />
                        <Skeleton className="h-5 w-32 rounded-md" />
                        <Skeleton className="h-5 w-32 rounded-md" />
                        <Skeleton className="h-5 w-32 rounded-md" />
                        <Skeleton className="h-5 w-32 rounded-md" />
                    </section>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            )}

            {!loading && (
                <ScrollArea className="lg:col-span-3 w-[328px] md:w-full pb-3 md:pb-0 whitespace-nowrap">
                    <section className="flex w-max space-x-4">
                        {balances?.map((balance: BalanceByCurrency) => (
                            <Badge key={balance.currency.code} variant="secondary">
                                {balance.currency.symbol}
                                {balance.total}
                                <span className="text-muted-foreground text-xs">{balance.currency.code}</span>
                            </Badge>
                        ))}
                    </section>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            )}
        </>
    );
};
