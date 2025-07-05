'use client';

import { DataTable } from '@/components/DataTable';
import { categoriesColumn } from '@/components/categories/CategoriesColumn';
import { CreateCategory } from '@/components/categories/CreateCategory';
import { useCategoriesFilters } from '@/hooks/useCategoriesFilters';

import { useCategoriesData } from '@/hooks/useCategories';
import type { Category } from '@/type/Categories';

export function CategoriesClient({ initialCategories }: { initialCategories: { data: Category[] } }) {
    const subcategories: Category[] = useCategoriesData({ initialCategories });
    const { columnFilters, setColumnFilters } = useCategoriesFilters();

    return (
        <section className="px-4 w-full max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Categories</h1>
                <CreateCategory initialCategories={initialCategories} />
            </div>

            <DataTable
                columns={categoriesColumn}
                data={subcategories}
                pageSize={50}
                columnFilters={columnFilters}
                onColumnFiltersChange={setColumnFilters}
            />
        </section>
    );
}
