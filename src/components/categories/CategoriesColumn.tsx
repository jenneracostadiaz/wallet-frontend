import { DeleteCategory } from '@/components/categories/DeleteCategory';
import { EditCategory } from '@/components/categories/EditCategory';
import {
    Badge,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui';
import type { Category } from '@/type/Categories';
import type { ColumnDef } from '@tanstack/table-core';
import { MoreVertical, TrendingDown, TrendingUp } from 'lucide-react';

interface CategoriesColumnProps {
    initialCategories: { data: Category[] };
}

export const CategoriesColumn = ({ initialCategories }: CategoriesColumnProps): ColumnDef<Category>[] => [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row, getValue }) => {
            const value = getValue() as string;
            const icon = row.original.icon;
            const parentId = row.original.parent_id || 0;
            return (
                <span className={`font-semibold capitalize ${parentId ? 'pl-6' : ''}`}>
                    {icon} {value}
                </span>
            );
        },
    },
    {
        accessorKey: 'type',
        header: 'Type',
        cell: ({ getValue }) => {
            const value = getValue() as string;
            return (
                <Badge variant={`${value === 'expense' ? 'default' : 'secondary'}`} className="capitalize">
                    {value}
                    {value === 'expense' && <TrendingDown />}
                    {value === 'income' && <TrendingUp />}
                </Badge>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const category = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex justify-end">
                            <Button
                                variant="ghost"
                                className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                            >
                                <span className="sr-only">Open Menu</span>
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                        <EditCategory category={category} initialCategories={initialCategories} />
                        <DropdownMenuSeparator />
                        <DeleteCategory category={category} />
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
