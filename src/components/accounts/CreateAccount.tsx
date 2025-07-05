'use client';

import { FormAccount } from '@/components/accounts/FormAccount';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui';
import { useState } from 'react';

import type { Currency } from '@/type/Currencies';

interface CreateAccountProps {
    initialCurrencies: { data: Currency[] };
}

export const CreateAccount = ({ initialCurrencies }: CreateAccountProps) => {
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    return (
        <Dialog open={isCreateModalOpen} onOpenChange={setCreateModalOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Create Account</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Account</DialogTitle>
                    <FormAccount onSuccess={() => setCreateModalOpen(false)} initialCurrencies={initialCurrencies} />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
