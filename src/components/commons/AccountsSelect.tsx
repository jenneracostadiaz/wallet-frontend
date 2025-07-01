import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { useGetAccounts } from '@/hooks/useAccounts';
import type { Account } from '@/type/Accounts';
import { CircleDashed } from 'lucide-react';

interface AccountsSelectProps {
    value: string;
    onChange: (value: string) => void;
}

export const AccountsSelect = ({ value, onChange }: AccountsSelectProps) => {
    const { data, isLoading, isError } = useGetAccounts();
    const accounts = data?.data || [];

    const numericValue = Number(value);
    const isValidValue = !Number.isNaN(numericValue) && numericValue > 0;

    const accountIdExists =
        accounts.length > 0 ? isValidValue && accounts.some((a: Account) => a.id === numericValue) : isValidValue; // If accounts aren't loaded yet, trust the value if it's valid

    const selectValue = isValidValue && (accounts.length === 0 || accountIdExists) ? value : '';

    const handleValueChange = (val: string) => {
        if (val === 'none') {
            onChange('0');
        } else {
            onChange(val);
        }
    };

    return (
        <Select onValueChange={handleValueChange} value={selectValue} disabled={isLoading || isError}>
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
