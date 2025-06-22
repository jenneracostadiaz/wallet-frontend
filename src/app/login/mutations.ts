import type { LoginCredentials } from '@/type/User';
import { signIn } from 'next-auth/react';

export const loginUser = async ({ email, password }: LoginCredentials) => {
    const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
    });

    if (result?.error) {
        throw new Error('Invalid credentials. Please try again.');
    }

    return result;
};
