export { auth as middleware } from '@/app/api/auth/[...nextauth]/route';

// Aplica el middleware de Auth.js a las rutas que coincidan
export const config = {
    matcher: ['/dashboard/:path*', '/profile'],
};
