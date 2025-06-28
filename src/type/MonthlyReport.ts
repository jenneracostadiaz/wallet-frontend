import {Currency} from "@/type/Currencies";

export type DailyBalance = {
    date: string,
    expenses: number,
    income: number,
    net: number,
}

export type ExpenseByCategory = {
    amount: number,
    category: string,
    count: number,
    percentage: number,
}

export type Period = {
    start_date: string,
    end_date: string,
    month: string,
    month_name: string,
}

export type Summary = {
    net_income: number,
    total_expenses: number,
    total_income: number,
    total_transfers: number,
    transactions_count: number,
}

export type monthlyReport = {
    currency: Currency,
    daily_balance: DailyBalance[],
    expenses_by_category: ExpenseByCategory[],
    period: Period,
    summary: Summary,
}