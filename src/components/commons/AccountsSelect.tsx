import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { getAccounts } from '@/lib/api';
import type { Account } from '@/type/Accounts';
import { useQuery } from '@tanstack/react-query';
import { CircleDashed } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface AccountsSelectProps {
    value: string;
    onChange: (value: string) => void;
    excludeAccountId?: number;
    initialAccounts: { data: Account[] };
}

export const AccountsSelect = ({ value, onChange, excludeAccountId, initialAccounts }: AccountsSelectProps) => {
    const { data: session } = useSession();
    const token = session?.accessToken || '';

    const { data: accountsData } = useQuery({
        queryKey: ['accounts', token],
        queryFn: () => getAccounts(token),
        initialData: initialAccounts,
        enabled: !!token,
    });

    const accounts = accountsData?.data || [];

    const numericValue = Number(value);
    const isValidValue = !Number.isNaN(numericValue) && numericValue > 0;

    const accountIdExists =
        accounts.length > 0 ? isValidValue && accounts.some((a: Account) => a.id === numericValue) : isValidValue;

    const selectValue = isValidValue && (accounts.length === 0 || accountIdExists) ? value : '';

    const filteredAccounts = excludeAccountId
        ? accounts.filter((account: Account) => account.id !== excludeAccountId)
        : accounts;

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
