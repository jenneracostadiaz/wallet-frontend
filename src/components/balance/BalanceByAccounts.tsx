import { Card, CardAction, CardDescription, CardHeader, CardTitle, ScrollArea, Skeleton } from '@/components/ui';
import type { Account } from '@/type/Accounts';
import { CircleDashed } from 'lucide-react';

interface BalanceByAccountsProps {
    loading: boolean;
    accounts?: Account[];
}

export const BalanceByAccounts = ({ loading, accounts }: BalanceByAccountsProps) => {
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
                <ScrollArea className="lg:col-span-2 md:h-[202px] w-full">
                    <section className="grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
                        {accounts?.map((account: Account) => (
                            <Card key={account.name} className="@container/card py-2">
                                <CardHeader className="px-4">
                                    <CardDescription>
                                        <span>{account.name}</span>
                                        <span className="text-muted-foreground  text-xs">({account.type})</span>
                                    </CardDescription>
                                    <CardTitle>
                                        {account.currency.symbol}
                                        {account.balance}
                                        <span className="text-muted-foreground text-xs">{account.currency.code}</span>
                                    </CardTitle>
                                    <CardAction>
                                        <CircleDashed className="size-4" style={{ color: account.color }} />
                                    </CardAction>
                                </CardHeader>
                            </Card>
                        ))}
                    </section>
                </ScrollArea>
            )}
        </>
    );
};
