import {Badge, Skeleton} from "@/components/ui";
import {BalanceByCurrency} from "@/type/Balance";

interface BalancesByCurrencyProps {
    balances: BalanceByCurrency[],
    loading: boolean,
}

export const BalancesByCurrency = ({balances, loading}: BalancesByCurrencyProps) => {
    return (
        <>
            {loading && (
                <section className="lg:col-span-3 flex flex-wrap gap-4">
                    <Skeleton className="h-5 w-32 rounded-md" />
                    <Skeleton className="h-5 w-32 rounded-md" />
                    <Skeleton className="h-5 w-32 rounded-md" />
                    <Skeleton className="h-5 w-32 rounded-md" />
                    <Skeleton className="h-5 w-32 rounded-md" />
                    <Skeleton className="h-5 w-32 rounded-md" />
                </section>
            )}

            {!loading && (
                <section className="lg:col-span-3 flex flex-wrap gap-4">
                    {balances?.map((balance: BalanceByCurrency, index) => (
                        <Badge key={index} variant="secondary">{balance.currency.symbol}{balance.total}<span className="text-muted-foreground text-xs">{balance.currency.code}</span></Badge>
                    ))}
                </section>
            )}
        </>
    )
}