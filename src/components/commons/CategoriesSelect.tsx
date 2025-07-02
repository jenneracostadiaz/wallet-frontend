import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui';
import { useGetParentCategories } from '@/hooks/useCategories';
import type { Category } from '@/type/Categories';

interface CategoriesSelectProps {
    value: string;
    onChange: (value: string) => void;
    category?: Category;
    transactionType?: string;
}

export const CategoriesSelect = ({ value, onChange, category, transactionType }: CategoriesSelectProps) => {
    const { parentCategories, isLoading, isError } = useGetParentCategories({ category, transactionType });
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
                {!isLoading &&
                    !isError &&
                    parentCategories?.map((category: Category) =>
                        category.subcategories && category.subcategories.length > 0 ? (
                            <SelectGroup key={category.id}>
                                <SelectLabel className="capitalize">
                                    {category.icon} {category.name}
                                </SelectLabel>
                                {category.subcategories?.map((subcategory: Category) => (
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
                            <SelectItem
                                key={category.id}
                                value={String(category.id)}
                                className="flex items-center gap-2 capitalize"
                            >
                                {category.icon} {category.name}
                            </SelectItem>
                        )
                    )}
            </SelectContent>
        </Select>
    );
};
