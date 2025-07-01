'use client';
import { FormTransaction } from '@/components/transactions/FormTransaction';
import {
    Button,
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
} from '@/components/ui';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';

export const CreateTransaction = () => {
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const isMobile = useIsMobile();

    if (!isMobile) {
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
    }

    return (
        <Drawer>
            <DrawerTrigger>
                <Button variant="outline">Create Transaction</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Add New Transaction</DrawerTitle>
                </DrawerHeader>
                <DrawerFooter>
                    <FormTransaction onSuccess={() => setCreateModalOpen(false)} />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
