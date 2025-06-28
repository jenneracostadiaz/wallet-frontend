import { Card, Skeleton } from '@/components/ui';
import type { ExpenseByCategory } from '@/type/MonthlyReport';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ExpensesByCategoryProps {
    loading: boolean;
    expenses: ExpenseByCategory[];
}

export const ExpensesByCategory = ({ loading, expenses }: ExpensesByCategoryProps) => {
    if (!expenses || expenses.length === 0) {
        return <Skeleton className="h-48 w-full rounded-2xl" />;
    }

    const data = {
        labels: expenses.map(item => item.category),
        datasets: [
            {
                label: 'Amount',
                data: expenses.map(item => item.amount),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right' as const,
            },
            title: {
                display: true,
                text: 'Expenses by Category',
            },
        },
    };

    return (
        <>
            {loading && <Skeleton className="h-48 w-full rounded-2xl" />}
            {!loading && (
                <Card className="w-full rounded-2xl p-4">
                    <Pie data={data} options={options} />
                </Card>
            )}
        </>
    );
};
