import { FormCategory } from '@/components/categories/FormCategory';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui';
import type { Category } from '@/type/Categories';
import { useState } from 'react';

export const CreateCategory = ({ initialCategories }: { initialCategories: { data: Category[] } }) => {
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    return (
        <Dialog open={isCreateModalOpen} onOpenChange={setCreateModalOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Create Category</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-3">Add New Category</DialogTitle>
                    <FormCategory onSuccess={() => setCreateModalOpen(false)} initialCategories={initialCategories} />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
