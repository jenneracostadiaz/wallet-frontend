'use client';
import type { Transaction } from '@/type/Transactions';
import type { ColumnDef } from '@tanstack/table-core';
import { TrendingDown, TrendingUp } from 'lucide-react';

export const LatestTransactionsColumns: ColumnDef<Transaction>[] = [
    {
        accessorKey: 'date',
        header: 'Date',
        cell: ({ row }) => {
            const date = new Date(row.getValue('date'));
            return <span>{date.toLocaleDateString()}</span>;
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
                    {type === 'income' ? (
                        <TrendingUp color="green" size={16} />
                    ) : (
                        <TrendingDown color="red" size={16} />
                    )}
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
