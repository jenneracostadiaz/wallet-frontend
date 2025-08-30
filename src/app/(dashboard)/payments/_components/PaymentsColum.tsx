import type { Payment } from '@/app/(dashboard)/payments/_lib/types';
import type { ColumnDef } from '@tanstack/table-core';

export const PaymentsColum = (): ColumnDef<Payment>[] => [
    {
        accessorKey: 'id',
        id: 'id',
    },
    {
        accessorKey: 'name',
        id: 'name',
    },
    {
        accessorKey: 'amount',
        id: 'amount',
    },
];
