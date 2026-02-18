import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Logo } from "@/components/logo";
import Link from "next/link";
import {
  Activity,
  Baby,
  Bot,
  Map,
  ShieldCheck,
  Sparkles,
  Syringe,
} from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const highlights = [
  { icon: Activity, text: "Gerçek zamanlı davranış analizi" },
  { icon: Baby, text: "Yeni doğan sağlığı takibi" },
  { icon: Map, text: "Bölgesel salgın tespiti" },
  { icon: Syringe, text: "Akıllı aşı takvimi" },
  { icon: Bot, text: "Yapay zeka veteriner desteği" },
  { icon: ShieldCheck, text: "Güvenli ve merkezi kayıt yönetimi" },
];

export default function Home() {
  const loginImage = PlaceHolderImages.find((img) => img.id === "login-background");

  return (
    <main className="relative grid min-h-screen w-full grid-cols-1 overflow-hidden bg-background lg:grid-cols-2">
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />

      <section className="relative hidden overflow-hidden lg:flex">
        {loginImage && (
          <Image
            src={loginImage.imageUrl}
            alt="VetAI giriş arka plan"
            fill
            className="object-cover"
            data-ai-hint={loginImage.imageHint}
            priority
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/75 to-emerald-950/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.16),transparent_40%)]" />

        <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
          <div className="animate-in fade-in slide-in-from-top-2 duration-500">
            <Logo className="w-fit border-white/30 bg-white/10 text-white" />
          </div>

          <div className="max-w-xl space-y-6 text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-white/90">
              <Sparkles className="h-3.5 w-3.5" />
              VetAI Platform
            </div>

            <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
              Çiftliğinizin geleceğini bugün, veriyle yönetin.
            </h1>
            <p className="max-w-lg text-base text-white/80 xl:text-lg">
              Sürü sağlığını izleyin, riskleri erken yakalayın ve tüm bakım süreçlerini tek panelden modern bir deneyimle yönetin.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2 text-sm">
              {highlights.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2.5 rounded-lg border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-sm"
                >
                  <Icon className="h-4 w-4 shrink-0 text-emerald-300" />
                  <span className="text-white/90">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative flex items-center justify-center p-5 sm:p-8 lg:p-10">
        <Card className="w-full max-w-md rounded-2xl border-border/70 bg-card/90 shadow-2xl backdrop-blur supports-[backdrop-filter]:bg-card/80">
          <CardHeader className="space-y-4 pb-4 text-center">
            <div className="mx-auto w-fit animate-in fade-in zoom-in-95 duration-300 lg:hidden">
              <Logo />
            </div>
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
              Güvenli giriş
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">
              Tekrar hoş geldiniz
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              VetAI paneline devam etmek için rolünüzü seçin.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button asChild size="lg" className="w-full font-semibold">
                <Link href="/dashboard">Veteriner hekim olarak giriş yap</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="w-full font-semibold">
                <Link href="/dashboard">Çiftçi olarak giriş yap</Link>
              </Button>
            </div>

            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/70" />
              </div>
              <div className="relative flex justify-center text-[11px] font-medium uppercase tracking-[0.12em]">
                <span className="bg-card px-2 text-muted-foreground">veya</span>
              </div>
            </div>

            <Button asChild variant="outline" size="lg" className="w-full font-semibold">
              <Link href="/dashboard">Anonim olarak göz at</Link>
            </Button>

            <p className="px-2 text-center text-xs leading-relaxed text-muted-foreground">
              Giriş yaparak
              {" "}
              <Link href="#" className="underline underline-offset-4 hover:text-primary">
                Kullanım Koşulları
              </Link>
              {" "}
              ve
              {" "}
              <Link href="#" className="underline underline-offset-4 hover:text-primary">
                Gizlilik Politikası
              </Link>
              {' '}şartlarını kabul etmiş olursunuz.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

