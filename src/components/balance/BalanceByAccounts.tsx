import {Card, CardDescription, CardTitle, CardHeader, ScrollArea, Skeleton} from "@/components/ui";
import type {Account} from "@/type/Accounts";

interface BalanceByAccountsProps {
    loading: boolean;
    accounts?: Account[];
}

export const BalanceByAccounts = ({loading, accounts}: BalanceByAccountsProps) => {
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
                <ScrollArea className="lg:col-span-2 md:h-[182px] w-full">
                    <section className="grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
                        {accounts?.map((account: Account, index) => (
                            <Card key={index} className="@container/card py-2" style={{borderColor: account.color}} >
                                <CardHeader>
                                    <CardDescription>{account.name} ({account.type})</CardDescription>
                                    <CardTitle>{account.currency.symbol}{account.balance}<span className="text-muted-foreground text-xs">{account.currency.code}</span></CardTitle>
                                </CardHeader>
                            </Card>
                        ))}
                    </section>
                </ScrollArea>
            )}
        </>
    )
}