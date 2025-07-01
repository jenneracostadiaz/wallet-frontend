import { CategoriesSelect } from '@/components/commons/CategoriesSelect';
import {
    Alert,
    AlertDescription,
    AlertTitle,
    Button,
    Input,
    Label,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui';
import { useCategoryMutation } from '@/hooks/useCategories';
import type { Category } from '@/type/Categories';
import { CircleDashed, Terminal, TrendingDown, TrendingUp } from 'lucide-react';
import { type FormEvent, useEffect, useState } from 'react';

const getInitialState = (category?: Category) => {
    return {
        name: category?.name || '',
        type: category?.type || 'expense',
        icon: category?.icon || '',
        parent_id: category?.parent_id || null,
    };
};

interface FormCategoryProps {
    category?: Category;
    onSuccess: () => void;
}

export const FormCategory = ({ category, onSuccess }: FormCategoryProps) => {
    const [form, setForm] = useState(() => getInitialState(category));

    useEffect(() => {
        setForm(getInitialState(category));
    }, [category]);

    const { mutate, isPending, error } = useCategoryMutation({ category, onSuccess });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        mutate({
            id: category?.id || 0,
            ...form,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid md:grid-cols-5 gap-3">
                <div className="grid gap-3">
                    <Label htmlFor="icon">Icon</Label>
                    <Input
                        id="icon"
                        type="text"
                        placeholder="Enter icon class name"
                        value={form.icon}
                        onChange={e => setForm(f => ({ ...f, icon: e.target.value }))}
                    />
                </div>

                <div className="grid gap-3 md:col-span-4">
                    <Label htmlFor="name">Account Name</Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Enter account name"
                        required
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    />
                </div>
                <p className="text-muted-foreground text-xs md:col-span-5">
                    Tip: Use <kbd>Win + .</kbd> or <kbd>Cmd + Ctrl + Space</kbd> to open the emoji picker and choose an
                    icon for your category.
                </p>
            </div>

            <div className="grid gap-3">
                <Label htmlFor="type">Type</Label>
                <Select
                    value={form.type}
                    onValueChange={value => setForm(f => ({ ...f, type: value as 'income' | 'expense' }))}
                >
                    <SelectTrigger id="type" className="w-full">
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="expense">
                            Expense <TrendingDown className="text-red-400" />
                        </SelectItem>
                        <SelectItem value="income">
                            Income <TrendingUp className="text-green-400" />
                        </SelectItem>
                        <SelectItem value="transfer">
                            Transfer <CircleDashed className="text-blue-400" />
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid gap-3">
                <Label htmlFor="parent_id">Parent Category</Label>
                <CategoriesSelect
                    value={form.parent_id?.toString() ?? ''}
                    onChange={value => setForm(f => ({ ...f, parent_id: value ? Number(value) : null }))}
                    category={category}
                />
            </div>

            {error && (
                <Alert variant="destructive">
                    <Terminal />
                    <AlertTitle>Error to {category ? 'update' : 'create'} category</AlertTitle>
                    <AlertDescription>{error.message}</AlertDescription>
                </Alert>
            )}

            <div className="grid gap-3">
                <Button type="submit" className="w-full" disabled={isPending} aria-haspopup="dialog">
                    {isPending
                        ? category
                            ? 'Updating...'
                            : 'Creating...'
                        : category
                          ? 'Update Category'
                          : 'Create Category'}
                </Button>
            </div>
        </form>
    );
};
