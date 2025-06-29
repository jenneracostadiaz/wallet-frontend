'use client';
import { FormAccount } from '@/components/accounts/FormAccount';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DropdownMenuItem } from '@/components/ui';
import type { Account } from '@/type/Accounts';
import { useState } from 'react';

export const EditAccount = ({ account }: { account: Account }) => {
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    return (
        <Dialog open={isEditModalOpen} onOpenChange={setEditModalOpen}>
            <DialogTrigger asChild>
                <DropdownMenuItem onSelect={e => e.preventDefault()}>Edit</DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-4">Edit Account</DialogTitle>
                    <FormAccount account={account} onSuccess={() => setEditModalOpen(false)} />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
