import type { Account } from '@/type/Accounts';
import type { Category } from '@/type/Categories';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

const fetchCategories = async (token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Could not fetch categories');
    }
    return response.json();
};

export const useGetCategories = () => {
    const { data: session } = useSession();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['categories', session?.accessToken],
        queryFn: () => fetchCategories(session?.accessToken || ''),
        enabled: !!session?.accessToken,
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
        return categories.map((category: Category) => ({
            ...category,
        }));
    }, [categories]);
};

interface useCategoriesDeleteProps {
    category: Category;
    setOpen: (open: boolean) => void;
}

export const useCategoriesDelete = ({ category, setOpen }: useCategoriesDeleteProps) => {
    const queryClient = useQueryClient();
    const { data: session } = useSession();

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${category.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            });
            if (!response.ok) {
                throw new Error('Could not delete category');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories', session?.accessToken] }).then(r => console.log(r));
            setOpen(false);
        },
    });

    return { mutate, isPending };
};

interface useCategoryMutationProps {
    category?: Category;
    onSuccess?: () => void;
}

export const useCategoryMutation = ({ category, onSuccess }: useCategoryMutationProps) => {
    const queryClient = useQueryClient();
    const { data: session } = useSession();

    const { mutate, isPending, error } = useMutation({
        mutationFn: async (newCategory: Category) => {
            const method = category ? 'PUT' : 'POST';
            const url = category
                ? `${process.env.NEXT_PUBLIC_API_URL}/categories/${category.id}`
                : `${process.env.NEXT_PUBLIC_API_URL}/categories`;

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session?.accessToken}`,
                },
                body: JSON.stringify(newCategory),
            });

            if (!response.ok) {
                throw new Error('Could not save category');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories', session?.accessToken] }).then(r => console.log(r));
            onSuccess?.();
        },
    });

    return { mutate, isPending, error };
};
