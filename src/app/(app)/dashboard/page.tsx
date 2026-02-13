
import { StatCard } from "@/components/dashboard/stat-card";
import { HealthChart } from "@/components/dashboard/health-chart";
import { RecentAlerts } from "@/components/dashboard/recent-alerts";
import { animalHealthStats } from "@/lib/data";
import { Users, Smile, AlertTriangle, Frown, HeartPulse } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold font-headline">Kontrol Paneli</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Toplam Hayvan"
          value={animalHealthStats.total}
          icon={Users}
          description="Sürüdeki toplam hayvan sayısı"
        />
        <StatCard
          title="Sağlıklı"
          value={animalHealthStats.healthy}
          icon={Smile}
          description="Şu anda sağlıklı olan hayvan sayısı"
          className="border-green-500/50"
        />
        <StatCard
          title="Gebe Hayvanlar"
          value={animalHealthStats.pregnant}
          icon={HeartPulse}
          description="Takipteki gebe hayvanlar"
          className="border-blue-500/50"
        />
        <StatCard
          title="Hasta"
          value={animalHealthStats.sick}
          icon={Frown}
          description="Müdahale gerektiren hasta hayvanlar"
          className="border-red-500/50"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <HealthChart />
        <RecentAlerts />
      </div>
    </div>
  );
}
