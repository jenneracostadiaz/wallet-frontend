'use client';

import { DailyBalance } from '@/components/reports/DailyBalance';
import { Summary } from '@/components/reports/Summary';
import { ExpensesByCategory } from '@/components/widgets/ExpensesByCategory';
import type { MonthlyReport as MonthlyReportType } from '@/type/MonthlyReport';

export const MonthlyReport = ({ initialMonthlyReport }: { initialMonthlyReport: MonthlyReportType }) => {
    return (
        <section className="flex flex-col">
            <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0 mb-4">
                Monthly Report ({initialMonthlyReport.period.month_name})
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex flex-col gap-4">
                    <Summary summary={initialMonthlyReport.summary} currency={initialMonthlyReport.currency} />
                </div>
                <ExpensesByCategory expenses={initialMonthlyReport.expenses_by_category} />
                <DailyBalance balance={initialMonthlyReport.daily_balance} />
            </div>
        </section>
    );
};
