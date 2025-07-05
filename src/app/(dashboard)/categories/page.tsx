import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { Header } from '@/components/Header';
import { CategoriesClient } from '@/components/categories/CategoriesClient';
import { CategoriesSkeleton } from '@/components/categories/CategoriesSkeleton';
import { getCategories } from '@/lib/api';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Categories',
        href: '/categories',
    },
];

export default async function CategoriesPage() {
    const session = await auth();
    if (!session?.accessToken) {
        redirect('/login');
    }

    const token = session.accessToken;

    const initialCategories = await getCategories(token);

    return (
        <>
            <Header breadcrumbs={breadcrumbs} />
            <Suspense fallback={<CategoriesSkeleton />}>
                <CategoriesClient initialCategories={initialCategories} />
            </Suspense>
        </>
    );
}
