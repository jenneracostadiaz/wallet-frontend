'use client';
import { FormTransaction } from '@/components/transactions/FormTransaction';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui';
import { useState } from 'react';

import type { Account } from '@/type/Accounts';
import type { Category } from '@/type/Categories';

interface CreateTransactionProps {
    initialAccounts: { data: Account[] };
    initialCategories: { data: Category[] };
}

export const CreateTransaction = ({ initialAccounts, initialCategories }: CreateTransactionProps) => {
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

    return (
        <Dialog open={isCreateModalOpen} onOpenChange={setCreateModalOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Create Transaction</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Transaction</DialogTitle>
                    <FormTransaction
                        onSuccess={() => setCreateModalOpen(false)}
                        initialAccounts={initialAccounts}
                        initialCategories={initialCategories}
                    />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
