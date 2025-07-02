import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { CircleDashed, TrendingDown, TrendingUp } from 'lucide-react';

const types = [
    {
        value: 'income',
        label: 'Income',
        icon: <TrendingUp className="text-green-400" />,
    },
    {
        value: 'expense',
        label: 'Expense',
        icon: <TrendingDown className="text-red-400" />,
    },
    {
        value: 'transfer',
        label: 'Transfer',
        icon: <CircleDashed className="text-blue-400" />,
    },
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
                        {type.label} {type.icon}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
