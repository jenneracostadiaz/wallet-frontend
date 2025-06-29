export type Category = {
    id: number;
    name: string;
    type: 'income' | 'expense';
    icon: string;
    subcategories?: Category[];
    parent?: Category | null;
    parent_id?: number | null;
};
