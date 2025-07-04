import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui';
import { getCategories } from '@/lib/api';
import type { Category } from '@/type/Categories';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

interface CategoriesSelectProps {
    value: string;
    onChange: (value: string) => void;
    category?: Category;
    transactionType?: string;
    showSubcategories?: boolean;
    initialCategories: { data: Category[] };
}

export const CategoriesSelect = ({
    value,
    onChange,
    category,
    transactionType,
    showSubcategories = true,
    initialCategories,
}: CategoriesSelectProps) => {
    const { data: session } = useSession();
    const token = session?.accessToken || '';

    const {
        data: categoriesData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['categories', token],
        queryFn: () => getCategories(token),
        initialData: initialCategories,
        enabled: !!token,
    });

    const allCategories = categoriesData?.data || [];

    const parentCategories = useMemo(() => {
        if (!allCategories) return [];

        let filtered = allCategories.filter((cat: Category) => cat.parent_id === null);

        if (
            transactionType &&
            (transactionType === 'income' || transactionType === 'expense' || transactionType === 'transfer')
        ) {
            filtered = filtered.filter((cat: Category) => cat.type === transactionType);
        }

        if (category) {
            filtered = filtered.filter((cat: Category) => cat.id !== category.id);
        }

        return filtered;
    }, [allCategories, category, transactionType]);

    const categoryIdExists = parentCategories?.some(
        (c: Category) =>
            String(c.id) === String(value) || c.subcategories?.some((sc: Category) => String(sc.id) === String(value))
    );

    return (
        <Select
            onValueChange={val => onChange(val === 'none' ? '' : val)}
            value={categoryIdExists ? value : ''}
            disabled={isLoading || isError}
        >
            <SelectTrigger className="w-full">
                <SelectValue
                    placeholder={isLoading ? 'Loading...' : isError ? 'Error loading categories' : 'Select category'}
                />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="none">No category</SelectItem>
                {parentCategories?.map((cat: Category) =>
                    showSubcategories && cat.subcategories && cat.subcategories.length > 0 ? (
                        <SelectGroup key={cat.id}>
                            <SelectLabel className="capitalize">
                                {cat.icon} {cat.name}
                            </SelectLabel>
                            {cat.subcategories?.map((subcategory: Category) => (
                                <SelectItem
                                    key={subcategory.id}
                                    value={String(subcategory.id)}
                                    className="flex items-center gap-2 capitalize"
                                >
                                    {subcategory.icon} {subcategory.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    ) : (
                        <SelectItem key={cat.id} value={String(cat.id)} className="flex items-center gap-2 capitalize">
                            {cat.icon} {cat.name}
                        </SelectItem>
                    )
                )}
            </SelectContent>
        </Select>
    );
};
