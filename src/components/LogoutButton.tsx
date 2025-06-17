'use client';

import { signOut } from 'next-auth/react';
import { Button } from "@/components/ui/button"

export function LogoutButton() {
    return (
        <Button variant="default" type="button" onClick={() => signOut({ redirectTo: '/' })}>
            Cerrar Sesión
        </Button>
    );
}
