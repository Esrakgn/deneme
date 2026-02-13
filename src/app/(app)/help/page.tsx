'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bot, Phone } from "lucide-react";
import { AISupportChat } from "@/components/help/ai-support-chat";
import { LiveSupportChat } from "@/components/help/live-support-chat";


export default function HelpPage() {
    return (
        <div className="space-y-6">
             <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold font-headline">Yardım Merkezi</h1>
                <p className="text-lg text-muted-foreground">
                    Yardım Merkezinde iki farklı destek seçeneği sunuyoruz: hızlı yanıt almak isterseniz yapay zekâ asistanımıza sorunuzu yöneltebilirsiniz. Anında öneriler ve yönlendirmeler alabilirsiniz. Daha detaylı veya özel bir durum için ise gerçek veterinerlerimizden profesyonel destek talep edebilirsiniz. İster teknolojiyle anında çözüm, ister uzman görüşüyle güvence… Seçim sizin.
                </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Bot className="h-8 w-8 text-primary" />
                            Yapay Zekâ Veteriner Asistanı
                        </CardTitle>
                        <CardDescription>
                            Acil sorularınız ve hızlı teşhis önerileri için yapay zeka destekli asistanımızla anında sohbet edin. 7/24 hizmetinizde.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-grow">
                        <AISupportChat />
                    </CardContent>
                </Card>
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Phone className="h-8 w-8 text-green-600" />
                            Canlı Veteriner Desteği
                        </CardTitle>
                         <CardDescription>
                            Karmaşık vakalar veya ikinci bir görüş için uzman veteriner hekimlerimizle canlı olarak görüşün.
                         </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-grow">
                        <LiveSupportChat />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}