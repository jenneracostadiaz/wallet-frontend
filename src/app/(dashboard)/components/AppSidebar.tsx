import { Wallet } from "lucide-react"

import {
	Sidebar,
	SidebarContent, SidebarHeader, SidebarFooter,
	SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui"


export function AppSidebar() {
	return (
		<Sidebar variant="inset">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<a href="#">
								<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
									<Wallet className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">Wallet App</span>
									<span className="truncate text-xs">Personal Finance</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
			</SidebarContent>
			<SidebarFooter>
			</SidebarFooter>
		</Sidebar>
	)
}