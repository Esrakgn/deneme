
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, ShieldAlert, WifiOff } from "lucide-react";
import { useState } from "react";
import Map, { Marker, Popup } from 'react-map-gl/maplibre';

type Outbreak = {
  id: string;
  longitude: number;
  latitude: number;
  disease: string;
  count: number;
};

// Mock data for city coordinates in Turkey
const cityCoordinates: { [key: string]: { lat: number; lon: number } } = {
    "Adana": { lat: 37.0000, lon: 35.3213 },
    "Adıyaman": { lat: 37.7648, lon: 38.2763 },
    "Afyonkarahisar": { lat: 38.7569, lon: 30.5387 },
    "Ağrı": { lat: 39.7191, lon: 43.0513 },
    "Amasya": { lat: 40.6500, lon: 35.8333 },
    "Ankara": { lat: 39.9334, lon: 32.8597 },
    "Antalya": { lat: 36.8969, lon: 30.7133 },
    "Artvin": { lat: 41.1828, lon: 41.8194 },
    "Aydın": { lat: 37.8469, lon: 27.8456 },
    "Balıkesir": { lat: 39.6533, lon: 27.8860 },
    "Bilecik": { lat: 40.1428, lon: 29.9792 },
    "Bingöl": { lat: 38.8856, lon: 40.4986 },
    "Bitlis": { lat: 38.4000, lon: 42.1000 },
    "Bolu": { lat: 40.7333, lon: 31.6000 },
    "Burdur": { lat: 37.7269, lon: 30.2928 },
    "Bursa": { lat: 40.1885, lon: 29.0610 },
    "Çanakkale": { lat: 40.1500, lon: 26.4167 },
    "Çankırı": { lat: 40.6000, lon: 33.6167 },
    "Çorum": { lat: 40.5500, lon: 34.9500 },
    "Denizli": { lat: 37.7769, lon: 29.0889 },
    "Diyarbakır": { lat: 37.9167, lon: 40.2333 },
    "Edirne": { lat: 41.6833, lon: 26.5667 },
    "Elazığ": { lat: 38.6833, lon: 39.2167 },
    "Erzincan": { lat: 39.7500, lon: 39.5000 },
    "Erzurum": { lat: 39.9000, lon: 41.2700 },
    "Eskişehir": { lat: 39.7667, lon: 30.5167 },
    "Gaziantep": { lat: 37.0667, lon: 37.3833 },
    "Giresun": { lat: 40.9167, lon: 38.3833 },
    "Gümüşhane": { lat: 40.4606, lon: 39.4744 },
    "Hakkâri": { lat: 37.5833, lon: 43.7333 },
    "Hatay": { lat: 36.4019, lon: 36.3494 },
    "Isparta": { lat: 37.7667, lon: 30.5500 },
    "Mersin": { lat: 36.8000, lon: 34.6167 },
    "İstanbul": { lat: 41.0082, lon: 28.9784 },
    "İzmir": { lat: 38.4237, lon: 27.1428 },
    "Kars": { lat: 40.6167, lon: 43.1000 },
    "Kastamonu": { lat: 41.3833, lon: 33.7833 },
    "Kayseri": { lat: 38.7333, lon: 35.4833 },
    "Kırklareli": { lat: 41.7333, lon: 27.2167 },
    "Kırşehir": { lat: 39.1500, lon: 34.1667 },
    "Kocaeli": { lat: 40.8533, lon: 29.8815 },
    "Konya": { lat: 37.8667, lon: 32.4833 },
    "Kütahya": { lat: 39.4167, lon: 29.9833 },
    "Malatya": { lat: 38.3500, lon: 38.3000 },
    "Manisa": { lat: 38.6167, lon: 27.4167 },
    "Kahramanmaraş": { lat: 37.5833, lon: 36.9333 },
    "Mardin": { lat: 37.3167, lon: 40.7333 },
    "Muğla": { lat: 37.2167, lon: 28.3667 },
    "Muş": { lat: 38.7461, lon: 41.4886 },
    "Nevşehir": { lat: 38.6167, lon: 34.7167 },
    "Niğde": { lat: 37.9667, lon: 34.6833 },
    "Ordu": { lat: 40.9833, lon: 37.8833 },
    "Rize": { lat: 41.0167, lon: 40.5167 },
    "Sakarya": { lat: 40.7500, lon: 30.4167 },
    "Samsun": { lat: 41.2833, lon: 36.3333 },
    "Siirt": { lat: 37.9333, lon: 41.9500 },
    "Sinop": { lat: 42.0289, lon: 35.1539 },
    "Sivas": { lat: 39.7500, lon: 37.0167 },
    "Tekirdağ": { lat: 40.9833, lon: 27.5167 },
    "Tokat": { lat: 40.3167, lon: 36.5500 },
    "Trabzon": { lat: 41.0000, lon: 39.7333 },
    "Tunceli": { lat: 39.1081, lon: 39.5406 },
    "Şanlıurfa": { lat: 37.1500, lon: 38.8000 },
    "Uşak": { lat: 38.6833, lon: 29.4000 },
    "Van": { lat: 38.5000, lon: 43.4000 },
    "Yozgat": { lat: 39.8167, lon: 34.8000 },
    "Zonguldak": { lat: 41.4500, lon: 31.7833 },
    "Aksaray": { lat: 38.3687, lon: 34.0370 },
    "Bayburt": { lat: 40.2551, lon: 40.2249 },
    "Karaman": { lat: 37.1809, lon: 33.2215 },
    "Kırıkkale": { lat: 39.8468, lon: 33.5153 },
    "Batman": { lat: 37.8812, lon: 41.1351 },
    "Şırnak": { lat: 37.5162, lon: 42.4578 },
    "Bartın": { lat: 41.6339, lon: 32.3375 },
    "Ardahan": { lat: 41.1105, lon: 42.7022 },
    "Iğdır": { lat: 39.9206, lon: 44.0450 },
    "Yalova": { lat: 40.6500, lon: 29.2667 },
    "Karabük": { lat: 41.2000, lon: 32.6167 },
    "Kilis": { lat: 36.7167, lon: 37.1167 },
    "Osmaniye": { lat: 37.0667, lon: 36.2500 },
    "Düzce": { lat: 40.8400, lon: 31.1594 }
};


function MapComponent({ outbreaks }: { outbreaks: Outbreak[] }) {
    const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;
    const [selectedOutbreak, setSelectedOutbreak] = useState<Outbreak | null>(null);

    if (!apiKey || apiKey === "YOUR_MAPTILER_API_KEY") {
        return <MapPlaceholder />;
    }

    const mapStyle = `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`;

    return (
        <div className="aspect-video w-full rounded-lg overflow-hidden">
            <Map
              initialViewState={{
                longitude: 35,
                latitude: 39,
                zoom: 5
              }}
              style={{width: '100%', height: '100%'}}
              mapStyle={mapStyle}
            >
              {outbreaks.map(outbreak => (
                <Marker key={outbreak.id} longitude={outbreak.longitude} latitude={outbreak.latitude}>
                  <button onClick={(e) => {
                    e.preventDefault();
                    setSelectedOutbreak(outbreak);
                  }} className="transform hover:scale-110 transition-transform">
                    <div className="relative">
                      <MapPin className="h-8 w-8 text-red-600 drop-shadow-lg" />
                      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                        {outbreak.count}
                      </span>
                    </div>
                  </button>
                </Marker>
              ))}

              {selectedOutbreak && (
                <Popup
                  longitude={selectedOutbreak.longitude}
                  latitude={selectedOutbreak.latitude}
                  onClose={() => setSelectedOutbreak(null)}
                  closeOnClick={false}
                  anchor="bottom"
                  offset={40}
                >
                  <div className="text-sm">
                    <p className="font-bold">{selectedOutbreak.disease}</p>
                    <p>Vaka Sayısı: <span className="font-semibold">{selectedOutbreak.count}</span></p>
                  </div>
                </Popup>
              )}
            </Map>
        </div>
    );
}

function MapPlaceholder() {
    return (
        <div className="aspect-video w-full bg-muted rounded-lg flex flex-col items-center justify-center text-center p-4">
            <WifiOff className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-bold text-lg">Harita Yüklenemedi</h3>
            <p className="text-muted-foreground text-sm">Haritayı görüntülemek için bir MapTiler API anahtarı gereklidir.</p>
            <p className="text-xs text-muted-foreground/70 mt-2">Projenizin kök dizininde bir `.env.local` dosyası oluşturun ve `NEXT_PUBLIC_MAPTILER_API_KEY` değişkenini ekleyin.</p>
        </div>
    );
}


export default function RegionalAnalysisPage() {
  const [outbreaks, setOutbreaks] = useState<Outbreak[]>([]);
  const [location, setLocation] = useState('');
  const [disease, setDisease] = useState('');

  const handleReportSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!location || !disease) {
      alert("Lütfen konum ve hastalık türünü seçin.");
      return;
    }

    const coordinates = cityCoordinates[location];
    if (!coordinates) {
      alert("Geçersiz konum. Lütfen listeden bir şehir seçin.");
      return;
    }

    setOutbreaks(prevOutbreaks => {
      const existingOutbreakIndex = prevOutbreaks.findIndex(
        ob => ob.latitude === coordinates.lat && ob.longitude === coordinates.lon && ob.disease === disease
      );

      if (existingOutbreakIndex !== -1) {
        // Increment count of existing outbreak
        const updatedOutbreaks = [...prevOutbreaks];
        updatedOutbreaks[existingOutbreakIndex] = {
          ...updatedOutbreaks[existingOutbreakIndex],
          count: updatedOutbreaks[existingOutbreakIndex].count + 1,
        };
        return updatedOutbreaks;
      } else {
        // Add new outbreak
        const newOutbreak: Outbreak = {
          id: `${coordinates.lat}-${coordinates.lon}-${disease}`,
          latitude: coordinates.lat,
          longitude: coordinates.lon,
          disease: disease,
          count: 1,
        };
        return [...prevOutbreaks, newOutbreak];
      }
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Bölgesel Analiz ve Salgın Haritası</h1>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><MapPin /> Türkiye Hastalık Sıcak Noktaları</CardTitle>
                    <CardDescription>Bölgesel olarak bildirilen salgınların yoğunluk haritasını görüntüleyin ve proaktif önlemler alın.</CardDescription>
                </CardHeader>
                <CardContent>
                    <MapComponent outbreaks={outbreaks} />
                </CardContent>
            </Card>
        </div>

        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><ShieldAlert /> Salgın Bildir</CardTitle>
                    <CardDescription>Bölgenizde bir salgın gözlemlediyseniz, haritaya ekleyerek diğer kullanıcıları bilgilendirin.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={handleReportSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="location">Konum (İl)</Label>
                            <Select onValueChange={setLocation} value={location}>
                                <SelectTrigger id="location">
                                    <SelectValue placeholder="Şehir seçin" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.keys(cityCoordinates).sort().map(city => (
                                        <SelectItem key={city} value={city}>{city}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="disease">Hastalık / Durum</Label>
                            <Select onValueChange={setDisease} value={disease}>
                                <SelectTrigger id="disease">
                                    <SelectValue placeholder="Hastalık türü seçin" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Şap Hastalığı">Şap Hastalığı</SelectItem>
                                    <SelectItem value="Kuş Gribi">Kuş Gribi</SelectItem>
                                    <SelectItem value="Antraks">Antraks</SelectItem>
                                    <SelectItem value="Bruselloz">Bruselloz</SelectItem>
                                    <SelectItem value="Mavi Dil">Mavi Dil</SelectItem>
                                    <SelectItem value="Topallama Artışı">Topallama Artışı</SelectItem>
                                    <SelectItem value="Anormal Yatma Davranışı">Anormal Yatma Davranışı</SelectItem>
                                    <SelectItem value="Diğer Anormal Durum">Diğer Anormal Durum</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button type="submit" className="w-full">Bildirimi Gönder</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
