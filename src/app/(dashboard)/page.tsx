import {Header} from "@/components/Header";
import {Balance} from "@/components/widgets";

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
                <Balance />
            </section>
        </>
    );
}