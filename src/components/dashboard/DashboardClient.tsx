'use client';

import { Balance } from '@/components/balance';
import { LatestTransactions } from '@/components/latest-transactions/LatestTransactions';
import { MonthlyReport } from '@/components/monthly-report';

import type { Account } from '@/type/Accounts';
import type { Balance as BalanceType } from '@/type/Balance';
import type { Category } from '@/type/Categories';
import type { MonthlyReport as MonthlyReportType } from '@/type/MonthlyReport';
import type { Transaction } from '@/type/Transactions';

interface DashboardClientProps {
    initialBalance: BalanceType;
    initialMonthlyReport: MonthlyReportType;
    initialLatestTransactions: Transaction[];
    initialAccounts: { data: Account[] };
    initialCategories: { data: Category[] };
}

export function DashboardClient({
    initialBalance,
    initialMonthlyReport,
    initialLatestTransactions,
    initialAccounts,
    initialCategories,
}: DashboardClientProps) {
    return (
        <section className="grid gap-12 w-full max-w-7xl mx-auto px-4">
            <Balance initialBalance={initialBalance} />
            <MonthlyReport initialMonthlyReport={initialMonthlyReport} />
            <LatestTransactions
                initialTransactions={initialLatestTransactions}
                initialAccounts={initialAccounts}
                initialCategories={initialCategories}
            />
        </section>
    );
}
