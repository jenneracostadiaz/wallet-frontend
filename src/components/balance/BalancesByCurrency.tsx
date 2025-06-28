import {Card, CardDescription, CardHeader, CardTitle, ScrollArea, Skeleton} from "@/components/ui";
import {Account} from "@/type/Accounts";

interface BalancesByCurrencyProps {
    accounts?: Account[];
    loading: boolean,
}

export const BalancesByCurrency = ({accounts, loading}: BalancesByCurrencyProps) => {
    return (
        <>
            {loading && (
                <section className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:col-span-2">
                    <Skeleton className="h-24 w-full rounded-2xl" />
                    <Skeleton className="h-24 w-full rounded-2xl" />
                    <Skeleton className="h-24 w-full rounded-2xl" />
                    <Skeleton className="h-24 w-full rounded-2xl" />
                    <Skeleton className="h-24 w-full rounded-2xl" />
                    <Skeleton className="h-24 w-full rounded-2xl" />
                </section>
            )}

            {!loading && (
                <ScrollArea className="lg:col-span-2 md:h-52 w-full rounded-2xl">
                    <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                        {accounts?.map((account, index) => (
                            <Card key={index} className="@container/card">
                                <CardHeader>
                                    <CardDescription>{account.type} ({account.count})</CardDescription>
                                    <CardTitle>${account.total_balance.toFixed(2)}</CardTitle>
                                </CardHeader>
                            </Card>
                        ))}
                    </section>
                </ScrollArea>
            )}
        </>
    )
}