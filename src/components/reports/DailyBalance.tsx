import type { DailyBalance as DailyBalanceType } from '../../types/reports';
import {Skeleton} from "@/components/ui";

interface DailyBalanceProps {
    loading: boolean;
    balance: DailyBalanceType[];
}

export const DailyBalance = ({loading, balance}: DailyBalanceProps) => {
    console.log(balance);
    return (
        <>
            {loading && <Skeleton className="h-44 w-full rounded-2xl" />}
            {!loading && (
                <p>DailyBalance</p>
            )}
        </>
    )
}