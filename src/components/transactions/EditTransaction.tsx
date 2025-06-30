'use client';

import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    DropdownMenuItem,
} from '@/components/ui';
import { useEffect, useState } from 'react';

function useMediaQuery(media: string) {
    const [matches, setMatches] = useState(() => window.matchMedia(media).matches);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(media);
        const documentChangeHandler = () => setMatches(mediaQueryList.matches);
        mediaQueryList.addEventListener('change', documentChangeHandler);
        return () => mediaQueryList.removeEventListener('change', documentChangeHandler);
    }, [media]);

    return matches;
}

export const EditTransaction = () => {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery('(min-width: 768px)');

    if (isDesktop) {
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
