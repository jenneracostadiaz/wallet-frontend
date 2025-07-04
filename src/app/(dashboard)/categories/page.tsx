'use client';
import { DataTable } from '@/components/DataTable';
import { Header } from '@/components/Header';
import { categoriesColumn } from '@/components/categories/CategoriesColumn';
import { CreateCategory } from '@/components/categories/CreateCategory';
import { ErrorMessage } from '@/components/ui/error-message';
import { useCategoriesTableData, useGetCategories } from '@/hooks/useCategories';
import type { Category } from '@/type/Categories';
import type { ColumnFiltersState } from '@tanstack/react-table';
import { useState } from 'react';

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
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    return (
        <>
            <Header breadcrumbs={breadcrumbs} />
            <section className="px-4 w-full max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Categories</h1>
                    <CreateCategory />
                </div>

                {isError && (
                    <ErrorMessage
                        title="Categories Error"
                        message="Error fetching categories. Please try again later."
                    />
                )}

                {!isError && (
                    <DataTable
                        columns={categoriesColumn}
                        isLoading={isLoading}
                        data={categories}
                        pageSize={10}
                        columnFilters={columnFilters}
                        onColumnFiltersChange={setColumnFilters}
                    />
                )}
            </section>
        </>
    );
}
