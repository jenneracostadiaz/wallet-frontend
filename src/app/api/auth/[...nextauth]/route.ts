import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const {
    handlers: { GET, POST },
    auth,
} = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                });
                const data = await res.json();

                if (res.ok && data && data.user && data.access_token) {
                    // Unificamos el objeto user y el token para retornarlo a NextAuth
                    return {
                        id: data.user.id,
                        name: data.user.name,
                        email: data.user.email,
                        accessToken: data.access_token,
                    };
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: '/login',
        newUser: '/register',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                // @ts-ignore
                token.accessToken = user.accessToken;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                // @ts-ignore
                id: token.id,
                // @ts-ignore
                name: token.name,
                // @ts-ignore
                email: token.email,
            };
            // @ts-ignore
            session.accessToken = token.accessToken;
            return session;
        },
    },
});
