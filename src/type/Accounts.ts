import type { Currency } from '@/type/Currencies';

export type Account = {
    id: number;
    name: string;
    type: string;
    description: string;
    color: string;
    balance: number;
    currency: Currency;
};
