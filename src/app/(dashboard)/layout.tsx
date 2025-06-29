import { AppSidebar } from '@/app/(dashboard)/components/AppSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui';
import type { ReactNode } from 'react';

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
    );
}
