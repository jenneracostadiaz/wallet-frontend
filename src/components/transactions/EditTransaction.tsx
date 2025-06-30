'use client';

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
import { useState } from 'react';

export const EditTransaction = () => {
    const [open, setOpen] = useState(false);
    const isMobile = useIsMobile();

    if (!isMobile) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={e => e.preventDefault()}>Edit</DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Transaction</DialogTitle>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        );
    }
    return (
        <Drawer>
            <DrawerTrigger className="text-sm p-1">Edit</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Edit Transaction</DrawerTitle>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    );
};
