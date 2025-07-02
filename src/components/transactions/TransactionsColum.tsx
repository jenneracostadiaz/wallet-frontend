import { DeleteTransaction } from '@/components/transactions/DeleteTransaction';
import { EditTransaction } from '@/components/transactions/EditTransaction';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui';
import type { Account } from '@/type/Accounts';
import type { Category } from '@/type/Categories';
import type { Currency } from '@/type/Currencies';
import type { Transaction } from '@/type/Transactions';
import type { ColumnDef } from '@tanstack/table-core';
import { ArrowUpDown, CircleDashed, MoreVertical, TrendingDown, TrendingUp } from 'lucide-react';
import type { DateRange } from 'react-day-picker';

export const TransactionsColum: ColumnDef<Transaction>[] = [
    {
        accessorKey: 'category',
        id: 'category_date',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Category & Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const category: Category = row.original.category;
            const date = new Date(row.original.date);
            return (
                <div className="flex flex-col gap-1">
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
                    <span className="text-xs text-muted-foreground">
                        {date.toLocaleDateString()}{' '}
                        {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
            );
        },
        filterFn: (row, _columnId, filterValue) => {
            if (!filterValue) return true;

            if (typeof filterValue === 'string' || typeof filterValue === 'number') {
                const category: Category = row.original.category;
                return String(category.id) === String(filterValue);
            }

            if (filterValue && typeof filterValue === 'object' && ('from' in filterValue || 'to' in filterValue)) {
                const dateRange = filterValue as DateRange;
                const transactionDate = new Date(row.original.date);

                // biome-ignore lint/suspicious/noGlobalIsNan: Valid check for Date validity
                if (isNaN(transactionDate.getTime())) {
                    return true;
                }

                const { from, to } = dateRange;

                const normalizeToLocalDate = (date: Date) => {
                    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
                };

                const normalizedTransactionDate = normalizeToLocalDate(transactionDate);

                if (from && !to) {
                    const normalizedFrom = normalizeToLocalDate(from);
                    return normalizedTransactionDate.getTime() >= normalizedFrom.getTime();
                }

                if (from && to) {
                    const normalizedFrom = normalizeToLocalDate(from);
                    const normalizedTo = normalizeToLocalDate(to);
                    return (
                        normalizedTransactionDate.getTime() >= normalizedFrom.getTime() &&
                        normalizedTransactionDate.getTime() <= normalizedTo.getTime()
                    );
                }
            }

            return true;
        },
        sortingFn: (rowA, rowB) => {
            const dateA = new Date(rowA.original.date).getTime();
            const dateB = new Date(rowB.original.date).getTime();
            return dateA - dateB;
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
                        <span className="text-xs text-muted-foreground flex gap-2">
                            &rarr; <CircleDashed className="size-4" style={{ color: row.original.to_account.color }} />{' '}
                            {row.original.to_account.name}
                        </span>
                    )}
                </span>
            );
        },
        filterFn: (row, _columnId, filterValue) => {
            const account: Account = row.original.account;
            if (!filterValue) return true;
            return String(account.id) === String(filterValue);
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
        filterFn: (row, _columnId, filterValue) => {
            const currency: Currency = row.original.currency;
            if (!filterValue) return true;
            return String(currency.id) === String(filterValue);
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
                        <EditTransaction transaction={transaction} />
                        <DropdownMenuSeparator />
                        <DeleteTransaction transaction={transaction} />
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
