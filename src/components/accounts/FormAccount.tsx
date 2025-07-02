import { CurrencySelect } from '@/components/commons/CurrencySelect';
import { Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { ErrorMessage } from '@/components/ui/error-message';
import { useAccountsMutation } from '@/hooks/useAccounts';
import type { Account } from '@/type/Accounts';
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

interface FormSystemProps {
    account?: Account;
    onSuccess?: () => void;
}

function getInitialState(account?: Account) {
    return {
        name: account?.name || '',
        type: account?.type || '',
        balance: account?.balance ?? 0,
        color: account?.color || '',
        currency_id: account?.currency_id ?? 0,
        description: account?.description || '',
    };
}

export const FormAccount = ({ account, onSuccess }: FormSystemProps) => {
    const [form, setForm] = useState(() => getInitialState(account));

    useEffect(() => {
        setForm(getInitialState(account));
    }, [account]);

    const { mutate, isPending, error } = useAccountsMutation({
        account,
        onSuccess,
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        mutate({
            id: account?.id || 0,
            ...form,
            currency: {
                id: 0,
                code: '',
                name: '',
                symbol: '',
                decimal_places: 0,
            },
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
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="type">Account Type</Label>
                    <Select onValueChange={value => setForm(f => ({ ...f, type: value }))} value={form.type}>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="grid gap-3">
                    <Label htmlFor="color">Color</Label>
                    <Input
                        id="color"
                        type="color"
                        required
                        value={form.color}
                        onChange={e => setForm(f => ({ ...f, color: e.target.value }))}
                    />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="balance">Balance</Label>
                    <div className="flex gap-2">
                        <CurrencySelect
                            value={form.currency_id.toString()}
                            onChange={value => setForm(f => ({ ...f, currency_id: Number(value) }))}
                        />
                        <Input
                            id="balance"
                            type="number"
                            placeholder="Enter account balance"
                            required
                            value={form.balance}
                            onChange={e => setForm(f => ({ ...f, balance: Number(e.target.value) }))}
                        />
                    </div>
                </div>
            </div>

            <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Input
                    id="description"
                    type="text"
                    placeholder="Enter account description"
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                />
            </div>

            {error && (
                <ErrorMessage title={`Error to ${account ? 'update' : 'create'} account`} message={error.message} />
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
