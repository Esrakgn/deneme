'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { recentAlerts } from "@/lib/data";
import { AlertTriangle, Info, ShieldCheck, Siren } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Alert as AlertType } from "@/lib/types";
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

function getAlertIcon(severity: AlertType["severity"]) {
  switch (severity) {
    case "Kritik":
      return <Siren className="h-4 w-4" />;
    case "Yüksek":
      return <AlertTriangle className="h-4 w-4" />;
    case "Orta":
      return <Info className="h-4 w-4" />;
    default:
      return <ShieldCheck className="h-4 w-4" />;
  }
}

function getBadgeVariant(severity: AlertType["severity"]): "destructive" | "secondary" | "default" | "outline" {
    switch (severity) {
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

function TimeAgo({ timestamp }: { timestamp: Date }) {
    const [time, setTime] = useState(() => formatDistanceToNow(timestamp, { addSuffix: true, locale: tr }));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(formatDistanceToNow(timestamp, { addSuffix: true, locale: tr }));
        }, 60000); // Update every minute

        return () => clearInterval(interval);
    }, [timestamp]);

    return (
        <time dateTime={timestamp.toISOString()}>
            {time}
        </time>
    );
}


export function RecentAlerts() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Son Uyarılar</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
            {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        {getAlertIcon(alert.severity)}
                    </span>
                    <div className="grid gap-1 flex-1">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold">{alert.message}</p>
                            <Badge variant={getBadgeVariant(alert.severity)}>{alert.severity}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>Hayvan ID: {alert.animalId}</span>
                            {isClient ? (
                                <TimeAgo timestamp={alert.timestamp} />
                             ) : (
                                <Skeleton className="h-4 w-24" />
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
