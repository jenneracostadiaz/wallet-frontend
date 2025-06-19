import {ReactNode} from "react";
import {SidebarProvider, SidebarTrigger} from "@/components/ui";
import {AppSidebar} from "@/app/(dashboard)/components/AppSidebar";

interface DashboardLayoutProps {
	children: ReactNode;
}

export default function DashboardLayout({children}: DashboardLayoutProps) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main>
				<SidebarTrigger />
				{children}
			</main>
		</SidebarProvider>
	);
}