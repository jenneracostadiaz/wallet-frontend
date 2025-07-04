import { Card } from '@/components/ui';
import type { ExpenseByCategory } from '@/type/MonthlyReport';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const ExpensesByCategory = ({ expenses }: { expenses: ExpenseByCategory[] }) => {
    const data = {
        labels: expenses.map(item => item.category),
        datasets: [
            {
                label: 'Amount',
                data: expenses.map(item => item.amount),
                backgroundColor: [
                    'oklch(63.7% 0.237 25.331)',
                    'oklch(70.5% 0.213 47.604)',
                    'oklch(76.9% 0.188 70.08)',
                    'oklch(79.5% 0.184 86.047)',
                    'oklch(76.8% 0.233 130.85)',
                    'oklch(72.3% 0.219 149.579)',
                    'oklch(69.6% 0.17 162.48)',
                    'oklch(70.4% 0.14 182.503)',
                    'oklch(71.5% 0.143 215.221)',
                    'oklch(68.5% 0.169 237.323)',
                    'oklch(62.3% 0.214 259.815)',
                    'oklch(58.5% 0.233 277.117)',
                    'oklch(60.6% 0.25 292.717)',
                    'oklch(62.7% 0.265 303.9)',
                    'oklch(66.7% 0.295 322.15)',
                    'oklch(65.6% 0.241 354.308)',
                    'oklch(64.5% 0.246 16.439)',
                    'oklch(55.4% 0.046 257.417)',
                    'oklch(55.1% 0.027 264.364)',
                    'oklch(55.2% 0.016 285.938)',
                    'oklch(55.6% 0 0)',
                    'oklch(55.3% 0.013 58.071)',
                ],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Expenses by Category',
            },
        },
    };

    return (
        <Card className="w-full rounded-2xl p-4">
            <Pie data={data} options={options} />
        </Card>
    );
};
