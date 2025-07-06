import { Button } from '@/components/ui';
import { useTransactionsCsv } from '@/hooks/useTransactions';

export const TransactionsCsvExport = () => {
    const report = useTransactionsCsv();

    const handleDownload = () => {
        if (report.data) {
            const url = URL.createObjectURL(report.data);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'transactions-report.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };

    return (
        <Button
            variant="outline"
            onClick={handleDownload}
            disabled={report.isLoading || !report.data}
            className="text-sm p-2 text-left"
        >
            {report.isLoading ? 'Generating CSV...' : 'CSV Export'}
        </Button>
    );
};
