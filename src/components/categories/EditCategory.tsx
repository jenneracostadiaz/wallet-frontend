'use client';
import { FormCategory } from '@/components/categories/FormCategory';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DropdownMenuItem } from '@/components/ui';
import type { Category } from '@/type/Categories';
import { useState } from 'react';

interface EditCategoryProps {
    category: Category;
    initialCategories: { data: Category[] };
}

export const EditCategory = ({ category, initialCategories }: EditCategoryProps) => {
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    return (
        <Dialog open={isEditModalOpen} onOpenChange={setEditModalOpen}>
            <DialogTrigger asChild>
                <DropdownMenuItem onSelect={e => e.preventDefault()}>Edit</DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-4">Edit Category</DialogTitle>
                    <FormCategory
                        category={category}
                        onSuccess={() => setEditModalOpen(false)}
                        initialCategories={initialCategories}
                    />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
