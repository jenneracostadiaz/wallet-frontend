import { getPayments } from '@/app/(dashboard)/payments/_lib/fetch';
import { Header } from '@/components/Header';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Payments',
        href: '/payments',
    },
];

export default async function PaymentsPage() {
    const session = await auth();
    if (!session?.accessToken) {
        redirect('/login');
    }

    const token = session.accessToken;

    const [initialPayments] = await Promise.all([getPayments(token)]);
    console.log(initialPayments);

    return (
        <>
            <Header breadcrumbs={breadcrumbs} />
        </>
    );
}
