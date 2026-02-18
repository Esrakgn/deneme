
'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { Logo } from "@/components/logo";
import { AnimalProvider } from "@/context/AnimalContext";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AnimalProvider>
      <SidebarProvider>
        <Sidebar variant="inset" collapsible="icon" className="border-sidebar-border/60">
          <SidebarHeader className="px-3 pt-3">
            <Link href="/dashboard" className="inline-flex">
              <Logo />
            </Link>
          </SidebarHeader>
          <SidebarContent className="px-2 pb-2">
            <SidebarNav />
          </SidebarContent>
          <SidebarFooter className="px-2 pb-3">
              <div className="rounded-lg border border-sidebar-border/60 bg-sidebar-accent/25 p-2 text-center text-xs text-sidebar-foreground/70">
                  © {new Date().getFullYear()} VetAI Inc.
              </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="bg-gradient-to-b from-background to-background/95">
          <Header />
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </AnimalProvider>
  );
}



