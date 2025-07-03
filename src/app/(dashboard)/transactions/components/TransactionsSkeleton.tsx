import { Skeleton } from '@/components/ui/skeleton';

export function TransactionsSkeleton() {
    return (
        <>
            <section className="px-4 flex flex-col gap-4 w-full max-w-7xl mx-auto">
                {/* Balance Widget Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg flex flex-col gap-2">
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-8 w-3/4" />
                    </div>
                    <div className="p-4 border rounded-lg flex flex-col gap-2">
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-8 w-3/4" />
                    </div>
                    <div className="p-4 border rounded-lg flex flex-col gap-2">
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-8 w-3/4" />
                    </div>
                </div>

                <div className="flex flex-wrap justify-between items-center gap-4">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-10 w-24" />
                </div>

                {/* Filters Skeleton */}
                <div className="hidden md:flex items-center gap-2 p-4 border rounded-lg">
                    <Skeleton className="h-10 flex-1" />
                    <Skeleton className="h-10 flex-1" />
                    <Skeleton className="h-10 flex-1" />
                    <Skeleton className="h-10 w-24" />
                </div>

                {/* DataTable Skeleton */}
                <div className="border rounded-lg p-4">
                    <div className="space-y-2">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                </div>
            </section>
        </>
    );
}
