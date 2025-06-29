import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        accessToken?: string;
        user?: {
            id: number;
            name: string;
            email: string;
        } & DefaultSession['user'];
    }
}
