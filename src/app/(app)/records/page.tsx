'use client';

import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { historicalRecords } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, FileText, Search } from "lucide-react";

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

function escapeCsv(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export default function RecordsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecords = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return historicalRecords;

    return historicalRecords.filter((record) =>
      [record.id, record.eventType, record.description, record.status]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [searchTerm]);

  const handleExportCsv = () => {
    if (!filteredRecords.length) {
      alert("Dışa aktarılacak kayıt bulunamadı.");
      return;
    }

    const headers = ["Kayıt ID", "Tarih ve Saat", "Olay Türü", "Açıklama", "Durum"];
    const rows = filteredRecords.map((r) => [r.id, r.timestamp, r.eventType, r.description, r.status]);

    const csv = [headers.map(escapeCsv).join(","), ...rows.map((row) => row.map(escapeCsv).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `gecmis-kayitlar-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleExportPdf = () => {
    if (!filteredRecords.length) {
      alert("Dışa aktarılacak kayıt bulunamadı.");
      return;
    }

    const rowsHtml = filteredRecords
      .map(
        (r) => `
          <tr>
            <td>${escapeHtml(r.id)}</td>
            <td>${escapeHtml(r.timestamp)}</td>
            <td>${escapeHtml(r.eventType)}</td>
            <td>${escapeHtml(r.description)}</td>
            <td>${escapeHtml(r.status)}</td>
          </tr>
        `
      )
      .join("");

    const win = window.open("", "_blank");
    if (!win) return;

    win.document.write(`
      <!doctype html>
      <html lang="tr">
        <head>
          <meta charset="utf-8" />
          <title>Geçmiş Kayıtlar Raporu</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 24px; color: #111; }
            h1 { margin: 0 0 8px; font-size: 20px; }
            p { margin: 0 0 16px; color: #555; }
            table { width: 100%; border-collapse: collapse; font-size: 12px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background: #f6f6f6; }
          </style>
        </head>
        <body>
          <h1>Geçmiş Kayıtlar Raporu</h1>
          <p>Oluşturma tarihi: ${new Date().toLocaleString("tr-TR")}</p>
          <table>
            <thead>
              <tr>
                <th>Kayıt ID</th>
                <th>Tarih ve Saat</th>
                <th>Olay Türü</th>
                <th>Açıklama</th>
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>${rowsHtml}</tbody>
          </table>
        </body>
      </html>
    `);

    win.document.close();
    win.focus();
    win.print();
  };

  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl font-bold">Geçmiş Kayıtlar</h1>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <CardTitle>Alarmlar ve Olaylar</CardTitle>
              <CardDescription>Sistem tarafından oluşturulan alarmların ve olayların tarihsel kaydı.</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleExportCsv}>
                <Download className="mr-2 h-4 w-4" />
                CSV
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportPdf}>
                <FileText className="mr-2 h-4 w-4" />
                PDF
              </Button>
            </div>
          </div>

          <div className="flex items-center pt-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Kayıtlarda ara..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
              {filteredRecords.map((record) => (
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
