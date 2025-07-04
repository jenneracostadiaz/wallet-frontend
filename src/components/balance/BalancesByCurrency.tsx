import { Badge, ScrollArea, ScrollBar } from '@/components/ui';
import type { BalanceByCurrency } from '@/type/Balance';

interface BalancesByCurrencyProps {
    balances?: BalanceByCurrency[];
}

export const BalancesByCurrency = ({ balances }: BalancesByCurrencyProps) => {
    return (
        <ScrollArea className="lg:col-span-4 w-[328px] md:w-full pb-3 md:pb-0 whitespace-nowrap">
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
    );
};
