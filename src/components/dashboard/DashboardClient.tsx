'use client';

import { Balance } from '@/components/balance';
import { LatestTransactions } from '@/components/latest-transactions/LatestTransactions';
import { MonthlyReport } from '@/components/monthly-report';
import { useDashboardData } from '@/hooks/useDashboardData';
import type { Balance as BalanceType } from '@/type/Balance';
import type { MonthlyReport as MonthlyReportType } from '@/type/MonthlyReport';
import type { Transaction as TransactionType } from '@/type/Transactions';

interface DashboardClientProps {
    initialBalance: BalanceType;
    initialMonthlyReport: MonthlyReportType;
    initialLatestTransactions: TransactionType[];
}

export function DashboardClient({
    initialBalance,
    initialMonthlyReport,
    initialLatestTransactions,
}: DashboardClientProps) {
    const { balance, monthlyReport, latestTransactions } = useDashboardData({
        initialBalance,
        initialMonthlyReport,
        initialLatestTransactions,
    });

    return (
        <section className="grid gap-12 w-full max-w-7xl mx-auto px-4">
            <Balance initialBalance={balance} />
            <MonthlyReport initialMonthlyReport={monthlyReport} />
            <LatestTransactions initialTransactions={latestTransactions} />
        </section>
    );
}
