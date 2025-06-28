import {Badge, Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle, Skeleton} from "@/components/ui";
import {TrendingUp} from "lucide-react";

interface TotalBalanceProps {
    balance: number;
    loading?: boolean;
}

export const TotalBalance = ({balance, loading}: TotalBalanceProps) => {
    return (
        <>
            {loading && (
                <Skeleton className="h-52 w-full rounded-2xl" />
            )}

            {!loading && (
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription>Total Balance</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            ${balance}
                        </CardTitle>
                        <CardAction>
                            <Badge variant="outline">
                                <TrendingUp />
                                +12.5%
                            </Badge>
                        </CardAction>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <p className="line-clamp-1 flex gap-2 font-medium">
                            Your balance so far <TrendingUp className="size-4" />
                        </p>
                        <p className="text-muted-foreground">
                            This is the sum of all your accounts
                        </p>
                    </CardFooter>
                </Card>
            )}
        </>
    )
}