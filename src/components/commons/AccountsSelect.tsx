import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { useAccountsList, useGetAccounts } from '@/hooks/useAccounts';
import type { Account } from '@/type/Accounts';
import { CircleDashed } from 'lucide-react';

interface AccountsSelectProps {
    value: string;
    onChange: (value: string) => void;
}
export const AccountsSelect = ({ value, onChange }: AccountsSelectProps) => {
    const { data, isLoading, isError } = useGetAccounts();
    const accounts = data?.data || [];
    const accountIdExists = accounts.some((a: Account) => String(a.id) === String(value));
    console.log(value, accounts, accountIdExists);

    return (
        <Select
            onValueChange={val => onChange(val === 'none' ? '' : val)}
            value={accountIdExists ? value : ''}
            disabled={isLoading || isError}
        >
            <SelectTrigger className="w-full">
                <SelectValue
                    placeholder={isLoading ? 'Loading...' : isError ? 'Error loading accounts' : 'Select account'}
                />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="none">No Account</SelectItem>
                {!isLoading &&
                    !isError &&
                    accounts.map((account: Account) => (
                        <SelectItem key={account.id} value={String(account.id)}>
                            <CircleDashed style={{ color: account.color }} />
                            {account.name}
                        </SelectItem>
                    ))}
            </SelectContent>
        </Select>
    );
};
