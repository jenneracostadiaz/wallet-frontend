import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                try {
                    // Llama a tu API de login
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    });

                    const user = await res.json();

                    // Si la respuesta es exitosa y contiene los datos del usuario
                    if (res.ok && user) {
                        // Lo que retornes aquí se guardará en el token de sesión
                        return user;
                    }

                    // Si las credenciales son inválidas
                    return null;
                } catch (error) {
                    console.error('Error en authorize:', error);
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: '/login', // Redirige a esta página si el usuario necesita iniciar sesión
    },
    callbacks: {
        // Este callback se ejecuta cuando se crea o actualiza un JSON Web Token.
        async jwt({ token, user }) {
            // Si `user` existe (solo en el login), añade sus datos al token.
            // `user` viene de lo que retornaste en `authorize`.
            // Asumimos que tu API devuelve { user: {...}, token: '...' }
            if (user) {
                token.user = user.user; // Guarda los datos del usuario
                token.accessToken = user.token; // Guarda el token de tu API
            }
            return token;
        },
        // Este callback se ejecuta cuando se accede a la sesión.
        async session({ session, token }) {
            // Asigna los datos del token a la sesión para que estén disponibles en el cliente.
            session.user = token.user as any;
            session.accessToken = token.accessToken as string;
            return session;
        },
    },
});
