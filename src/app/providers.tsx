'use client';
import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';
import {ThemeProvider} from "next-themes";

export function Providers({ children }: { children: ReactNode }) {
    return <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
    >
        <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>;
}
