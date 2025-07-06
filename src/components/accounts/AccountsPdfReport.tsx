import type { Account } from "@/type/Accounts";
import { useAccountsPdf } from "@/hooks/useAccounts";
import { Button } from "@/components/ui";

export const AccountsPdfReport = ({ account }: { account: Account }) => {
  const report = useAccountsPdf(account.id);

  const handleDownload = () => {
    if (report.data) {
      const url = URL.createObjectURL(report.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${account.name}-report.pdf`;
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
      {report.isLoading
        ? "Generating PDF..."
        : "PDF Report"}
    </Button>
  );
};