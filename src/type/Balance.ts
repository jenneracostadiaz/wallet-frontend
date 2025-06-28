import type { Account } from '@/type/Accounts';
import type { Currency } from '@/type/Currencies';

export type TotalBalance = {
    total: number;
    currency: Currency;
};

export type BalanceByCurrency = {
    accounts_count: number;
    total: number;
    currency: Currency;
};

export type Balance = {
    total_balance: TotalBalance;
    balances_by_currency: BalanceByCurrency[];
    accounts_summary: Account[];
};
