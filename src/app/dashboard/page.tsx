import { auth } from '@/app/api/auth/[...nextauth]/route';
import { LogoutButton } from '@/components/LogoutButton';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
    const session = await auth(); // Obtiene la sesión en el servidor

    if (!session) {
        redirect('/login'); // Doble seguridad, aunque el middleware ya lo hace
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Bienvenido, {session.user?.name}!</p>
            <p>Tu email es: {session.user?.email}</p>
            {/* <p>Tu token de API es: {session.accessToken}</p> */}
            <LogoutButton />
        </div>
    );
}
