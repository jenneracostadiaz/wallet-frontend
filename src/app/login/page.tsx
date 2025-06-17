'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                setError('Credenciales inválidas. Por favor, intenta de nuevo.');
            } else {
                router.push('/');
            }
        } catch (err) {
            setError('Ocurrió un error inesperado.');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
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
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
}
