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
    initialAccounts: { data: Account[] };
    initialCategories: { data: Category[] };
}

export function DashboardClient({
    initialBalance,
    initialMonthlyReport,
    initialAccounts,
    initialCategories,
}: DashboardClientProps) {
    console.log('Initial Balance:', initialBalance);
    console.log('Initial Monthly Report:', initialMonthlyReport);
    return (
        <section className="grid gap-12 w-full max-w-7xl mx-auto px-4">
            <Balance initialBalance={initialBalance} />
            <MonthlyReport initialMonthlyReport={initialMonthlyReport} />
            <LatestTransactions
                initialTransactions={initialMonthlyReport.transactions}
                initialAccounts={initialAccounts}
                initialCategories={initialCategories}
            />
        </section>
    );
}
