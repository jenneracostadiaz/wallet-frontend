export type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at?: boolean;
    avatar?: string;
    accessToken?: string;
};

export type LoginCredentials = {
    email: string;
    password: string;
};

export type RegisterCredentials = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
};

export type AuthResponse = {
    user: User;
    accessToken: string;
    tokenType: string;
    expiresIn: number;
};
