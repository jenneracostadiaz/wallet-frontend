'use client';
import type { Account } from '@/type/Accounts';
import type { ColumnDef } from '@tanstack/table-core';

export const AccountsColumns: ColumnDef<Account>[] = [
    {
        accessorKey: 'name',
        header: 'Account Name',
    },
];
