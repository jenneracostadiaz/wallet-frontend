'use client';
import { createEmptyAccount, useAccountsList } from '@/hooks/useAccounts';
import { createEmptyCategory } from '@/hooks/useCategories';
import { createEmptyCurrency } from '@/hooks/useCurrencies';
import { useTransactionMutation } from '@/hooks/useTransactions';
import type { Account } from '@/type/Accounts';
import type { Transaction } from '@/type/Transactions';
import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

const getInitialState = (transaction?: Transaction) => ({
    date: transaction?.date || new Date(),
    amount: transaction?.amount || 0,
    description: transaction?.description || '',
    account_id: transaction?.account_id || 0,
    to_account_id: transaction?.to_account_id || 0,
    category_id: transaction?.category_id || 0,
    type: transaction?.type || 'income',
});

export const useTransactionForm = (transaction?: Transaction, onSuccess?: () => void) => {
    const [form, setForm] = useState(() => getInitialState(transaction));
    const { accountsList } = useAccountsList();
    const { mutate, isPending, error } = useTransactionMutation({ transactionId: transaction?.id, onSuccess });

    useEffect(() => {
        setForm(getInitialState(transaction));
    }, [transaction]);

    const currencySymbol = useMemo(() => {
        const selectedAccount = accountsList.find((account: Account) => account.id === form.account_id);
        return selectedAccount?.currency?.symbol;
    }, [form.account_id, accountsList]);

    const handleInputChange = (field: keyof typeof form, value: string | number) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleAccountChange = (value: string) => {
        const accountId = value === '0' || value === '' ? 0 : Number.parseInt(value);
        setForm(prev => ({
            ...prev,
            account_id: Number.isNaN(accountId) ? 0 : accountId,
            to_account_id: prev.to_account_id === accountId ? 0 : prev.to_account_id,
        }));
    };

    const handleTypeChange = (value: string) => {
        setForm(prev => ({
            ...prev,
            type: value,
            category_id: value === 'transfer' ? prev.category_id : 0,
        }));
    };

    const handleCategoryChange = (value: string) => {
        const categoryId = value === '0' || value === '' ? 0 : Number.parseInt(value);
        setForm(prev => ({
            ...prev,
            category_id: Number.isNaN(categoryId) ? 0 : categoryId,
        }));
    };

    const handleDateChange = (date: Date | undefined) => {
        if (date) {
            const currentDate = form.date ? new Date(form.date) : new Date();
            date.setHours(currentDate.getHours());
            date.setMinutes(currentDate.getMinutes());
            setForm({ ...form, date });
        }
    };

    const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (form.date && e.target.value) {
            const [hours, minutes] = e.target.value.split(':');
            const newDate = new Date(form.date);
            newDate.setHours(Number.parseInt(hours, 10));
            newDate.setMinutes(Number.parseInt(minutes, 10));
            setForm({ ...form, date: newDate });
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        mutate({
            ...form,
            date: form.date ? new Date(form.date) : new Date(),
        });
    };

    return {
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
    };
};
