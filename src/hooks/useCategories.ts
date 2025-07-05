import { deleteCategory, getCategories, saveCategory } from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

import type { Category } from '@/type/Categories';

export const useCategoriesData = ({ initialCategories }: { initialCategories: { data: Category[] } }) => {
    const { data: session } = useSession();
    const token = session?.accessToken || '';

    const { data: categories } = useQuery({
        queryKey: ['categories', token],
        queryFn: () => getCategories(token),
        initialData: initialCategories,
        enabled: !!token,
    });

    return useMemo(() => {
        return categories.data.flatMap(category => [
            { ...category, level: 0 },
            ...(category.subcategories ? category.subcategories.map(sub => ({ ...sub, level: 1 })) : []),
        ]);
    }, [categories]);
};

interface UseCategoriesDeleteProps {
    onSuccess?: () => void;
}

export const useCategoriesDelete = ({ onSuccess }: UseCategoriesDeleteProps) => {
    const queryClient = useQueryClient();
    const { data: session } = useSession();
    const token = session?.accessToken || '';

    const { mutate, isPending } = useMutation({
        mutationFn: (categoryId: number) => deleteCategory(token, categoryId),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['categories'] });
            onSuccess?.();
        },
    });

    return { mutate, isPending };
};

interface UseCategoryMutationProps {
    categoryId?: number;
    onSuccess?: () => void;
}

export const useCategoryMutation = ({ categoryId, onSuccess }: UseCategoryMutationProps) => {
    const queryClient = useQueryClient();
    const { data: session } = useSession();
    const token = session?.accessToken || '';

    const { mutate, isPending, error } = useMutation({
        mutationFn: (categoryData: Partial<Category>) => saveCategory(token, categoryData, categoryId),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['categories'] });
            onSuccess?.();
        },
    });

    return { mutate, isPending, error };
};
