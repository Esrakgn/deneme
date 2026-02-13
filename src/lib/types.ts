
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  label?: string;
};

export type AnimalHealthStats = {
  total: number;
  healthy: number;
  pregnant: number;
  sick: number;
};

export type HealthStatus = "Sağlıklı" | "Gebe" | "Hasta";

export type HerdHealthData = {
  status: HealthStatus;
  count: number;
  fill: string;
};

export type Alert = {
  id: string;
  animalId: string;
  message: string;
  severity: "Kritik" | "Yüksek" | "Orta" | "Düşük";
  timestamp: Date;
};

export type HistoricalRecord = {
  id: string;
  timestamp: string;
  eventType: string;
  description: string;
  status: "Çözüldü" | "Beklemede" | "İnceleniyor";
};
