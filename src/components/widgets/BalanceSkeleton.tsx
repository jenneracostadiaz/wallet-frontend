
import { Skeleton } from '@/components/ui/skeleton';

export const BalanceSkeleton = () => {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <div className="p-4 border rounded-lg flex flex-col gap-2">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-8 w-3/4" />
            </div>
        </div>
    );
};
