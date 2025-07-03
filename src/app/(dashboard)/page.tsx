import { Header } from '@/components/Header';
import { LatestTransactions, MonthlyReport } from '@/components/widgets';
import { BalanceSkeleton } from '@/components/widgets/BalanceSkeleton';
import { BalanceWidget } from '@/components/widgets/BalanceWidget';
import { Suspense } from 'react';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/',
    },
];

export default function Home() {
    return (
        <>
            <Header breadcrumbs={breadcrumbs} />
            <section className="flex flex-col gap-12 p-4 pt-0 w-full max-w-7xl mx-auto">
                <Suspense fallback={<BalanceSkeleton />}>
                    <BalanceWidget />
                </Suspense>
                <MonthlyReport />
                <LatestTransactions />
            </section>
        </>
    );
}
