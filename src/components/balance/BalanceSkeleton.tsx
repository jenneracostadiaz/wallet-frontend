import { Skeleton } from '@/components/ui/skeleton';

export const BalanceSkeleton = () => {
    return (
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <section className="lg:col-span-4 flex w-max space-x-4">
                <Skeleton className="h-5 w-32 rounded-md" />
                <Skeleton className="h-5 w-32 rounded-md" />
            </section>
            <Skeleton className="h-52 w-full rounded-2xl" />
            <section className="lg:col-span-3 grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4">
                <Skeleton className="h-24 w-full rounded-2xl" />
                <Skeleton className="h-24 w-full rounded-2xl" />
                <Skeleton className="h-24 w-full rounded-2xl hidden lg:block" />
                <Skeleton className="h-24 w-full rounded-2xl hidden lg:block" />
                <Skeleton className="h-24 w-full rounded-2xl hidden lg:block" />
                <Skeleton className="h-24 w-full rounded-2xl hidden lg:block" />
                <Skeleton className="h-24 w-full rounded-2xl hidden lg:block" />
            </section>
        </section>
    );
};
