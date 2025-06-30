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
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    DropdownMenuItem,
} from '@/components/ui';
import { useIsMobile } from '@/hooks/use-mobile';
import type { Transaction } from '@/type/Transactions';
import { useState } from 'react';

export const EditTransaction = ({ transaction }: { transaction: Transaction }) => {
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
                        <FormTransaction transaction={transaction} onSuccess={() => setOpen(false)} />
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
                    <FormTransaction transaction={transaction} onSuccess={() => setOpen(false)} />
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    );
};
