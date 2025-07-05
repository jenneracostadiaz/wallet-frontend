import { Skeleton } from '@/components/ui';

export const AccountsSkeleton = () => {
    return (
        <main className="grid gap-12 w-11/12 max-w-7xl mx-auto">
            <div className="flex justify-between">
                <Skeleton className="w-48 h-8" />
                <Skeleton className="w-30 h-8" />
            </div>
            <div className="grid lg:grid-cols-4 gap-4">
                <Skeleton className="w-full h-10 mx-auto" />
                <Skeleton className="w-full h-10 mx-auto" />
                <Skeleton className="w-full h-10 mx-auto" />
                <Skeleton className="w-full h-10 mx-auto" />
                <Skeleton className="w-full h-6 mx-auto hidden lg:block" />
                <Skeleton className="w-full h-6 mx-auto hidden lg:block" />
                <Skeleton className="w-full h-6 mx-auto hidden lg:block" />
                <Skeleton className="w-full h-6 mx-auto hidden lg:block" />
                <Skeleton className="w-full h-6 mx-auto hidden lg:block" />
                <Skeleton className="w-full h-6 mx-auto hidden lg:block" />
                <Skeleton className="w-full h-6 mx-auto hidden lg:block" />
                <Skeleton className="w-full h-6 mx-auto hidden lg:block" />
                <Skeleton className="w-full h-6 mx-auto hidden lg:block" />
                <Skeleton className="w-full h-6 mx-auto hidden lg:block" />
                <Skeleton className="w-full h-6 mx-auto hidden lg:block" />
                <Skeleton className="w-full h-6 mx-auto hidden lg:block" />
            </div>
        </main>
    );
};
