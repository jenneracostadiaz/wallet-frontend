import type { Payment } from '@/app/(dashboard)/payments/_lib/types';
import { Badge, Button } from '@/components/ui';
import type { ColumnDef } from '@tanstack/table-core';
import { ArrowUpDown, BadgeDollarSign, CircleDashed } from 'lucide-react';

export const PaymentsColum = (): ColumnDef<Payment>[] => [
    {
        accessorKey: 'name',
        id: 'name',
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Pago <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const { icon, color, name, next_payment_date } = row.original;
            return (
                <span>
                    <span className="flex items-center gap-2 capitalize">
                        <span style={{ color }}>{icon}</span> {name}
                    </span>
                    {next_payment_date && (
                        <span className="text-xs text-muted-foreground">
                            Próximo:{' '}
                            {new Date(next_payment_date).toLocaleDateString('es-PE', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                            })}
                        </span>
                    )}
                </span>
            );
        },
    },
    {
        accessorKey: 'amount',
        id: 'amount',
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Monto <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const { amount, account, payment_type } = row.original;
            const symbol = account?.currency?.symbol || '';
            let color = 'text-yellow-300';
            if (payment_type === 'debt') color = 'text-pink-400';
            if (payment_type === 'recurring') color = 'text-cyan-300';
            return (
                <span className={`flex items-center gap-2 ${color}`}>
                    <BadgeDollarSign className="size-4" /> {symbol} {amount}
                </span>
            );
        },
    },
    {
        accessorKey: 'category',
        id: 'category',
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Categoría <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const category = row.original.category;
            return (
                <span className="flex items-center gap-2 capitalize">
                    {category?.icon} {category?.name}
                </span>
            );
        },
    },
    {
        accessorKey: 'account',
        id: 'account',
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Cuenta <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const account = row.original.account;
            return (
                <span className="flex items-center gap-2 capitalize">
                    <CircleDashed className="size-4" style={{ color: account?.color }} /> {account?.name}
                </span>
            );
        },
    },
    {
        accessorKey: 'payment_type',
        id: 'payment_type',
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Tipo <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const type = row.original.payment_type;
            const typeMap: Record<string, { label: string; color: string }> = {
                one_time: { label: 'Único', color: 'bg-yellow-300 text-yellow-900' },
                recurring: { label: 'Recurrente', color: 'bg-cyan-300 text-cyan-900' },
                debt: { label: 'Deuda', color: 'bg-pink-400 text-pink-900' },
            };
            const { label, color } = typeMap[type] || { label: type, color: 'bg-muted text-muted-foreground' };
            return (
                <Badge variant="outline" className={`capitalize font-semibold ${color}`}>
                    {label}
                </Badge>
            );
        },
    },
    {
        accessorKey: 'status',
        id: 'status',
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Estado <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const status = row.original.status;
            let color = 'bg-green-500 text-green-900';
            if (status === 'paused') color = 'bg-yellow-500 text-yellow-900';
            if (status === 'inactive') color = 'bg-red-500 text-red-900';
            return (
                <Badge variant="outline" className={`capitalize font-semibold ${color}`}>
                    {status}
                </Badge>
            );
        },
    },
    /*{
        id: 'actions',
        cell: ({ row }) => {
            const payment: Payment = row.original;
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
                        {/!* <EditPayment payment={row.original} /> *!/}
                        <DropdownMenuSeparator />
                        {/!* <DeletePayment payment={row.original} /> *!/}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },*/
];
