
'use client';

import { useState, useContext, FormEvent } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PawPrint, PlusCircle, Trash2, Search } from "lucide-react";
import { AnimalContext, NewAnimal } from "@/context/AnimalContext";

export default function AnimalManagementPage() {
    const { animals, addAnimal, deleteAnimal } = useContext(AnimalContext);
    const [newAnimal, setNewAnimal] = useState<Omit<NewAnimal, 'id' | 'tagNumber'> & { tagNumber: string }>({
        tagNumber: '',
        breed: '',
        birthDate: '',
        gender: ''
    });
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewAnimal(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSelectChange = (name: string, value: string) => {
        setNewAnimal(prev => ({ ...prev, [name]: value }));
    };

    const handleAddAnimal = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newAnimal.tagNumber && newAnimal.breed && newAnimal.birthDate && newAnimal.gender) {
            addAnimal({ ...newAnimal, id: newAnimal.tagNumber });
            setNewAnimal({ tagNumber: '', breed: '', birthDate: '', gender: '' });
        } else {
            alert("Lütfen tüm alanları doldurun.");
        }
    };

    const handleDelete = (id: string) => {
        if (window.confirm(`${id} küpe numaralı hayvanı silmek istediğinizden emin misiniz?`)) {
            deleteAnimal(id);
        }
    };

    const filteredAnimals = animals.filter(animal =>
        animal.tagNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.breed.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold font-headline">Hayvan Yönetimi</h1>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><PawPrint /> Sürü Listesi</CardTitle>
                            <CardDescription>Sürüdeki tüm hayvanları görüntüleyin, arayın ve yönetin.</CardDescription>
                             <div className="flex items-center pt-4">
                                <div className="relative w-full max-w-sm">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Küpe no veya ırk ile ara..."
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
                                        <TableHead>Küpe Numarası</TableHead>
                                        <TableHead>Irk</TableHead>
                                        <TableHead>Doğum Tarihi</TableHead>
                                        <TableHead>Cinsiyet</TableHead>
                                        <TableHead className="text-right">Eylemler</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredAnimals.map((animal) => (
                                        <TableRow key={animal.id}>
                                            <TableCell className="font-medium">{animal.tagNumber}</TableCell>
                                            <TableCell>{animal.breed}</TableCell>
                                            <TableCell>{animal.birthDate}</TableCell>
                                            <TableCell>{animal.gender}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDelete(animal.id)}>
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
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
                            <CardTitle className="flex items-center gap-2"><PlusCircle /> Yeni Hayvan Ekle</CardTitle>
                            <CardDescription>Sisteme yeni bir hayvan kaydı oluşturun.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleAddAnimal} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="tagNumber">Küpe Numarası</Label>
                                    <Input id="tagNumber" name="tagNumber" value={newAnimal.tagNumber} onChange={handleInputChange} placeholder="Örn: TR-34-5678" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="breed">Irk</Label>
                                    <Select name="breed" onValueChange={(value) => handleSelectChange('breed', value)} value={newAnimal.breed}>
                                        <SelectTrigger id="breed">
                                            <SelectValue placeholder="Irk seçin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Simental">Simental</SelectItem>
                                            <SelectItem value="Holstein">Holstein</SelectItem>
                                            <SelectItem value="Angus">Angus</SelectItem>
                                            <SelectItem value="Montofon">Montofon (Brown Swiss)</SelectItem>
                                            <SelectItem value="Limuzin">Limuzin</SelectItem>
                                            <SelectItem value="Şarole">Şarole</SelectItem>
                                            <SelectItem value="Hereford">Hereford</SelectItem>
                                            <SelectItem value="Yerli Kara">Yerli Kara</SelectItem>
                                            <SelectItem value="Doğu Anadolu Kırmızısı">Doğu Anadolu Kırmızısı</SelectItem>
                                            <SelectItem value="Diğer">Diğer</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="birthDate">Doğum Tarihi</Label>
                                    <Input id="birthDate" name="birthDate" type="date" value={newAnimal.birthDate} onChange={handleInputChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="gender">Cinsiyet</Label>
                                    <Select name="gender" onValueChange={(value) => handleSelectChange('gender', value as any)} value={newAnimal.gender}>
                                        <SelectTrigger id="gender">
                                            <SelectValue placeholder="Cinsiyet seçin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Dişi">Dişi</SelectItem>
                                            <SelectItem value="Erkek">Erkek</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button type="submit" className="w-full">Hayvanı Ekle</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
