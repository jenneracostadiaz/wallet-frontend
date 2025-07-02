'use client';
import { FormTransaction } from '@/components/transactions/FormTransaction';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui';
import { useState } from 'react';

export const CreateTransaction = () => {
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

    return (
        <Dialog open={isCreateModalOpen} onOpenChange={setCreateModalOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Create Transaction</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Transaction</DialogTitle>
                    <FormTransaction onSuccess={() => setCreateModalOpen(false)} />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
