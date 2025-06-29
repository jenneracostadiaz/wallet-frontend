'use client';
import { FormAccount } from '@/components/accounts/FormAccount';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui';
import { useState } from 'react';

export const CreateAccount = () => {
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    return (
        <Dialog open={isCreateModalOpen} onOpenChange={setCreateModalOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Create Account</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Account</DialogTitle>
                    <FormAccount onSuccess={() => setCreateModalOpen(false)} />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
