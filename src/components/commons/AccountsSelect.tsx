import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { useAccountsData } from '@/hooks/useAccounts';
import type { Account } from '@/type/Accounts';
import { CircleDashed } from 'lucide-react';

interface AccountsSelectProps {
    value: string;
    onChange: (value: string) => void;
    excludeAccountId?: number;
    initialAccounts: { data: Account[] };
}

export const AccountsSelect = ({ value, onChange, excludeAccountId, initialAccounts }: AccountsSelectProps) => {
    const accounts: { data: Account[] } = useAccountsData({ initialAccounts });

    const numericValue = Number(value);
    const isValidValue = !Number.isNaN(numericValue) && numericValue > 0;

    const accountIdExists =
        accounts.data.length > 0
            ? isValidValue && accounts.data.some((a: Account) => a.id === numericValue)
            : isValidValue;

    const selectValue = isValidValue && (accounts.data.length === 0 || accountIdExists) ? value : '';

    const filteredAccounts: Account[] = excludeAccountId
        ? accounts.data.filter((account: Account) => account.id !== excludeAccountId)
        : accounts.data;

    return (
        <Select onValueChange={val => onChange(val === 'none' ? '' : val)} value={selectValue}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="none">No Account</SelectItem>
                {filteredAccounts.map((account: Account) => (
                    <SelectItem key={account.id} value={String(account.id)}>
                        <div className="flex items-center gap-2">
                            <CircleDashed style={{ color: account.color }} />
                            {account.name}
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
