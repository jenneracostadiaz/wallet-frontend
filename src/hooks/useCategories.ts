import type { Category } from '@/type/Categories';
import { useQuery } from '@tanstack/react-query';
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
