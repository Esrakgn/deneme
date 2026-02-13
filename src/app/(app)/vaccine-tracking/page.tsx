
'use client';

import { useState, useContext, FormEvent, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Syringe, PlusCircle, CheckCircle, Trash2 } from "lucide-react";
import { AnimalContext } from "@/context/AnimalContext";

function getStatusVariant(status: string): "outline" | "secondary" | "default" | "destructive" {
    switch (status) {
        case "Yapıldı":
            return "outline";
        case "Bekleniyor":
            return "secondary";
        case "Gecikti":
            return "destructive";
        default:
            return "default";
    }
}

export default function VaccineTrackingPage() {
  const { vaccineSchedule, addVaccineRecord, updateVaccineRecord, deleteVaccineRecord, animals } = useContext(AnimalContext);
  const [newRecord, setNewRecord] = useState({ id: '', birthDate: '', vaccine: '', scheduledDate: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleAnimalSelectChange = (animalId: string) => {
    const selectedAnimal = animals.find(animal => animal.id === animalId);
    if (selectedAnimal) {
        setNewRecord(prev => ({ ...prev, id: selectedAnimal.id, birthDate: selectedAnimal.birthDate }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRecord(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewRecord(prev => ({ ...prev, [name]: value }));
  };

  const handleAddRecord = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newRecord.id && newRecord.vaccine && newRecord.scheduledDate) {
        addVaccineRecord({
            animalId: newRecord.id,
            vaccine: newRecord.vaccine,
            scheduledDate: newRecord.scheduledDate,
        });
        setNewRecord({ id: '', birthDate: '', vaccine: '', scheduledDate: '' });
    } else {
        alert("Lütfen tüm alanları doldurun.");
    }
  };

  const handleMarkAsDone = (id: string) => {
    updateVaccineRecord(id, { status: 'Yapıldı', appliedDate: new Date().toISOString().split('T')[0] });
  };
  
  const handleDeleteRecord = (id: string) => {
    if(window.confirm(`${id} ID'li kaydı silmek istediğinizden emin misiniz?`)) {
      deleteVaccineRecord(id);
    }
  };

  const filteredSchedule = vaccineSchedule.filter(item => 
    item.animalId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Yeni Doğan Aşı Takibi</h1>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2"><Syringe /> Aşı Takvimi</CardTitle>
                <CardDescription>Yeni doğan buzağıların kritik aşı takvimini oluşturun, planlayın ve gecikmeleri önleyin.</CardDescription>
                <div className="flex items-center pt-4">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                            placeholder="Buzağı ID'si ile ara..." 
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
                        <TableHead>Buzağı ID</TableHead>
                        <TableHead>Aşı Adı</TableHead>
                        <TableHead>Planlanan Tarih</TableHead>
                        <TableHead>Uygulanma Tarihi</TableHead>
                        <TableHead>Durum</TableHead>
                        <TableHead className="text-right">Eylemler</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredSchedule.map((calf) => (
                        <TableRow key={calf.id}>
                            <TableCell className="font-medium">{calf.animalId}</TableCell>
                            <TableCell>{calf.vaccine}</TableCell>
                            <TableCell>{calf.scheduledDate}</TableCell>
                            <TableCell>{calf.appliedDate || '-'}</TableCell>
                            <TableCell>
                                <Badge variant={getStatusVariant(calf.status)}>{calf.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                               <div className="flex items-center justify-end gap-2">
                                  {calf.status !== 'Yapıldı' && (
                                      <Button variant="outline" size="sm" onClick={() => handleMarkAsDone(calf.id)}>
                                          <CheckCircle className="mr-1 h-4 w-4" />
                                          Uygulandı
                                      </Button>
                                  )}
                                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDeleteRecord(calf.id)}>
                                      <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                               </div>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><PlusCircle /> Yeni Aşı Kaydı Ekle</CardTitle>
                    <CardDescription>Takvime yeni bir aşı planı ekleyin.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAddRecord} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="animalId">Buzağı ID</Label>
                            <Select name="id" onValueChange={handleAnimalSelectChange} value={newRecord.id}>
                                <SelectTrigger id="animalId">
                                    <SelectValue placeholder="Hayvan seçin" />
                                </SelectTrigger>
                                <SelectContent>
                                    {animals.map(animal => (
                                        <SelectItem key={animal.id} value={animal.id}>{animal.tagNumber} ({animal.breed})</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="birthDate">Doğum Tarihi</Label>
                            <Input id="birthDate" name="birthDate" type="date" value={newRecord.birthDate} onChange={handleInputChange} disabled />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="vaccine">Aşı Adı</Label>
                            <Select name="vaccine" onValueChange={(value) => handleSelectChange('vaccine', value)} value={newRecord.vaccine}>
                                <SelectTrigger id="vaccine">
                                    <SelectValue placeholder="Aşı seçin" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="IBR-BVD-PI3-BRSV (Karma 5)">IBR-BVD-PI3-BRSV (Karma 5)</SelectItem>
                                    <SelectItem value="Clostridial (Kara Hastalık)">Clostridial (Kara Hastalık)</SelectItem>
                                    <SelectItem value="Leptospira">Leptospira</SelectItem>
                                    <SelectItem value="Brusella">Brusella</SelectItem>
                                    <SelectItem value="Şap">Şap</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="scheduledDate">Planlanan Tarih</Label>
                            <Input id="scheduledDate" name="scheduledDate" type="date" value={newRecord.scheduledDate} onChange={handleInputChange} />
                        </div>
                        <Button type="submit" className="w-full">Kaydı Ekle</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
