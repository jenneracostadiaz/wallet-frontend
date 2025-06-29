'use client';
import type { Account } from '@/type/Accounts';
import type { Category } from '@/type/Categories';
import type { Transaction } from '@/type/Transactions';
import type { ColumnDef } from '@tanstack/table-core';
import { CircleDashed, TrendingDown, TrendingUp } from 'lucide-react';

export const LatestTransactionsColumns: ColumnDef<Transaction>[] = [
    {
        accessorKey: 'date',
        header: 'Transaction',
        cell: ({ row }) => {
            const date = new Date(row.getValue('date'));
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
        header: 'Account',
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
        accessorKey: 'totalAmount',
        header: 'Amount',
        cell: ({ row }) => {
            const type = row.original.type;
            const amount = row.getValue('totalAmount');
            return (
                <span className="flex items-center gap-2">
                    {type === 'income' && <TrendingUp className="size-4 text-green-400" />}
                    {type === 'expense' && <TrendingDown className="size-4 text-red-400" />}
                    {type === 'transfer' && <CircleDashed className="size-4 text-blue-400" />}
                    {String(amount)}
                </span>
            );
        },
    },
    {
        accessorKey: 'description',
        header: 'Description',
    },
];
