import { Skeleton } from '@/components/ui/skeleton';

export function TransactionsSkeleton() {
    return (
        <>
            <div className="hidden md:flex items-center gap-2 p-4 border rounded-lg">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-24" />
            </div>

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
        </>
    );
}
