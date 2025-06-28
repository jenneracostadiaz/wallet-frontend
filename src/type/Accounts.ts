import type { Currency } from '@/type/Currencies';

export type Account = {
    name: string;
    type: string;
    description: string;
    color: string;
    balance: number;
    currency: Currency;
};
