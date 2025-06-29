import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { useGetParentCategories } from '@/hooks/useCategories';
import type { Category } from '@/type/Categories';
import { useEffect } from 'react';

interface CategoriesSelectProps {
    value: string;
    onChange: (value: string) => void;
    category: Category;
}

export const CategoriesSelect = ({ value, onChange, category }: CategoriesSelectProps) => {
    const { parentCategories, isLoading, isError } = useGetParentCategories({ category });
    const categoryIdExists = parentCategories?.some((c: Category) => String(c.id) === String(value));
    console.log(parentCategories, categoryIdExists);
    useEffect(() => {
        if (!isLoading && !isError && parentCategories.length > 0 && !categoryIdExists) {
            onChange(String(parentCategories[0].id));
        }
    }, [isLoading, isError, parentCategories, categoryIdExists, onChange]);

    return (
        <Select onValueChange={onChange} value={categoryIdExists ? value : ''} disabled={isLoading || isError}>
            <SelectTrigger className="w-full">
                <SelectValue
                    placeholder={isLoading ? 'Loading...' : isError ? 'Error loading categories' : 'Select category'}
                />
            </SelectTrigger>
            <SelectContent>
                {!isLoading &&
                    !isError &&
                    parentCategories?.map((category: Category) => (
                        <SelectItem key={category.id} value={String(category.id)}>
                            {category.icon} {category.name}
                            <span className="text-muted-foreground text-xs">(type:{category.type})</span>
                        </SelectItem>
                    ))}
            </SelectContent>
        </Select>
    );
};
