import { ModeToggle } from '@/components/ModeToggle';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    Separator,
    SidebarTrigger,
} from '@/components/ui';
import { Fragment } from 'react';

interface HeaderProps {
    breadcrumbs: {
        title: string;
        href: string;
    }[];
}

export const Header = ({ breadcrumbs }: HeaderProps) => {
    return (
        <header className="w-11/12 mx-auto flex justify-between items-center h-16 shrink-0 gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumbs.map((breadcrumb, idx) => (
                            <Fragment key={breadcrumb.href}>
                                <BreadcrumbItem>
                                    {idx < breadcrumbs.length - 1 ? (
                                        <BreadcrumbLink href={breadcrumb.href}>{breadcrumb.title}</BreadcrumbLink>
                                    ) : (
                                        <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
                                    )}
                                </BreadcrumbItem>
                                {idx < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                            </Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <ModeToggle />
        </header>
    );
};
