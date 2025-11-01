'use client';

import { LatestTransactions } from '@/components/latest-transactions/LatestTransactions';
import { DailyBalance, ExpensesByCategory, Summary } from '@/components/monthly-report';
import { Button } from '@/components/ui/button';
import type { Account } from '@/type/Accounts';
import type { Category } from '@/type/Categories';
import type { MonthlyReport as MonthlyReportType } from '@/type/MonthlyReport';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface Props {
    initialMonthlyReport: MonthlyReportType;
    initialAccounts: { data: Account[] };
    initialCategories: { data: Category[] };
}

export const MonthlyReport = ({ initialMonthlyReport, initialAccounts, initialCategories }: Props) => {
    const [monthlyReport, setMonthlyReport] = useState<MonthlyReportType>(initialMonthlyReport);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMonthlyReport = async (month: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/monthly-report?month=${month}`);
            if (!response.ok) {
                throw new Error('Failed to fetch monthly report');
            }
            const data = await response.json();
            setMonthlyReport(data);
        } catch (error) {
            console.error('Error fetching monthly report:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePrevMonth = () => {
        const currentDate = new Date(monthlyReport.period.month);
        currentDate.setMonth(currentDate.getMonth() - 1);
        const newMonth = currentDate.toISOString().slice(0, 7);
        fetchMonthlyReport(newMonth);
    };

    const handleNextMonth = () => {
        const currentDate = new Date(monthlyReport.period.month);
        currentDate.setMonth(currentDate.getMonth() + 1);
        const newMonth = currentDate.toISOString().slice(0, 7);
        fetchMonthlyReport(newMonth);
    };

    return (
        <section className="flex flex-col">
            <div className="flex items-center justify-between border-b pb-2 mb-4">
                <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0">
                    Monthly Report ({monthlyReport.period.month_name})
                </h2>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handlePrevMonth}
                        disabled={isLoading}
                        title="Previous Month"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleNextMonth}
                        disabled={isLoading}
                        title="Next Month"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex flex-col gap-4">
                    <Summary summary={monthlyReport.summary} currency={monthlyReport.currency} />
                </div>
                <ExpensesByCategory expenses={monthlyReport.expenses_by_category} />
                <DailyBalance balance={monthlyReport.daily_balance} />
            </div>
            <LatestTransactions
                initialTransactions={monthlyReport.transactions}
                initialAccounts={initialAccounts}
                initialCategories={initialCategories}
            />
        </section>
    );
};
