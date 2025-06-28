import {Card, CardDescription, CardHeader, CardTitle, Skeleton} from "@/components/ui";
import {Account} from "@/type/Accounts";

interface BalancesByCurrencyProps {
    accounts?: Account[];
    loading: boolean,
}

export const BalancesByCurrency = ({accounts, loading}: BalancesByCurrencyProps) => {
    return (
        <>
            {loading && (
                <Skeleton className="h-44 w-full rounded-2xl" />
            )}

            {!loading && (
                <div className="col-span-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {accounts?.map((account, index) => (
                        <Card key={index} className="@container/card">
                            <CardHeader>
                                <CardDescription>{account.type} ({account.count})</CardDescription>
                                <CardTitle>${account.total_balance.toFixed(2)}</CardTitle>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            )}
        </>
    )
}