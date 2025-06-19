import { auth } from '@/app/api/auth/[...nextauth]/route';
import { LogoutButton } from '@/components/LogoutButton';
import { redirect } from 'next/navigation';

export default async function Home() {
    const session = await auth();

    if (!session) {
        redirect('/login');
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Bienvenido, {session.user?.name}!</p>
            <p>Tu email es: {session.user?.email}</p>
            <LogoutButton />
        </div>
    );
}
