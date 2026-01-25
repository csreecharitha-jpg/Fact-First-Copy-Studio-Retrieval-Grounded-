'use client';

import {
  PenLine,
  LineChart,
  FileText,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { Separator } from './ui/separator';

const menuItems = [
  {
    href: '/',
    icon: PenLine,
    label: 'Copy Studio',
  },
  {
    href: '/dashboard',
    icon: LineChart,
    label: 'Analytics',
  },
];

export function MainSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left">
      <SidebarHeader>
        <div className="flex items-center justify-center p-2 group-data-[collapsible=icon]:hidden">
          <Logo />
        </div>
        <div className="hidden items-center justify-center p-2 group-data-[collapsible=icon]:flex">
          <FileText className="h-6 w-6 text-primary" />
        </div>
      </SidebarHeader>
      <Separator />
      <SidebarMenu>
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href} legacyBehavior passHref>
              <SidebarMenuButton
                isActive={pathname === item.href}
                tooltip={{ children: item.label }}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={{ children: "Settings" }}>
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
