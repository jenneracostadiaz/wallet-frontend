import { usePaymentForm } from '@/app/(dashboard)/payments/_lib/hooks';
import type { Payment } from '@/app/(dashboard)/payments/_lib/types';
import { AccountsSelect } from '@/components/commons/AccountsSelect';
import { CategoriesSelect } from '@/components/commons/CategoriesSelect';
import { Button, Input, Label, RadioGroup, RadioGroupItem } from '@/components/ui';
import { ErrorMessage } from '@/components/ui/error-message';
import type { Account } from '@/type/Accounts';
import type { Category } from '@/type/Categories';

interface FormPaymentProps {
    payment?: Payment;
    onSuccess?: () => void;
    initialAccounts: { data: Account[] };
    initialCategories: { data: Category[] };
}

export const FormPayment = ({ payment, onSuccess, initialAccounts, initialCategories }: FormPaymentProps) => {
    const {
        form,
        setForm,
        isPending,
        error,
        currencySymbol,
        handlePaymentTypeChange,
        handleInputChange,
        handleAccountChange,
        handleCategoryChange,
        handleSubmit,
    } = usePaymentForm({
        payment,
        onSuccess,
        initialAccounts,
    });

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4">
            <div className="grid gap-3">
                <RadioGroup
                    value={form.payment_type}
                    onValueChange={handlePaymentTypeChange}
                    className="grid grid-cols-3 gap-3"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="recurring" id="recurring" className="sr-only" />
                        <Label
                            htmlFor="recurring"
                            className={`flex items-center justify-center gap-2 w-full p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                form.payment_type === 'recurring'
                                    ? 'border-cyan-500 bg-cyan-300 text-cyan-900 dark:bg-cyan-950 dark:text-cyan-400'
                                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                            }`}
                        >
                            Recurrente
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="one-time" id="one-time" className="sr-only" />
                        <Label
                            htmlFor="one-time"
                            className={`flex items-center justify-center gap-2 w-full p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                form.payment_type === 'one-time'
                                    ? 'border-yellow-500 bg-yellow-300 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-400'
                                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                            }`}
                        >
                            Único
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="debt" id="debt" className="sr-only" />
                        <Label
                            htmlFor="debt"
                            className={`flex items-center justify-center gap-2 w-full p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                form.payment_type === 'debt'
                                    ? 'border-pink-500 bg-pink-400 text-pink-900 dark:bg-pink-950 dark:text-pink-400'
                                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                            }`}
                        >
                            Deuda
                        </Label>
                    </div>
                </RadioGroup>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="accountId">Account</Label>
                    <AccountsSelect
                        value={form.account_id.toString()}
                        onChange={handleAccountChange}
                        initialAccounts={initialAccounts}
                    />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="categoryId">Category</Label>
                    <CategoriesSelect
                        value={form.category_id.toString()}
                        onChange={handleCategoryChange}
                        initialCategories={initialCategories}
                    />
                </div>
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
                <ErrorMessage title={`Error to ${payment ? 'update' : 'create'} payment`} message={error.message} />
            )}

            <div className="grid gap-3">
                <Button type="submit" className="w-full" disabled={isPending} aria-haspopup="dialog">
                    {isPending
                        ? payment
                            ? 'Updating...'
                            : 'Creating...'
                        : payment
                          ? 'Update Payment'
                          : 'Create Payment'}
                </Button>
            </div>
        </form>
    );
};
