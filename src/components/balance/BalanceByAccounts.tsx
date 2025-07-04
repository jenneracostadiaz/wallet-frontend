import { Card, CardAction, CardDescription, CardHeader, CardTitle, ScrollArea } from '@/components/ui';
import type { Account } from '@/type/Accounts';
import { CircleDashed } from 'lucide-react';

interface BalanceByAccountsProps {
    accounts?: Account[];
}

export const BalanceByAccounts = ({ accounts }: BalanceByAccountsProps) => {
    return (
        <ScrollArea className="lg:col-span-3 md:h-[202px] w-full">
            <section className="grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4">
                {accounts?.map((account: Account) => (
                    <Card key={account.id} className="@container/card py-2">
                        <CardHeader className="px-4">
                            <CardDescription>
                                {account.name} <span className="text-xs">({account.type})</span>
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
    );
};
