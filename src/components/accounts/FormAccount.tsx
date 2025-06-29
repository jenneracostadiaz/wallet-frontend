import { Input, Label } from '@/components/ui';
import { useAccountsMutation } from '@/hooks/useAccounts';
import type { Account } from '@/type/Accounts';
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

interface FormSystemProps {
    account?: Account;
    onSuccess?: () => void;
}

export const FormAccount = ({ account, onSuccess }: FormSystemProps) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [balance, setBalance] = useState(0);
    const [color, setColor] = useState('');
    const [currency_id, setCurrencyId] = useState(0);
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (account) {
            setName(account.name);
            setType(account.type);
            setBalance(account.balance);
            setColor(account.color);
            setCurrencyId(account.currency_id);
            setDescription(account.description);
        }
    }, [account]);

    const { mutate, isPending, error } = useAccountsMutation({
        account,
        onSuccess,
        setName,
        setType,
        setBalance,
        setColor,
        setCurrencyId,
        setDescription,
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        mutate({
            name,
            type,
            balance,
            color,
            currency_id,
            description,
            id: 0,
            order: 0,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="name">Account Name</Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Enter account name"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
            </div>
        </form>
    );
};
