import type { Account } from '@/type/Accounts';
import type { Category } from '@/type/Categories';
import type { Currency } from '@/type/Currencies';

export type Transaction = {
    id: number;
    amount: number;
    account_id: number;
    account: Account;
    category_id: number;
    category: Category;
    currency: Currency;
    date: Date;
    date_human?: string;
    description?: string;
    type: string;
    to_account_id?: number;
    to_account?: Account;
};
