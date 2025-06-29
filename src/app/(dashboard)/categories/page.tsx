import { Header } from '@/components/Header';

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

export default function CategoriesPage() {
    return (
        <>
            <Header breadcrumbs={breadcrumbs} />
            <section className="px-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Categories</h1>
                </div>
            </section>
        </>
    );
}
