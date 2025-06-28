import { Header } from '@/components/Header';
import { Balance } from '@/components/widgets';
import { MonthlyReport } from '@/components/widgets/MonthlyReport';

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
            <section className="flex flex-col gap-4 p-4 pt-0">
                <Balance />
                <MonthlyReport />
            </section>
        </>
    );
}
