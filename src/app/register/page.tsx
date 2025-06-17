'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        if (password !== passwordConfirmation) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
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

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Error al registrar');
            }

            // Registro exitoso, ahora intentar iniciar sesión automáticamente
            const signInResponse = await signIn('credentials', {
                email,
                password,
                redirect: false, // Para manejar la redirección manualmente
            });

            if (signInResponse?.ok) {
                // Changed to optional chain
                router.push('/dashboard'); // Redirigir al dashboard si el inicio de sesión es exitoso
            } else {
                // Si el inicio de sesión automático falla, mostrar un error.
                // El usuario ya está registrado, pero necesitará iniciar sesión manualmente.
                setError(
                    signInResponse?.error ||
                        'Registro exitoso, pero el inicio de sesión automático falló. Por favor, inicie sesión manualmente.'
                );
                // Opcionalmente, redirigir a la p��gina de login si se prefiere:
                // router.push('/login');
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
