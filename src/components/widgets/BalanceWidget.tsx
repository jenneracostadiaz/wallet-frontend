import { fetchBalance } from '@/hooks/useBalance';
import { auth } from '@/lib/auth';
import { Balance } from './Balance';

export async function BalanceWidget() {
    const session = await auth();
    const balance = await fetchBalance(session?.accessToken || '');

    return <Balance initialBalance={balance} />;
}
