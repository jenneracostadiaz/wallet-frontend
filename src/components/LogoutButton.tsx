'use client';

import { signOut } from 'next-auth/react';

export function LogoutButton() {
    return (
        <button type="button" onClick={() => signOut({ redirectTo: '/' })}>
            Cerrar Sesión
        </button>
    );
}
