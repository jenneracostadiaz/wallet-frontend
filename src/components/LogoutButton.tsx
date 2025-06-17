'use client';

import { signOut } from 'next-auth/react';

export function LogoutButton() {
    return <button onClick={() => signOut({ callbackUrl: '/' })}>Cerrar Sesión</button>;
}
