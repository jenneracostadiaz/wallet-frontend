'use client';

import { ModeToggle } from '@/components/ModeToggle';
import { Alert, AlertDescription, AlertTitle, Button, Input, Label } from '@/components/ui';
import { AlertCircleIcon, GalleryVerticalEnd } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
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
            setError('Passwords do not match');
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
                        'Registration successful, but automatic login failed. Please log in manually.'
                );
                router.push('/login');
            }
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="absolute top-8 right-8">
                <ModeToggle />
            </div>
            <div className="flex flex-col gap-6">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex flex-col items-center gap-2 font-medium">
                                <div className="flex size-8 items-center justify-center rounded-md">
                                    <GalleryVerticalEnd className="size-6" />
                                </div>
                                <span className="sr-only">Wallet App</span>
                            </div>
                            <h1 className="text-xl font-bold">Welcome to Wallet</h1>
                            <div className="text-center text-sm">
                                Already have an account?{' '}
                                <Link href="/login" className="underline underline-offset-4">
                                    Sign in
                                </Link>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Your Name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="passwordConfirmation">Confirm Password</Label>
                                <Input
                                    id="passwordConfirmation"
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={passwordConfirmation}
                                    onChange={e => setPasswordConfirmation(e.target.value)}
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full">
                                Register
                            </Button>
                        </div>

                        {error && (
                            <Alert variant="destructive">
                                <AlertCircleIcon />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    <p>{error}</p>
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>

                    <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                        <span className="bg-background text-muted-foreground relative z-10 px-2">Or</span>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Button variant="outline" type="button" className="w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <title>Apple</title>
                                <path
                                    d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                                    fill="currentColor"
                                />
                            </svg>
                            Continue with Apple
                        </Button>
                        <Button variant="outline" type="button" className="w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <title>Google</title>
                                <path
                                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                    fill="currentColor"
                                />
                            </svg>
                            Continue with Google
                        </Button>
                    </div>
                </form>
                <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                    By clicking continue, you agree to our <Link href="#">Terms of Service</Link> and{' '}
                    <Link href="#">Privacy Policy</Link>.
                </div>
            </div>
        </div>
    );
}
