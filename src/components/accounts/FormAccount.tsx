import {
    Alert,
    AlertDescription,
    AlertTitle,
    Button,
    Input,
    Label,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui';
import { useAccountsMutation } from '@/hooks/useAccounts';
import type { Account } from '@/type/Accounts';
import { Terminal } from 'lucide-react';
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
            setColor(account.color || '');
            setCurrencyId(account.currency_id);
            setDescription(account.description || '');
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
            id: account?.id || 0,
            name,
            type,
            balance,
            color,
            currency_id,
            description,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

                <div className="grid gap-3">
                    <Label htmlFor="type">Account Type</Label>
                    <Select onValueChange={value => setType(value)} value={type}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select account type" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                            <SelectItem value="checking">Checking</SelectItem>
                            <SelectItem value="savings">Savings</SelectItem>
                            <SelectItem value="credit_card">Credit Card</SelectItem>
                            <SelectItem value="cash">Cash</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid gap-3">
                <Label htmlFor="balance">Balance</Label>
                <Input
                    id="balance"
                    type="number"
                    placeholder="Enter account balance"
                    required
                    value={balance}
                    onChange={e => setBalance(Number(e.target.value))}
                />
            </div>

            <div className="grid gap-3">
                <Label htmlFor="color">Color</Label>
                <Input id="color" type="color" required value={color} onChange={e => setColor(e.target.value)} />
            </div>

            <div className="grid gap-3">
                <Label htmlFor="currency_id">Currency ID</Label>
                <Input
                    id="currency_id"
                    type="number"
                    placeholder="Enter currency ID"
                    required
                    value={currency_id}
                    onChange={e => setCurrencyId(Number(e.target.value))}
                />
            </div>

            <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Input
                    id="description"
                    type="text"
                    placeholder="Enter account description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>

            {error && (
                <Alert variant="destructive">
                    <Terminal />
                    <AlertTitle>Error to {account ? 'update' : 'create'} account</AlertTitle>
                    <AlertDescription>{error.message}</AlertDescription>
                </Alert>
            )}

            <div className="grid gap-3">
                <Button type="submit" className="w-full" disabled={isPending} aria-haspopup="dialog">
                    {isPending
                        ? account
                            ? 'Updating...'
                            : 'Creating...'
                        : account
                          ? 'Update Account'
                          : 'Create Account'}
                </Button>
            </div>
        </form>
    );
};
