import { AccountsSelect } from '@/components/commons/AccountsSelect';
import { CategoriesSelect } from '@/components/commons/CategoriesSelect';
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
import { useTransactionMutation } from '@/hooks/useTransactions';
import type { Transaction } from '@/type/Transactions';
import { Terminal } from 'lucide-react';
import { type FormEvent, useEffect, useState } from 'react';

const getInitialState = (transaction?: Transaction) => {
    return {
        date: transaction?.date || '',
        amount: transaction?.amount || 0,
        description: transaction?.description || '',
        account_id: transaction?.account_id || 0,
        to_account_id: transaction?.to_account_id || 0,
        category_id: transaction?.category_id || 0,
        type: transaction?.type || '',
    };
};

interface FormTransactionProps {
    transaction?: Transaction;
    onSuccess?: () => void;
}

export const FormTransaction = ({ transaction, onSuccess }: FormTransactionProps) => {
    const [form, setForm] = useState(() => getInitialState(transaction));

    useEffect(() => {
        setForm(getInitialState(transaction));
    }, [transaction]);

    const { mutate, isPending, error } = useTransactionMutation({ transaction, onSuccess });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        mutate({
            id: transaction?.id || 0,
            ...form,
            date: typeof form.date === 'string' ? new Date(form.date) : form.date,
            account: {
                id: 0,
                name: '',
                type: '',
                balance: 0,
                color: '',
                currency_id: 0,
                currency: {
                    id: 0,
                    code: '',
                    name: '',
                    symbol: '',
                    decimal_places: 0,
                },
                description: undefined,
                order: undefined,
            },
            category: {
                id: 0,
                name: '',
                type: 'income',
                icon: '',
                subcategories: undefined,
                parent: undefined,
                parent_id: undefined,
            },
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4">
            <div className="grid gap-3">
                <Label htmlFor="accountId">Account</Label>
                <AccountsSelect
                    value={form.account_id.toString()}
                    onChange={value => setForm({ ...form, account_id: Number.parseInt(value) })}
                />
            </div>

            <div className="grid gap-3">
                <Label htmlFor="type">Type</Label>
                <Select value={form.type} onValueChange={value => setForm({ ...form, type: value })} required>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                        <SelectItem value="transfer">Transfer</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid gap-3">
                <Label htmlFor="amount">Amount</Label>
                <div className="flex gap-3 items-center">
                    <p>$/.</p>
                    <Input
                        type="number"
                        id="amount"
                        value={form.amount}
                        onChange={e => setForm({ ...form, amount: Number.parseFloat(e.target.value) })}
                        required
                    />
                </div>
            </div>

            <div className="grid gap-3">
                <Label htmlFor="accountId">Category</Label>
                <CategoriesSelect
                    value={form.category_id.toString()}
                    onChange={value => setForm({ ...form, category_id: Number.parseInt(value) })}
                />
            </div>

            {error && (
                <Alert variant="destructive">
                    <Terminal />
                    <AlertTitle>Error to {transaction ? 'update' : 'create'} transaction</AlertTitle>
                    <AlertDescription>{error.message}</AlertDescription>
                </Alert>
            )}

            <div className="grid gap-3">
                <Button type="submit" className="w-full" disabled={isPending} aria-haspopup="dialog">
                    {isPending
                        ? transaction
                            ? 'Updating...'
                            : 'Creating...'
                        : transaction
                          ? 'Update Transaction'
                          : 'Create Transaction'}
                </Button>
            </div>
        </form>
    );
};
