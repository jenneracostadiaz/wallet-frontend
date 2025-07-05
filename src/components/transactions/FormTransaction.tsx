import { AccountsSelect } from '@/components/commons/AccountsSelect';
import { CategoriesSelect } from '@/components/commons/CategoriesSelect';
import {
    Button,
    Calendar,
    Input,
    Label,
    Popover,
    PopoverContent,
    PopoverTrigger,
    RadioGroup,
    RadioGroupItem,
} from '@/components/ui';
import { ErrorMessage } from '@/components/ui/error-message';
import { useTransactionForm } from '@/hooks/useTransactionForm';
import { format } from 'date-fns';
import { CalendarIcon, CircleDashed, TrendingDown, TrendingUp } from 'lucide-react';

import type { Account } from '@/type/Accounts';
import type { Category } from '@/type/Categories';
import type { Transaction } from '@/type/Transactions';

interface FormTransactionProps {
    transaction?: Transaction;
    onSuccess?: () => void;
    initialAccounts: { data: Account[] };
    initialCategories: { data: Category[] };
}

export const FormTransaction = ({
    transaction,
    onSuccess,
    initialAccounts,
    initialCategories,
}: FormTransactionProps) => {
    const {
        form,
        isPending,
        error,
        currencySymbol,
        handleInputChange,
        handleAccountChange,
        handleTypeChange,
        handleCategoryChange,
        handleDateChange,
        handleTimeChange,
        handleSubmit,
    } = useTransactionForm(transaction, onSuccess, initialAccounts);

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4">
            <div className="grid gap-3">
                <RadioGroup value={form.type} onValueChange={handleTypeChange} className="grid grid-cols-3 gap-3">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="income" id="income" className="sr-only" />
                        <Label
                            htmlFor="income"
                            className={`flex items-center justify-center gap-2 w-full p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                form.type === 'income'
                                    ? 'border-green-500 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400'
                                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                            }`}
                        >
                            <TrendingUp className="w-4 h-4 hidden md:block" />
                            Income
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="expense" id="expense" className="sr-only" />
                        <Label
                            htmlFor="expense"
                            className={`flex items-center justify-center gap-2 w-full p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                form.type === 'expense'
                                    ? 'border-red-500 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400'
                                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                            }`}
                        >
                            <TrendingDown className="w-4 h-4 hidden md:block" />
                            Expense
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="transfer" id="transfer" className="sr-only" />
                        <Label
                            htmlFor="transfer"
                            className={`flex items-center justify-center gap-2 w-full p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                form.type === 'transfer'
                                    ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400'
                                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                            }`}
                        >
                            <CircleDashed className="w-4 h-4 hidden md:block" />
                            Transfer
                        </Label>
                    </div>
                </RadioGroup>
            </div>

            <div className="flex flex-col lg:flex-row gap-3">
                <div className="flex-1 grid gap-3">
                    <Label htmlFor="accountId">Account</Label>
                    <AccountsSelect
                        value={form.account_id.toString()}
                        onChange={handleAccountChange}
                        initialAccounts={initialAccounts}
                    />
                </div>
                {form.type === 'transfer' && (
                    <>
                        <div className="pt-7 hidden lg:block">&rarr;</div>
                        <div className="flex-1 grid gap-3">
                            <Label htmlFor="toAccountId">To Account</Label>
                            <AccountsSelect
                                value={form.to_account_id.toString()}
                                onChange={value => handleInputChange('to_account_id', Number.parseInt(value))}
                                excludeAccountId={form.account_id || undefined}
                                initialAccounts={initialAccounts}
                            />
                        </div>
                    </>
                )}
            </div>
            <div className="grid gap-3">
                <Label htmlFor="amount">Amount</Label>
                <div className="flex gap-3 items-center">
                    {currencySymbol && <p>{currencySymbol}</p>}
                    <Input
                        type="number"
                        id="amount"
                        value={form.amount}
                        onChange={e => handleInputChange('amount', Number.parseFloat(e.target.value))}
                        required
                    />
                </div>
            </div>

            <div className="grid gap-3">
                <Label htmlFor="categoryId">Category</Label>
                <CategoriesSelect
                    value={form.category_id.toString()}
                    onChange={handleCategoryChange}
                    transactionType={form.type}
                    initialCategories={initialCategories}
                />
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
                                onSelect={handleDateChange}
                            />
                        </PopoverContent>
                    </Popover>
                    <Input
                        type="time"
                        className="w-auto"
                        value={form.date ? format(new Date(form.date), 'HH:mm') : ''}
                        onChange={handleTimeChange}
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
                    onChange={e => handleInputChange('description', e.target.value)}
                />
            </div>

            {error && (
                <ErrorMessage
                    title={`Error to ${transaction ? 'update' : 'create'} transaction`}
                    message={error.message}
                />
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
