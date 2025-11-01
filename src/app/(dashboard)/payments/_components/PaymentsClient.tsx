'use client';

import { CreatePayment } from '@/app/(dashboard)/payments/_components/CreatePayment';
import { PaymentsColum } from '@/app/(dashboard)/payments/_components/PaymentsColum';
import { usePaymentsData } from '@/app/(dashboard)/payments/_lib/hooks';
import type { Payment } from '@/app/(dashboard)/payments/_lib/types';
import { DataTable } from '@/components/DataTable';
import type { Account } from '@/type/Accounts';
import type { Category } from '@/type/Categories';
import type { ColumnDef } from '@tanstack/table-core';

interface PaymentsClientProps {
    initialPayments: { data: Payment[] };
    initialAccounts: { data: Account[] };
    initialCategories: { data: Category[] };
}

export const PaymentsClient = ({ initialPayments, initialAccounts, initialCategories }: PaymentsClientProps) => {
    const { payments } = usePaymentsData({ initialPayments });
    const columns: ColumnDef<Payment>[] = PaymentsColum();

    return (
        <section className="grid gap-12 w-full max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap justify-between items-center gap-4">
                <h1 className="text-2xl font-bold">Payments</h1>
                <div className="flex items-center gap-4">
                    <CreatePayment initialCategories={initialCategories} initialAccounts={initialAccounts} />
                </div>
            </div>
            <div className="overflow-x-auto">
                <DataTable columns={columns} data={payments.data} pageSize={22} />
            </div>
        </section>
    );
};
