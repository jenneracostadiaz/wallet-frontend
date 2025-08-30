'use client';

import { PaymentsColum } from '@/app/(dashboard)/payments/_components/PaymentsColum';
import { usePaymentsData } from '@/app/(dashboard)/payments/_lib/hooks';
import type { Payment } from '@/app/(dashboard)/payments/_lib/types';
import { DataTable } from '@/components/DataTable';
import type { ColumnDef } from '@tanstack/table-core';

interface PaymentsClientProps {
    initialPayments: { data: Payment[] };
}

export const PaymentsClient = ({ initialPayments }: PaymentsClientProps) => {
    const { payments } = usePaymentsData({ initialPayments });
    const columns: ColumnDef<Payment>[] = PaymentsColum();

    return (
        <section className="grid gap-12 w-full max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap justify-between items-center gap-4">
                <h1 className="text-2xl font-bold">Payments</h1>
            </div>
            <div className="overflow-x-auto">
                <DataTable columns={columns} data={payments.data} pageSize={22} />
            </div>
        </section>
    );
};
