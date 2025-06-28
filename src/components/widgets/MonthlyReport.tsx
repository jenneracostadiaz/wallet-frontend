'use client';

import { Summary } from '@/components/reports/Summary';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui';
import { useGetMonthlyReport } from '@/hooks/useMonthlyReport';
import type { monthlyReport as monthlyReportType } from '@/type/MonthlyReport';
import { Terminal } from 'lucide-react';
import {DailyBalance} from "@/components/reports/DailyBalance";

export const MonthlyReport = () => {
    const { data, isLoading, isError } = useGetMonthlyReport();
    const monthlyReport: monthlyReportType = data?.data;
    // console.log('Monthly Report Data:', monthlyReport);

    return (
        <section className="flex flex-col">
            <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0 mb-4">
                Monthly Report ({monthlyReport?.period?.month_name})
            </h2>
            {isError && (
                <Alert variant="destructive">
                    <Terminal />
                    <AlertTitle>Monthly Report Error</AlertTitle>
                    <AlertDescription>Error fetching monthly report. Please try again later.</AlertDescription>
                </Alert>
            )}
            {!isError && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Summary summary={monthlyReport?.summary} currency={monthlyReport?.currency} loading={isLoading} />
                    <DailyBalance balance={monthlyReport?.daily_balance} loading={isLoading} />
                </div>
            )}
        </section>
    );
};
