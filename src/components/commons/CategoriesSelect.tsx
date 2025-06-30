import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { useGetParentCategories } from '@/hooks/useCategories';
import type { Category } from '@/type/Categories';

interface CategoriesSelectProps {
    value: string;
    onChange: (value: string) => void;
    category?: Category;
}

export const CategoriesSelect = ({ value, onChange, category }: CategoriesSelectProps) => {
    const { parentCategories, isLoading, isError } = useGetParentCategories({ category });
    const categoryIdExists = parentCategories?.some((c: Category) => String(c.id) === String(value));
    console.log(value);

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
