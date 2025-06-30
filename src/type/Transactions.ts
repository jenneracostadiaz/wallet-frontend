import type { Account } from '@/type/Accounts';
import type { Category } from '@/type/Categories';
import type { Currency } from '@/type/Currencies';

export type Transaction = {
    id: string;
    amount: number;
    account: Account;
    category: Category;
    currency: Currency;
    date: Date;
    date_human?: string;
    description?: string;
    type: string;
    to_account?: Account;
};
