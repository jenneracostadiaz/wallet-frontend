'use client';

import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ErrorMessage } from '@/components/ui/error-message';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Categories',
        href: '/categories',
    },
];

export default function CategoriesError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <>
            <Header breadcrumbs={breadcrumbs} />
            <section className="px-4 flex flex-col items-center justify-center gap-4 w-full max-w-lg mx-auto h-[60vh]">
                <ErrorMessage
                    title="Something went wrong!"
                    message={error?.message || 'An unexpected error occurred while fetching categories.'}
                />
                <Button variant="outline" onClick={() => reset()}>
                    Try again
                </Button>
            </section>
        </>
    );
}
