import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';

const types = [
    { value: 'expense', label: 'Expense' },
    { value: 'income', label: 'Income' },
    { value: 'transfer', label: 'Transfer' },
];

export const TypeSelect = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
    const handleValueChange = (newValue: string) => {
        if (newValue === 'all') {
            onChange('');
        } else {
            onChange(newValue);
        }
    };
    return (
        <Select onValueChange={handleValueChange} value={value}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                {types.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                        {type.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
