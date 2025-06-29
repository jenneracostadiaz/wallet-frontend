'use client';
import type { Account } from '@/type/Accounts';
import type { Currency } from '@/type/Currencies';
import type { ColumnDef } from '@tanstack/table-core';

export const AccountsColumns: ColumnDef<Account>[] = [
    {
        accessorKey: 'name',
        header: 'Account Name',
    },
    {
        accessorKey: 'type',
        header: 'Account Type',
    },
    {
        accessorKey: 'description',
        header: 'Description',
    },
    {
        accessorKey: 'balance',
        header: 'Balance',
        cell: ({ row, getValue }) => {
            const value = getValue() as number;
            const currency: Currency = row.original.currency;
            return new Intl.NumberFormat('es-PE', {
                style: 'currency',
                currency: currency.code,
            }).format(value);
        },
    },
];
