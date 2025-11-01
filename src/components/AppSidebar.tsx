import { Coins, HandCoins, LucideLayoutDashboard, PiggyBank, Wallet, WalletCards } from 'lucide-react';

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

import { NavUser } from '@/components/NavUser';
import { CreateTransaction } from '@/components/transactions/CreateTransaction';
import { getAccounts, getCategories } from '@/lib/api';
import { auth } from '@/lib/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import type { User } from '@/type/User';

export async function AppSidebar() {
    const session = await auth();

    if (!session?.accessToken) {
        redirect('/login');
    }

    // @ts-ignore
    const user: User = session.user ?? {
        id: 1,
        name: 'Guest',
        email: 'guest@example.com',
    };

    const navReports = [
        {
            title: 'Dashboard',
            url: '/',
            icon: LucideLayoutDashboard,
        },
    ];

    const navItems = [
        {
            title: 'Transactions',
            url: '/transactions',
            icon: Coins,
        },
        {
            title: 'Payments',
            url: '/payments',
            icon: HandCoins,
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

    const token = session.accessToken;

    const [initialAccounts, initialCategories] = await Promise.all([getAccounts(token), getCategories(token)]);

    return (
        <Sidebar variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
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
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navReports.map(item => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
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
                <SidebarGroup>
                    <SidebarGroupLabel>Actions</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <CreateTransaction
                                initialAccounts={initialAccounts}
                                initialCategories={initialCategories}
                            />
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map(item => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
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
