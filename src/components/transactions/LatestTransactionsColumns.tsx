'use client';
import type { Transaction } from '@/type/Transactions';
import type { ColumnDef } from '@tanstack/table-core';

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
        accessorKey: 'amount',
        header: 'Amount',
    },
    {
        accessorKey: 'description',
        header: 'Description',
    },
];
