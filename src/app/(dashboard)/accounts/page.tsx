import { Header } from '@/components/Header';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Accounts',
        href: '/accounts',
    },
];

export default function AccountsPage() {
    return (
        <>
            <Header breadcrumbs={breadcrumbs} />
        </>
    );
}
