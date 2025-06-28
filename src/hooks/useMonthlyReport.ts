import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const fetchMonthlyReport = async (token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/monthly-report`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    if (!response.ok) {
        throw new Error('Could not fetch monthly report');
    }
    return response.json();
}

export const useGetMonthlyReport = () => {
    const { data: session } = useSession();

    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['monthlyReport', session?.accessToken],
        queryFn: () => fetchMonthlyReport(session?.accessToken || ''),
        enabled: !!session?.accessToken,
        refetchOnWindowFocus: false,
    });

    return {
        data,
        isLoading,
        isError,
    };
}