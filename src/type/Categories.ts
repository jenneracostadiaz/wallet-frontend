export type Category = {
    id: number;
    name: string;
    type: 'income' | 'expense' | 'transfer';
    icon: string;
    subcategories?: Category[];
    parent?: Category | null;
    parent_id?: number | null;
    user_id: number;
};
