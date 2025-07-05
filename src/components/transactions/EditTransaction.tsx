'use client';

import { FormTransaction } from '@/components/transactions/FormTransaction';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    DropdownMenuItem,
} from '@/components/ui';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';

import type { Account } from '@/type/Accounts';
import type { Category } from '@/type/Categories';
import type { Transaction } from '@/type/Transactions';

interface EditTransactionProps {
    transaction: Transaction;
    initialCategories: { data: Category[] };
    initialAccounts: { data: Account[] };
}

export const EditTransaction = ({ transaction, initialCategories, initialAccounts }: EditTransactionProps) => {
    const [open, setOpen] = useState(false);
    const isMobile = useIsMobile();

    if (!isMobile) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={e => e.preventDefault()}>Edit</DropdownMenuItem>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Transaction</DialogTitle>
                        <FormTransaction
                            transaction={transaction}
                            onSuccess={() => setOpen(false)}
                            initialCategories={initialCategories}
                            initialAccounts={initialAccounts}
                        />
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer>
            <DrawerTrigger className="text-sm py-1 px-2 w-full text-left">Edit</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Edit Transaction</DrawerTitle>
                </DrawerHeader>
                <DrawerFooter>
                    <FormTransaction
                        transaction={transaction}
                        onSuccess={() => setOpen(false)}
                        initialCategories={initialCategories}
                        initialAccounts={initialAccounts}
                    />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
