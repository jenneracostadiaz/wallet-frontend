import type { RegisterCredentials } from '@/type/User';
import { signIn } from 'next-auth/react';

export const registerUser = async (userData: RegisterCredentials) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            name: userData.name,
            email: userData.email,
            password: userData.password,
            password_confirmation: userData.passwordConfirmation,
        }),
    });

    const signInResponse = await signIn('credentials', {
        email: userData.email,
        password: userData.password,
        redirect: false,
    });

    if (!signInResponse?.ok) {
        throw new Error(
            signInResponse?.error || 'Registration successful, but automatic login failed. Please log in manually.'
        );
    }

    return signInResponse;
};
