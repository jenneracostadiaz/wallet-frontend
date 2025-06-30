import { DeleteTransaction } from '@/components/transactions/DeleteTransaction';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui';
import type { Account } from '@/type/Accounts';
import type { Category } from '@/type/Categories';
import type { Currency } from '@/type/Currencies';
import type { Transaction } from '@/type/Transactions';
import type { ColumnDef } from '@tanstack/table-core';
import { ArrowUpDown, CircleDashed, MoreVertical, TrendingDown, TrendingUp } from 'lucide-react';

export const TransactionsColum: ColumnDef<Transaction>[] = [
    {
        accessorKey: 'category',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Category
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const date = new Date(row.original.date);
            const category: Category = row.original.category;
            return (
                <span className="flex flex-col gap-1">
                    <span className="font-semibold capitalize">
                        {category.parent ? (
                            <>
                                {category.parent.icon} {category.parent.name} &rarr; {category.icon} {category.name}
                            </>
                        ) : (
                            <>
                                {category.icon} {category.name}
                            </>
                        )}
                    </span>
                    <span className="text-muted-foreground text-xs">
                        Date: {date.toLocaleDateString()} - Time:{' '}
                        {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </span>
            );
        },
    },
    {
        accessorKey: 'account',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Account
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const account: Account = row.original.account;
            return (
                <span className="flex items-center gap-2 capitalize">
                    <CircleDashed className="size-4" style={{ color: account.color }} /> {account.name}
                    {row.original.to_account && (
                        <span className="text-xs text-muted-foreground">
                            &rarr; <CircleDashed className="size-4" style={{ color: account.color }} />{' '}
                            {row.original.to_account.name}
                        </span>
                    )}
                </span>
            );
        },
    },
    {
        accessorKey: 'amount',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Amount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const type = row.original.type;
            const currency: Currency = row.original.currency;
            const amount: number = row.getValue('amount');
            return (
                <span className="flex items-center gap-2">
                    {type === 'income' && <TrendingUp className="size-4 text-green-400" />}
                    {type === 'expense' && <TrendingDown className="size-4 text-red-400" />}
                    {type === 'transfer' && <CircleDashed className="size-4 text-blue-400" />}
                    {new Intl.NumberFormat(navigator.language, { style: 'currency', currency: currency.code }).format(
                        amount
                    )}
                </span>
            );
        },
    },
    {
        accessorKey: 'description',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Description
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const transaction: Transaction = row.original;
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
                        <DeleteTransaction transaction={transaction} />
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
