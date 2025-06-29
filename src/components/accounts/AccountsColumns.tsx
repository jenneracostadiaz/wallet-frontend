'use client';
import type { Account } from '@/type/Accounts';
import type { Currency } from '@/type/Currencies';
import type { ColumnDef } from '@tanstack/table-core';
import { CircleDashed } from 'lucide-react';

export const AccountsColumns: ColumnDef<Account>[] = [
    {
        accessorKey: 'name',
        header: 'Account Name',
        cell: ({ row, getValue }) => {
            const value = getValue() as string;
            const color: string = row.original.color;
            console.log(color);
            return (
                <span className="flex flex-col">
                    <span className="font-semibold capitalize flex items-center gap-1">
                        <CircleDashed className="size-4" style={{ color: color }} /> {value}
                    </span>
                    <span>
                        <span className="text-xs text-muted-foreground">{row.original.type}</span>
                    </span>
                </span>
            );
        },
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
    {
        accessorKey: 'description',
        header: 'Description',
    },
];
