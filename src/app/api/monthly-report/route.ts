import { getMonthlyReport } from '@/lib/api';
import { auth } from '@/lib/auth';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const session = await auth();

    if (!session?.accessToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const month = searchParams.get('month');

    try {
        const monthlyReport = await getMonthlyReport(session.accessToken, month || undefined);
        return NextResponse.json(monthlyReport);
    } catch (error) {
        console.error('Error fetching monthly report:', error);
        return NextResponse.json({ error: 'Failed to fetch monthly report' }, { status: 500 });
    }
}
