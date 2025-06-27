import {Header} from "@/components/Header";

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/'
    }
];

export default function Home() {
    return (
        <>
            <Header breadcrumbs={breadcrumbs} />
            <section className="flex flex-col p-4 pt-0">
            </section>
        </>
    );
}