import { BalanceSkeleton } from '@/components/balance/BalanceSkeleton';
import { LatestTransactionsSkeleton } from '@/components/latest-transactions/LatestTransactionsSkeleton';
import { MonthlyReportSkeleton } from '@/components/monthly-report';

export const DashboardSkeleton = () => {
    return (
        <main className="grid gap-12 w-11/12 max-w-7xl mx-auto">
            <BalanceSkeleton />
            <MonthlyReportSkeleton />
            <LatestTransactionsSkeleton />
        </main>
    );
};
