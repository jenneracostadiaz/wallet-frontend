import { DeleteCategory } from '@/components/categories/DeleteCategory';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui';
import type { Category } from '@/type/Categories';
import type { ColumnDef } from '@tanstack/table-core';
import { MoreVertical } from 'lucide-react';

export const categoriesColumn: ColumnDef<Category>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row, getValue }) => {
            const value = getValue() as string;
            const icon = row.original.icon;
            return (
                <span className="font-semibold capitalize">
                    {icon} {value}
                </span>
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
                        <DropdownMenuSeparator />
                        <DeleteCategory category={category} />
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
