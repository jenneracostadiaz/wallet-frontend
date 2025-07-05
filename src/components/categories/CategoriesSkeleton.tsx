'use client';

import { Skeleton } from '@/components/ui';

export const CategoriesSkeleton = () => {
    return (
        <section className="px-4 w-full max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-8 w-24" />
            </div>
            <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
        </section>
    );
};