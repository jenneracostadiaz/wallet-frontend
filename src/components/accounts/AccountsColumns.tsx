'use client';

import { DeleteAccount } from '@/components/accounts/DeleteAccount';
import { EditAccount } from '@/components/accounts/EditAccount';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui';
import { CircleDashed, MoreVertical } from 'lucide-react';

import { AccountsCsvReport } from '@/components/accounts/AccountsCsvReport';
import { AccountsPdfReport } from '@/components/accounts/AccountsPdfReport';
import type { Account } from '@/type/Accounts';
import type { Currency } from '@/type/Currencies';
import type { ColumnDef } from '@tanstack/table-core';

interface AccountsColumnsProps {
    initialCurrencies: { data: Currency[] };
}

export const AccountsColumns = ({ initialCurrencies }: AccountsColumnsProps): ColumnDef<Account>[] => [
    {
        accessorKey: 'name',
        header: 'Account Name',
        cell: ({ row, getValue }) => {
            const value = getValue() as string;
            const color: string = row.original.color;
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
            return new Intl.NumberFormat(navigator.language, {
                style: 'currency',
                currency: currency.code,
            }).format(value);
        },
    },
    {
        accessorKey: 'description',
        header: 'Description',
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const account = row.original;
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
                        <EditAccount account={account} initialCurrencies={initialCurrencies} />
                        <AccountsPdfReport account={account} />
                        <AccountsCsvReport account={account} />
                        <DropdownMenuSeparator />
                        <DeleteAccount account={account} />
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
