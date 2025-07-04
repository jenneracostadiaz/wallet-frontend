import type { Category } from '@/type/Categories';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { getCategories, deleteCategory, saveCategory } from '@/lib/api';

export const useGetCategories = () => {
    const { data: session } = useSession();
    const token = session?.accessToken || '';

    const { data, isLoading, isError } = useQuery({
        queryKey: ['categories', token],
        queryFn: () => getCategories(token),
        enabled: !!token,
        refetchOnWindowFocus: false,
    });

    return {
        data,
        isLoading,
        isError,
    };
};

export const useCategoriesTableData = ({ categories }: { categories: Category[] }) => {
    return useMemo(() => {
        if (!categories) return [];
        const flatten = (cats: Category[], level: number): Category[] => {
            return cats.flatMap(cat => [
                { ...cat, level },
                ...(cat.subcategories ? flatten(cat.subcategories, level + 1) : []),
            ]);
        };
        return flatten(categories, 0);
    }, [categories]);
};

export const useGetParentCategories = ({
    category,
    transactionType,
}: { category?: Category; transactionType?: string }) => {
    const { data: session } = useSession();
    const token = session?.accessToken || '';

    const { data, isLoading, isError } = useQuery({
        queryKey: ['categories', token],
        queryFn: () => getCategories(token),
        enabled: !!token,
        refetchOnWindowFocus: false,
    });

    const parentCategories = useMemo(() => {
        if (!data || !data.data) return [];

        if (
            transactionType &&
            (transactionType === 'income' || transactionType === 'expense' || transactionType === 'transfer')
        ) {
            return data.data.filter(
                (cat: Category) => cat.type === transactionType && cat.parent_id === null && cat.id !== category?.id
            );
        }

        if (!category) {
            return data.data.filter((cat: Category) => cat.parent_id === null);
        }

        return data.data.filter(
            (cat: Category) => cat.type === category.type && cat.parent_id === null && cat.id !== category.id
        );
    }, [data, category, transactionType]);

    return {
        parentCategories,
        isLoading,
        isError,
    };
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

export const createEmptyCategory = () => ({
    id: 0,
    name: '',
    type: 'income' as const,
    icon: '',
    subcategories: undefined,
    parent: undefined,
    parent_id: undefined,
});

