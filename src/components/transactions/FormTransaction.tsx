import { AccountsSelect } from '@/components/commons/AccountsSelect';
import { CategoriesSelect } from '@/components/commons/CategoriesSelect';
import {
    Alert,
    AlertDescription,
    AlertTitle,
    Button,
    Calendar,
    Input,
    Label,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui';
import { createEmptyAccount, useAccountsList } from '@/hooks/useAccounts';
import { createEmptyCategory } from '@/hooks/useCategories';
import { createEmptyCurrency } from '@/hooks/useCurrencies';
import { useTransactionMutation } from '@/hooks/useTransactions';
import type { Transaction } from '@/type/Transactions';
import { format } from 'date-fns';
import { CalendarIcon, CircleDashed, Terminal, TrendingDown, TrendingUp } from 'lucide-react';
import { type FormEvent, useEffect, useState } from 'react';

const getInitialState = (transaction?: Transaction) => {
    return {
        date: transaction?.date || new Date(),
        amount: transaction?.amount || 0,
        description: transaction?.description || '',
        account_id: transaction?.account_id || 0,
        to_account_id: transaction?.to_account_id || 0,
        category_id: transaction?.category_id || 0,
        type: transaction?.type || '',
        account: createEmptyAccount(),
        category: createEmptyCategory(),
        currency: createEmptyCurrency(),
    };
};

interface FormTransactionProps {
    transaction?: Transaction;
    onSuccess?: () => void;
}

export const FormTransaction = ({ transaction, onSuccess }: FormTransactionProps) => {
    const [form, setForm] = useState(() => getInitialState(transaction));
    const { accountsList } = useAccountsList();

    useEffect(() => {
        setForm(getInitialState(transaction));
    }, [transaction]);

    const { mutate, isPending, error } = useTransactionMutation({ transaction, onSuccess });

    const selectedAccount = accountsList.find(
        (account: { id: number; currency?: { symbol?: string } }) => account.id === form.account_id
    );
    const currencySymbol = selectedAccount?.currency?.symbol;

    const handleAccountChange = (value: string) => {
        const accountId = value === '0' || value === '' ? 0 : Number.parseInt(value);
        setForm(prev => ({
            ...prev,
            account_id: Number.isNaN(accountId) ? 0 : accountId,
        }));
    };

    const handleCategoryChange = (value: string) => {
        const categoryId = value === '0' || value === '' ? 0 : Number.parseInt(value);
        setForm(prev => ({
            ...prev,
            category_id: Number.isNaN(categoryId) ? 0 : categoryId,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        mutate({
            id: transaction?.id || 0,
            ...form,
            date: form.date ? new Date(form.date) : new Date(),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4">
            <div className="grid lg:grid-cols-2 gap-3">
                <div className="grid gap-3">
                    <Label htmlFor="accountId">Account</Label>
                    <AccountsSelect value={form.account_id.toString()} onChange={handleAccountChange} />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="amount">Amount</Label>
                    <div className="flex gap-3 items-center">
                        <p>{currencySymbol}</p>
                        <Input
                            type="number"
                            id="amount"
                            value={form.amount}
                            onChange={e => setForm({ ...form, amount: Number.parseFloat(e.target.value) })}
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="grid gap-3">
                <Label htmlFor="type">Type</Label>
                <Select value={form.type} onValueChange={value => setForm({ ...form, type: value })} required>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="income">
                            Income <TrendingUp className="text-green-400" />
                        </SelectItem>
                        <SelectItem value="expense">
                            Expense <TrendingDown className="text-red-400" />
                        </SelectItem>
                        <SelectItem value="transfer">
                            Transfer <CircleDashed className="text-blue-400" />
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid gap-3">
                <Label htmlFor="categoryId">Category</Label>
                <CategoriesSelect value={form.category_id.toString()} onChange={handleCategoryChange} />
            </div>

            <div className="grid gap-3">
                <Label htmlFor="date">Date & Time</Label>
                <div className="flex gap-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="flex-1 justify-start text-left" aria-haspopup="dialog">
                                {form.date ? format(new Date(form.date), 'PPP') : 'Select a date'}
                                <CalendarIcon className="w-4 h-4 ml-auto" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={form.date ? new Date(form.date) : undefined}
                                onSelect={date => {
                                    if (date) {
                                        const currentDate = form.date ? new Date(form.date) : new Date();
                                        date.setHours(currentDate.getHours());
                                        date.setMinutes(currentDate.getMinutes());
                                        setForm({ ...form, date });
                                    }
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                    <Input
                        type="time"
                        className="w-auto"
                        value={form.date ? format(new Date(form.date), 'HH:mm') : ''}
                        onChange={e => {
                            if (form.date && e.target.value) {
                                const [hours, minutes] = e.target.value.split(':');
                                const newDate = new Date(form.date);
                                newDate.setHours(Number.parseInt(hours, 10));
                                newDate.setMinutes(Number.parseInt(minutes, 10));
                                setForm({ ...form, date: newDate });
                            }
                        }}
                    />
                </div>
            </div>

            <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Input
                    id="description"
                    type="text"
                    placeholder="Enter description"
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
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
