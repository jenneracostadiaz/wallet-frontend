'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        if (password !== passwordConfirmation) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    password_confirmation: passwordConfirmation,
                }),
            });

            const signInResponse = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (signInResponse?.ok) {
                router.push('/');
            } else {
                setError(
                    signInResponse?.error ||
                        'Registro exitoso, pero el inicio de sesión automático falló. Por favor, inicie sesión manualmente.'
                );
                router.push('/login');
            }
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        } catch (err: any) {
            console.log('Error en el registro o inicio de sesión:', err);
            setError(err.message);
        }
    };

    return (
        <div>
            <h1>Registro</h1>
            <form onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nombre" required />
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    required
                />
                <input
                    type="password"
                    value={passwordConfirmation}
                    onChange={e => setPasswordConfirmation(e.target.value)}
                    placeholder="Confirmar Contraseña"
                    required
                />
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
}
