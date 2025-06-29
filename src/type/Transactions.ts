import type { Account } from '@/type/Accounts';
import type { Category } from '@/type/Categories';

export type Transaction = {
    id: string;
    amount: number;
    account: Account;
    category: Category;
    date: Date;
    date_human?: string;
    description?: string;
    type: string;
    to_account?: Account;
};
