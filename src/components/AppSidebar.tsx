import { Coins, LucideLayoutDashboard, PiggyBank, Wallet, WalletCards } from 'lucide-react';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui';

import { NavSecondary } from '@/components/NavSecondary';
import { NavUser } from '@/components/NavUser';
import { auth } from '@/lib/auth';
import type { User } from '@/type/User';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export async function AppSidebar() {
    const session = await auth();

    if (!session) {
        redirect('/login');
    }

    // @ts-ignore
    const user: User = session.user ?? {
        id: 1,
        name: 'Guest',
        email: 'guest@example.com',
    };

    const navItems = [
        {
            title: 'Dashboard',
            url: '/',
            icon: LucideLayoutDashboard,
        },
        {
            title: 'Transactions',
            url: '/transactions',
            icon: Coins,
        },
        {
            title: 'Accounts',
            url: '/accounts',
            icon: PiggyBank,
        },
        {
            title: 'Categories',
            url: '/categories',
            icon: WalletCards,
        },
    ];

    return (
        <Sidebar variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/public">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Wallet className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">Wallet App</span>
                                    <span className="truncate text-xs">Personal Finance</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {/*<NavSecondary items={navItems} />*/}
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map(item => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild size="sm">
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    );
}
