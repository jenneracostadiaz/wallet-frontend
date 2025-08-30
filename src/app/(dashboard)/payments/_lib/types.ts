import type { Account } from '@/type/Accounts';
import type { Category } from '@/type/Categories';

export type Payment = {
    id: number;
    name: string;
    description: string;
    payment_type: string;
    status: string;
    amount: number;
    color: string;
    icon: string;
    start_date: string;
    next_payment_date: string;
    end_date: string;
    metadata: string[];
    order: number;
    created_at: string;
    updated_at: string;
    account: Account;
    category: Category;
    payment_schedule: PaymentSchedule;
    debt_detail: DebtDetail;
};

export type PaymentSchedule = {
    id: number;
    scheduled_payment_id: number;
    frequency: string;
    interval: number;
    day_of_month: number;
    day_of_week: number;
    max_occurrences: number;
    occurrences_count: number;
    auto_process: boolean;
    create_transaction: boolean;
    days_before_notification: number;
    created_at: string;
    updated_at: string;
};

export type DebtDetail = {
    id: number;
    scheduled_payment_id: number;
    original_amount: number;
    remaining_amount: number;
    paid_amount: number;
    total_installments: number;
    paid_installments: number;
    installment_amount: number;
    interest_rate: number;
    creditor: string;
    reference_number: string;
    due_date: string;
    late_fee: number;
    days_overdue: number;
    progress_percentage: number;
    created_at: string;
    updated_at: string;
};
