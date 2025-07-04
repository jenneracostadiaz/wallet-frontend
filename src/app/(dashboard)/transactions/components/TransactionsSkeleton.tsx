import { BalanceSkeleton } from '@/components/balance';
import { LatestTransactionsSkeleton } from '@/components/latest-transactions/LatestTransactionsSkeleton';
import { Skeleton } from '@/components/ui';

export function TransactionsSkeleton() {
    return (
        <div className="grid gap-12 w-11/12 max-w-7xl mx-auto">
            <BalanceSkeleton />
            <div className="grid gap-4">
                <div className="flex flex-wrap justify-between items-center gap-4">
                    <Skeleton className="w-48 h-10" />
                    <Skeleton className="w-48 h-10 hidden lg:block" />
                </div>
                <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                    <Skeleton className="w-full h-8" />
                    <Skeleton className="w-full h-8" />
                    <Skeleton className="w-full h-8" />
                    <Skeleton className="w-full h-8" />
                    <Skeleton className="w-full h-8" />
                    <Skeleton className="w-full h-8" />
                    <Skeleton className="w-full h-8 lg:col-span-2" />
                </div>
                <LatestTransactionsSkeleton />
            </div>
        </div>
    );
}
