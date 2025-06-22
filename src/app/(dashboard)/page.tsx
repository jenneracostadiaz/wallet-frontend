'use client';

import { useSession } from 'next-auth/react';

export default function Home() {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h1>Dashboard</h1>
            <p>Bienvenido, {session?.user?.name}!</p>
            <p>Tu email es: {session?.user?.email}</p>
            <p>Tu token de acceso es: {session?.accessToken}</p>
        </>
    );
}
