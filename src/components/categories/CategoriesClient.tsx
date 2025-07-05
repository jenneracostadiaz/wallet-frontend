'use client';

import { DataTable } from '@/components/DataTable';
import { CategoriesColumn } from '@/components/categories/CategoriesColumn';
import { CreateCategory } from '@/components/categories/CreateCategory';

import { useCategoriesData } from '@/hooks/useCategories';
import type { Category } from '@/type/Categories';
import type { ColumnDef } from '@tanstack/table-core';

export function CategoriesClient({ initialCategories }: { initialCategories: { data: Category[] } }) {
    const subcategories: Category[] = useCategoriesData({ initialCategories });
    const columns: ColumnDef<Category>[] = CategoriesColumn({ initialCategories });

    return (
        <section className="px-4 w-full max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Categories</h1>
                <CreateCategory initialCategories={initialCategories} />
            </div>

            <DataTable columns={columns} data={subcategories} pageSize={50} />
        </section>
    );
}
