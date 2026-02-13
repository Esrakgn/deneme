
import type { AnimalHealthStats, HerdHealthData, Alert, HistoricalRecord, NavItem } from "@/lib/types";
import {
  LayoutDashboard,
  Activity,
  Baby,
  Map,
  History,
  LifeBuoy,
  Settings,
  Syringe,
  PawPrint,
} from "lucide-react";

export const navItems: NavItem[] = [
  {
    title: "Kontrol Paneli",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Hayvan Yönetimi",
    href: "/animal-management",
    icon: PawPrint,
  },
  {
    title: "Yeni Doğan Analizi",
    href: "/newborn-analysis",
    icon: Baby,
  },
  {
    title: "Aşı Takibi",
    href: "/vaccine-tracking",
    icon: Syringe,
  },
  {
    title: "Bölgesel Analiz",
    href: "/regional-analysis",
    icon: Map,
  },
  {
    title: "Geçmiş Kayıtlar",
    href: "/records",
    icon: History,
  },
  {
    title: "Yardım Merkezi",
    href: "/help",
    icon: LifeBuoy,
  },
  {
    title: "Ayarlar",
    href: "/settings",
    icon: Settings,
  },
];

export const animalHealthStats: AnimalHealthStats = {
  total: 250,
  healthy: 220,
  pregnant: 22,
  sick: 8,
};

export const herdHealthData: HerdHealthData[] = [
  { status: "Sağlıklı", count: 220, fill: "hsl(var(--chart-2))" },
  { status: "Gebe", count: 22, fill: "hsl(var(--chart-5))" },
  { status: "Hasta", count: 8, fill: "hsl(var(--chart-1))" },
];

export const recentAlerts: Alert[] = [
  {
    id: "alert-1",
    animalId: "TR-34-1234",
    message: "Anormal yatma davranışı tespit edildi.",
    severity: "Yüksek",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
  },
  {
    id: "alert-2",
    animalId: "TR-35-5678",
    message: "Topallama belirtileri gösteriyor.",
    severity: "Orta",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
  {
    id: "alert-3",
    animalId: "TR-06-9012",
    message: "Doğum sonrası hareketlilik düşük.",
    severity: "Kritik",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
    {
    id: "alert-4",
    animalId: "TR-01-3456",
    message: "Sıcaklık sensörü normalin üzerinde.",
    severity: "Yüksek",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
  },
];

export const historicalRecords: HistoricalRecord[] = [
    { id: 'REC002', timestamp: '2024-05-20 07:30', eventType: 'Yeni Doğan', description: 'Hayvan ID 3344, sağlıklı bir buzağı doğurdu.', status: 'Beklemede' },
    { id: 'REC003', timestamp: '2024-05-19 18:00', eventType: 'Bölgesel Salgın', description: 'Ankara bölgesinde Şap hastalığı bildirildi.', status: 'İnceleniyor' },
    { id: 'REC004', timestamp: '2024-05-19 14:20', eventType: 'Aktivite Düşüşü', description: 'Hayvan ID 5566, genel aktivitede %30 düşüş.', status: 'Çözüldü' },
    { id: 'REC005', timestamp: '2024-05-18 11:05', eventType: 'Sıcaklık Uyarısı', description: 'Ahır 2, ortam sıcaklığı kritik seviyede.', status: 'Çözüldü' },
];

export const aiOnboardingMessages = {
    veterinarian: {
        welcomeMessage: "VetAI'ye hoş geldiniz, veteriner hekim! Sürü sağlığını proaktif olarak yönetmenize ve teşhis süreçlerinizi hızlandırmanıza yardımcı olmak için buradayız.",
        onboardingInstructions: "1. **Kontrol Paneli'ni** keşfederek başlayın; sürü sağlığına genel bir bakış edinin.\n2. **Yeni Doğan Analizi** modülünü kullanarak bireysel hayvan vakalarını derinlemesine inceleyin.\n3. **Bölgesel Analiz** haritası ile çevrenizdeki salgınları takip edin ve kendi gözlemlerinizi bildirin."
    },
    farmer: {
        welcomeMessage: "VetAI'ye hoş geldiniz, değerli çiftçi! Çiftliğinizdeki hayvanların sağlığını ve verimliliğini en üst düzeye çıkarmanıza destek olacağız.",
        onboardingInstructions: "1. **Kontrol Paneli'ndeki** genel metrikler ile hayvanlarınızı anlık olarak izleyin.\n2. Sistemden gelen **kritik alarmları** takip ederek olası sağlık sorunlarına anında müdahale edin.\n3. **Yardım Merkezi'ni** kullanarak aklınıza takılan soruları yapay zeka veteriner asistanımıza sorun."
    },
    'farm-manager': {
        welcomeMessage: "VetAI'ye hoş geldiniz, çiftlik yöneticisi! Operasyonel verimliliği artırmak ve sürü yönetimi kararlarınızı verilerle desteklemek için VetAI yanınızda.",
        onboardingInstructions: "1. **Kontrol Paneli'ndeki** genel metrikler ile çiftliğinizin performansını bir bakışta görün.\n2. **Geçmiş Kayıtlar** sayfasını kullanarak geçmiş olayları ve alarmları analiz edin, gelecekteki stratejilerinizi planlayın.\n3. **Ayarlar** bölümünden bildirim tercihlerinizi yapılandırarak sizin için en önemli bilgilerden anında haberdar olun."
    }
};

export type UserRole = keyof typeof aiOnboardingMessages;
