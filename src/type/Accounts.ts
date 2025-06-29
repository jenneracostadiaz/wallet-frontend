import type { Currency } from '@/type/Currencies';

export type Account = {
    id: number;
    name: string;
    type: string;
    balance: number;
    color: string;
    currency_id: number;
    currency?: Currency;
    description: string;
    order: number;
};
