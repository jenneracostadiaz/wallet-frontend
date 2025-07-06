import { Button } from '@/components/ui';
import { useAccountsCsv } from '@/hooks/useAccounts';
import type { Account } from '@/type/Accounts';

export const AccountsCsvReport = ({ account }: { account: Account }) => {
    const report = useAccountsCsv(account.id);

    const handleDownload = () => {
        if (report.data) {
            const url = URL.createObjectURL(report.data);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${account.name}-report.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };

    return (
        <Button
            variant="ghost"
            onClick={handleDownload}
            disabled={report.isLoading || !report.data}
            className="text-sm p-2 line-clamp-1 w-full text-left"
        >
            {report.isLoading ? 'Generating CSV...' : 'CSV Export'}
        </Button>
    );
};
