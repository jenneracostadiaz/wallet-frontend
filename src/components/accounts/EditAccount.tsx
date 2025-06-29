'use client';
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
                    <DialogTitle>Edit Account</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
