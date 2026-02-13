
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { Activity, Baby, Bot, Map, Syringe } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
    const loginImage = PlaceHolderImages.find(img => img.id === 'login-background');
  return (
    <main className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
       <div className="relative hidden flex-col items-center justify-center bg-background p-10 text-white lg:flex">
            {loginImage && (
                 <Image
                    src={loginImage.imageUrl}
                    alt="VetAI login background"
                    fill
                    className="absolute inset-0 object-cover"
                    data-ai-hint={loginImage.imageHint}
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
            <div className="relative z-20 mt-auto w-full">
                <Logo className="h-14 text-white" />
                <h1 className="mt-4 text-4xl font-bold font-headline">
                    Çiftliğinizin Geleceği. Bugün.
                </h1>
                <p className="mt-2 text-lg text-white/80">
                    Yapay zeka ile sürü sağlığını yönetin, verimliliği artırın ve hayvan refahını en üst düzeye çıkarın.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                    <div className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary" />
                        <span>Gerçek Zamanlı Davranış Analizi</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Baby className="h-5 w-5 text-primary" />
                        <span>Yeni Doğan Sağlığı Takibi</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Map className="h-5 w-5 text-primary" />
                        <span>Bölgesel Salgın Tespiti</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <Syringe className="h-5 w-5 text-primary" />
                        <span>Akıllı Aşı Takvimi</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Bot className="h-5 w-5 text-primary" />
                        <span>Yapay Zeka Veteriner Desteği</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex items-center justify-center p-6 bg-background">
             <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Tekrar Hoş Geldiniz!</CardTitle>
                <CardDescription>
                    Devam etmek için hesabınıza giriş yapın.
                </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Button asChild size="lg" className="w-full font-bold">
                            <Link href="/dashboard">Veteriner Hekim Olarak Giriş Yap</Link>
                        </Button>
                        <Button asChild size="lg" variant="secondary" className="w-full font-bold">
                            <Link href="/dashboard">Çiftçi Olarak Giriş Yap</Link>
                        </Button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                            Veya
                            </span>
                        </div>
                    </div>
                    
                    <Button asChild variant="outline" size="lg" className="w-full">
                        <Link href="/dashboard">Anonim Olarak Göz At</Link>
                    </Button>

                     <p className="px-8 text-center text-sm text-muted-foreground">
                        Giriş yaparak{" "}
                        <Link
                            href="#"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Kullanım Koşulları
                        </Link>{" "}
                        ve{" "}
                        <Link
                            href="#"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Gizlilik Politikamızı
                        </Link>
                         kabul etmiş olursunuz.
                    </p>
                </CardContent>
            </Card>
        </div>
    </main>
  );
}
