
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { historicalRecords } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

function getStatusVariant(status: string): "outline" | "secondary" | "default" {
    switch (status) {
        case "Çözüldü":
            return "outline";
        case "İnceleniyor":
            return "secondary";
        case "Beklemede":
            return "default";
        default:
            return "default";
    }
}

export default function RecordsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Geçmiş Kayıtlar</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Alarmlar ve Olaylar</CardTitle>
          <CardDescription>Sistem tarafından oluşturulan tüm alarmların ve olayların tarihsel kaydı.</CardDescription>
           <div className="flex items-center pt-4">
              <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Kayıtlarda ara..." className="pl-8" />
              </div>
          </div>
        </CardHeader>
        <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Kayıt ID</TableHead>
                  <TableHead>Tarih ve Saat</TableHead>
                  <TableHead>Olay Türü</TableHead>
                  <TableHead>Açıklama</TableHead>
                  <TableHead className="text-right">Durum</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historicalRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.id}</TableCell>
                    <TableCell>{record.timestamp}</TableCell>
                    <TableCell>{record.eventType}</TableCell>
                    <TableCell>{record.description}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={getStatusVariant(record.status)}>{record.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
