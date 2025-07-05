'use client';

import { FormAccount } from '@/components/accounts/FormAccount';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DropdownMenuItem } from '@/components/ui';
import { useState } from 'react';

import type { Account } from '@/type/Accounts';
import type { Currency } from '@/type/Currencies';

interface EditAccountProps {
    account: Account;
    initialCurrencies: { data: Currency[] };
}

export const EditAccount = ({ account, initialCurrencies }: EditAccountProps) => {
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    return (
        <Dialog open={isEditModalOpen} onOpenChange={setEditModalOpen}>
            <DialogTrigger asChild>
                <DropdownMenuItem onSelect={e => e.preventDefault()}>Edit</DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-4">Edit Account</DialogTitle>
                    <FormAccount
                        account={account}
                        onSuccess={() => setEditModalOpen(false)}
                        initialCurrencies={initialCurrencies}
                    />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
