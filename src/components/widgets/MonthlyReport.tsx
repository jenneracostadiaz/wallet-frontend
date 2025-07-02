'use client';

import { DailyBalance } from '@/components/reports/DailyBalance';
import { Summary } from '@/components/reports/Summary';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui';
import { ErrorMessage } from '@/components/ui/error-message';
import { ExpensesByCategory } from '@/components/widgets/ExpensesByCategory';
import { useGetMonthlyReport } from '@/hooks/useMonthlyReport';
import type { monthlyReport as monthlyReportType } from '@/type/MonthlyReport';
import { Terminal } from 'lucide-react';

export const MonthlyReport = () => {
    const { data, isLoading, isError } = useGetMonthlyReport();
    const monthlyReport: monthlyReportType = data?.data;

    return (
        <section className="flex flex-col">
            <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0 mb-4">
                Monthly Report ({monthlyReport?.period?.month_name})
            </h2>
            {isError && (
                <ErrorMessage
                    title="Monthly Report Error"
                    message="Error fetching monthly report. Please try again later."
                />
            )}
            {!isError && (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex flex-col gap-4">
                        <Summary
                            summary={monthlyReport?.summary}
                            currency={monthlyReport?.currency}
                            loading={isLoading}
                        />
                    </div>
                    <ExpensesByCategory expenses={monthlyReport?.expenses_by_category} loading={isLoading} />
                    <DailyBalance balance={monthlyReport?.daily_balance} loading={isLoading} />
                </div>
            )}
        </section>
    );
};
