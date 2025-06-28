import type { DailyBalance as DailyBalanceType } from '@/type/MonthlyReport';
import {Card, Skeleton} from "@/components/ui";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface DailyBalanceProps {
    loading: boolean;
    balance: DailyBalanceType[];
}

export const DailyBalance = ({loading, balance}: DailyBalanceProps) => {

    if(!balance || balance.length === 0) {
        return <Skeleton className="h-72 w-full rounded-2xl lg:col-span-2" />;
    }

    const data = {
        labels: balance.map(item => new Date(item.date).getDate() + '/' + (new Date(item.date).getMonth() + 1)),
        datasets: [
            {
                label: 'Income',
                data: balance.map(item => item.income),
                borderColor: '#36A2EB',
                backgroundColor: '#9BD0F5',
                tension: 0.4,
            },
            {
                label: 'Expenses',
                data: balance.map(item => item.expenses),
                borderColor: '#FF6384',
                backgroundColor: '#FFB1C1',
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
                    label: function(tooltipItem: any) {
                        const label = tooltipItem.dataset.label || '';
                        const value = tooltipItem.raw;
                        return `${label}: ${value.toLocaleString('es-PE', { style: 'currency', currency: 'PEN' })}`;
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
        <>
            {loading && <Skeleton className="h-72 w-full rounded-2xl lg:col-span-2" />}
            {!loading && (
                <Card className="w-full rounded-2xl p-4 lg:col-span-2">
                    <Line data={data} options={options} />
                </Card>
            )}
        </>
    )
}