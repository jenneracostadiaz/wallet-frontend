import { Skeleton } from '@/components/ui';

export const MonthlyReportSkeleton = () => {
    return (
        <section className="grid gap-4">
            <Skeleton className="h-5 w-32 rounded-md" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Skeleton className="h-44 w-full rounded-2xl" />
                <Skeleton className="h-72 w-full rounded-2xl" />
                <Skeleton className="h-72 w-full rounded-2xl lg:col-span-2" />
            </div>
        </section>
    );
};
