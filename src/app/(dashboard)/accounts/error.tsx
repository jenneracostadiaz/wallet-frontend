'use client';

import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Transactions',
        href: '/transactions',
    },
];

export default function AccountsError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <>
            <Header breadcrumbs={breadcrumbs} />
            <section className="px-4 flex flex-col items-center justify-center gap-4 w-full max-w-7xl mx-auto text-center h-[60vh]">
                <div className="p-8 border rounded-lg bg-card text-card-foreground shadow-sm">
                    <h2 className="text-2xl font-bold text-destructive mb-2">Something went wrong!</h2>
                    <p className="text-muted-foreground mb-4">
                        {error.message || 'An unexpected error occurred while fetching accounts.'}
                    </p>
                    <Button onClick={() => reset()}>Try again</Button>
                </div>
            </section>
        </>
    );
}
