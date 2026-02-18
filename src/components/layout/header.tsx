'use client';

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { recentAlerts } from "@/lib/data";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, LogOut, Moon, Settings, Sun, UserRound } from "lucide-react";
import Link from "next/link";

function getSeverityVariant(severity: string): "destructive" | "secondary" | "default" | "outline" {
  const normalized = severity.replace("YÃ¼ksek", "Yüksek");

  switch (normalized) {
    case "Kritik":
      return "destructive";
    case "Yüksek":
      return "secondary";
    case "Orta":
      return "default";
    default:
      return "outline";
  }
}

export function Header() {
  const unreadCount = recentAlerts.length;
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const stored = localStorage.getItem("theme");

    if (stored === "dark" || stored === "light") {
      const dark = stored === "dark";
      root.classList.toggle("dark", dark);
      setIsDark(dark);
      return;
    }

    root.classList.remove("dark");
    setIsDark(false);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = !isDark;
    root.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border/60 bg-card/70 px-4 backdrop-blur-md lg:h-[60px] lg:px-6">
      <SidebarTrigger className="h-9 w-9 rounded-md border border-border/60 bg-background/70 shadow-sm hover:bg-background" />
      <div className="w-full flex-1" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative h-10 w-10 rounded-full border border-border/60 bg-background/70 shadow-sm transition-all duration-200 hover:scale-105 hover:border-primary/30 hover:bg-background"
          >
            <Bell className="h-4 w-4 text-foreground/80" />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
            <span className="sr-only">Bildirimler</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-[360px] rounded-xl border-border/60 bg-card/95 p-1 shadow-lg backdrop-blur"
        >
          <DropdownMenuLabel className="flex items-center justify-between px-2 py-2 text-sm font-semibold">
            Bildirimler
            <Badge variant="outline" className="text-[10px]">
              {unreadCount} yeni
            </Badge>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <div className="max-h-72 space-y-1 overflow-y-auto p-1">
            {recentAlerts.length === 0 ? (
              <p className="px-2 py-3 text-sm text-muted-foreground">Yeni bildiriminiz yok.</p>
            ) : (
              recentAlerts.slice(0, 6).map((alert) => (
                <div key={alert.id} className="rounded-lg border border-border/50 p-2">
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <p className="line-clamp-2 text-xs font-medium">{alert.message}</p>
                    <Badge variant={getSeverityVariant(alert.severity)} className="h-5 text-[10px]">
                      {alert.severity.replace("YÃ¼ksek", "Yüksek")}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>Hayvan ID: {alert.animalId}</span>
                    <time dateTime={alert.timestamp.toISOString()}>
                      {new Intl.DateTimeFormat("tr-TR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(alert.timestamp)}
                    </time>
                  </div>
                </div>
              ))
            )}
          </div>

          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/records" className="cursor-pointer justify-center rounded-md font-medium text-primary">
              Tüm bildirimleri görüntüle
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="h-10 w-10 rounded-full border border-border/60 bg-background/70 shadow-sm transition-all duration-200 hover:scale-105 hover:border-primary/30 hover:bg-background"
      >
        {isDark ? <Sun className="h-4 w-4 text-foreground/80" /> : <Moon className="h-4 w-4 text-foreground/80" />}
        <span className="sr-only">Temayı değiştir</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full border border-primary/25 bg-gradient-to-br from-background to-primary/10 p-0 shadow-sm transition-all duration-200 hover:scale-105 hover:border-primary/40 hover:shadow-md"
          >
            <Avatar className="h-9 w-9 ring-2 ring-background/80">
              <AvatarFallback className="bg-primary/15 text-primary">
                <UserRound className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <span className="sr-only">Kullanıcı menüsünü aç</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="min-w-[220px] rounded-xl border-border/60 bg-card/95 p-1 shadow-lg backdrop-blur"
        >
          <DropdownMenuLabel className="px-2 py-2 text-sm font-semibold">Hesabım</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/settings" className="cursor-pointer rounded-md">
              <Settings className="mr-2 h-4 w-4" />
              Ayarlar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/" className="cursor-pointer rounded-md text-red-600 dark:text-red-400">
              <LogOut className="mr-2 h-4 w-4" />
              Çıkış Yap
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

