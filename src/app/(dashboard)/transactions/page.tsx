import { Header } from '@/components/Header';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Transactions',
        href: '/transactions',
    },
];

export default function TransactionsPage() {
    return (
        <>
            <Header breadcrumbs={breadcrumbs} />
        </>
    );
}
