'use client';

import { FormPayment } from '@/app/(dashboard)/payments/_components/FormPayment';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui';
import type { Account } from '@/type/Accounts';
import type { Category } from '@/type/Categories';
import { Coins, PlusSquare } from 'lucide-react';
import { useState } from 'react';

interface CreatePaymentProps {
    initialAccounts: { data: Account[] };
    initialCategories: { data: Category[] };
}

export const CreatePayment = ({ initialAccounts, initialCategories }: CreatePaymentProps) => {
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    return (
        <Dialog open={isCreateModalOpen} onOpenChange={setCreateModalOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="justify-between cursor-pointer">
                    <span className="flex gap-1 items-center">
                        <Coins />
                        Create Payment
                    </span>
                    <PlusSquare />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Payment</DialogTitle>
                </DialogHeader>
                <FormPayment
                    onSuccess={() => setCreateModalOpen(false)}
                    initialAccounts={initialAccounts}
                    initialCategories={initialCategories}
                />
            </DialogContent>
        </Dialog>
    );
};
