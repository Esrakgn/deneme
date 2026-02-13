
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Ayarlar</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Profil Bilgileri</CardTitle>
            <CardDescription>Kişisel bilgilerinizi ve tercihlerinizi güncelleyin.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Tam Ad</Label>
                <Input id="fullName" defaultValue="Anonim Kullanıcı" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input id="email" type="email" defaultValue="user@example.com" disabled />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Rol</Label>
              <Input id="role" defaultValue="Veteriner Hekim" disabled />
            </div>
             <div className="space-y-2">
              <Label htmlFor="language">Uygulama Dili</Label>
              <Select defaultValue="tr">
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tr">Türkçe</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>Değişiklikleri Kaydet</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Bildirim Ayarları</CardTitle>
            <CardDescription>Hangi durumlarda bildirim almak istediğinizi seçin.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="critical-alerts" className="flex flex-col space-y-1">
                <span>Kritik Alarmlar</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Acil müdahale gerektiren durumlar.
                </span>
              </Label>
              <Switch id="critical-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="high-alerts" className="flex flex-col space-y-1">
                <span>Yüksek Öncelikli Alarmlar</span>
                 <span className="font-normal leading-snug text-muted-foreground">
                  Anormal davranış gibi önemli uyarılar.
                </span>
              </Label>
              <Switch id="high-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="newborn-alerts" className="flex flex-col space-y-1">
                <span>Yeni Doğan Bildirimleri</span>
                 <span className="font-normal leading-snug text-muted-foreground">
                  Doğum ve sonrası analiz sonuçları.
                </span>
              </Label>
              <Switch id="newborn-alerts" />
            </div>
             <div className="flex items-center justify-between">
              <Label htmlFor="summary-reports" className="flex flex-col space-y-1">
                <span>Haftalık Özet Raporları</span>
                 <span className="font-normal leading-snug text-muted-foreground">
                  E-posta ile haftalık performans özeti.
                </span>
              </Label>
              <Switch id="summary-reports" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
