import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import * as React from 'react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();

    // Normalize href to string for comparisons
    const hrefToString = (href: NavItem['href']): string => {
        if (!href) return '';
        return typeof href === 'string' ? href : (href as any).url ?? '';
    };

    const getHasActiveChild = React.useCallback(
        (children?: NavItem[]) => {
            if (!children) return false;
            return children.some((child) => {
                const h = hrefToString(child.href as any);
                return !!h && (page.url === h || page.url.startsWith(h));
            });
        },
        [page.url]
    );

    // Track open groups by title
    const [openItems, setOpenItems] = React.useState<string[]>(() =>
        items.filter((it) => getHasActiveChild(it.children)).map((it) => it.title)
    );

    const toggleItem = (title: string) => {
        setOpenItems((prev) =>
            prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
        );
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const enabledTop = item.isActive !== false;
                    const hrefStr = hrefToString(item.href as any);
                    const isActiveTop = enabledTop && !!hrefStr && (page.url === hrefStr || page.url.startsWith(hrefStr));
                    const hasChildren = Array.isArray(item.children) && item.children.length > 0;
                    const isOpen = openItems.includes(item.title) || getHasActiveChild(item.children);

                    if (hasChildren) {
                        return (
                            <SidebarMenuItem key={item.title}>
                                <Collapsible
                                    open={isOpen}
                                    onOpenChange={() => {
                                        if (enabledTop) toggleItem(item.title);
                                    }}
                                >
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton tooltip={{ children: item.title }} disabled={!enabledTop} aria-disabled={!enabledTop}>
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                            {!item.tag && (isOpen ? (
                                                <ChevronDown className="ml-auto" />
                                            ) : (
                                                <ChevronRight className="ml-auto" />
                                            ))}
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>

                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.children!.map((child) => {
                                                const childEnabled = child.isActive !== false;
                                                const chHref = hrefToString(child.href as any);
                                                const isActiveChild = childEnabled && !!chHref && (page.url === chHref || page.url.startsWith(chHref));
                                                return (
                                                    <SidebarMenuSubItem key={`${item.title}-${child.title}`}>
                                                        <SidebarMenuSubButton asChild isActive={isActiveChild} aria-disabled={!childEnabled}>
                                                            <Link
                                                                href={(childEnabled ? (child.href as any) : '#')}
                                                                prefetch={childEnabled}
                                                                onClick={!childEnabled ? (e) => e.preventDefault() : undefined}
                                                                tabIndex={childEnabled ? undefined : -1}
                                                            >
                                                                <span>{child.title}</span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                );
                                            })}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </Collapsible>
                            </SidebarMenuItem>
                        );
                    }

                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={isActiveTop}
                                tooltip={{ children: item.title }}
                                aria-disabled={!enabledTop}
                            >
                                <Link
                                    href={enabledTop ? ((item.href as any) ?? '#') : '#'}
                                    prefetch={enabledTop}
                                    onClick={!enabledTop ? (e) => e.preventDefault() : undefined}
                                    tabIndex={enabledTop ? undefined : -1}
                                >
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
