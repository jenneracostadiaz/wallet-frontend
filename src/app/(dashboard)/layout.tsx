import { AppSidebar } from '@/app/(dashboard)/components/AppSidebar';
import { ModeToggle } from '@/components/ModeToggle';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui';
import type { ReactNode } from 'react';

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <main className="flex flex-1 flex-col gap-4 p-4 pt-2">
                    <div className="flex justify-between items-center">
                        <SidebarTrigger />
                        <ModeToggle />
                    </div>
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
