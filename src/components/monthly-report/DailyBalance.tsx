import { Card, Skeleton } from '@/components/ui';
import { Line } from 'react-chartjs-2';

import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';

import type { DailyBalance as DailyBalanceType } from '@/type/MonthlyReport';
import type { TooltipItem } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const DailyBalance = ({ balance }: { balance: DailyBalanceType[] }) => {
    if (!balance || balance.length === 0) {
        return <Skeleton className="h-72 w-full rounded-2xl lg:col-span-2" />;
    }

    const data = {
        labels: balance.map(item => {
            const date = new Date(item.date);
            const day = date.getUTCDate();
            const month = date.getUTCMonth() + 1;
            return `${day}/${month}`;
        }),
        datasets: [
            {
                label: 'Income',
                data: balance.map(item => item.income),
                borderColor: 'oklch(79.2% 0.209 151.711)',
                backgroundColor: 'oklch(62.7% 0.194 149.214)',
                tension: 0.4,
            },
            {
                label: 'Expenses',
                data: balance.map(item => item.expenses),
                borderColor: 'oklch(71.2% 0.194 13.428)',
                backgroundColor: 'oklch(58.6% 0.253 17.585)',
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Daily Balance',
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem: TooltipItem<'line'>) => {
                        const label = tooltipItem.dataset.label || '';
                        const value = tooltipItem.raw as number;
                        return `${label}: ${value.toLocaleString(navigator.language, { style: 'currency', currency: 'PEN' })}`;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: false,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: false,
                    text: 'Amount',
                },
            },
        },
    };

    return (
        <div className="overflow-auto lg:col-span-2">
            <Card className="w-xl lg:w-full rounded-2xl p-4 ">
                <Line data={data} options={options} />
            </Card>
        </div>
    );
};
