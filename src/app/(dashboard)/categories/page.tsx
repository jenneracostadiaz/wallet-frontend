'use client';
import { DataTable } from '@/components/DataTable';
import { Header } from '@/components/Header';
import { AccountsColumns } from '@/components/accounts/AccountsColumns';
import { categoriesColumn } from '@/components/categories/CategoriesColumn';
import { Alert, AlertDescription, AlertTitle, Skeleton } from '@/components/ui';
import { useCategoriesTableData, useGetCategories } from '@/hooks/useCategories';
import type { Category } from '@/type/Categories';
import { Terminal } from 'lucide-react';

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

export default function CategoriesPage() {
    const { data, isLoading, isError } = useGetCategories();
    const categories: Category[] = useCategoriesTableData({ categories: data?.data });
    return (
        <>
            <Header breadcrumbs={breadcrumbs} />
            <section className="px-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Categories</h1>
                </div>

                {isError && (
                    <Alert variant="destructive">
                        <Terminal />
                        <AlertTitle>Categories Error</AlertTitle>
                        <AlertDescription>Error fetching categories. Please try again later.</AlertDescription>
                    </Alert>
                )}

                {!isError &&
                    (isLoading ? (
                        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                        </div>
                    ) : (
                        categories &&
                        categories.length > 0 && <DataTable columns={categoriesColumn} data={categories} />
                    ))}
            </section>
        </>
    );
}
