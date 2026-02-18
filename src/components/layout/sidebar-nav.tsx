"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { navItems } from "@/lib/data";

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu className="gap-2">
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href}
            className="h-10 rounded-xl px-2.5 transition-all duration-200 hover:translate-x-1 hover:bg-sidebar-accent/75 data-[active=true]:bg-gradient-to-r data-[active=true]:from-primary/25 data-[active=true]:to-primary/5 data-[active=true]:text-sidebar-foreground data-[active=true]:shadow-sm data-[active=true]:ring-1 data-[active=true]:ring-primary/20"
            tooltip={{
              children: item.title,
              className: "bg-sidebar-accent text-sidebar-accent-foreground",
            }}
          >
            <Link href={item.href} className="flex w-full items-center gap-2.5">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-sidebar-border/60 bg-sidebar-accent/35 text-sidebar-foreground/90 transition-colors group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:border-transparent group-data-[collapsible=icon]:h-6 group-data-[collapsible=icon]:w-6">
                <item.icon className="h-4 w-4" />
              </span>
              <span className="font-medium tracking-tight">{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

