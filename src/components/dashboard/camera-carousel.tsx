
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const videoFeeds = [
  {
    id: "feed-1",
    location: "Ahır 3 - Bölme A",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    status: "Anormal Yatma Davranışı",
    statusVariant: "secondary",
  },
  {
    id: "feed-2",
    location: "Doğumhane 1",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    status: "Analiz Ediliyor...",
    statusVariant: "default",
  },
  {
    id: "feed-3",
    location: "Beslenme Alanı",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    status: "Normal",
    statusVariant: "outline",
  },
  {
    id: "feed-4",
    location: "Süt Sağım Ünitesi",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    status: "Topallama Tespit Edildi",
    statusVariant: "destructive",
  },
];


export function CameraCarousel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Yapay Zeka Destekli Video Analizi</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center px-12">
        <Carousel className="w-full max-w-2xl">
          <CarouselContent>
            {videoFeeds.map((feed) => (
              <CarouselItem key={feed.id}>
                <div className="p-1">
                    <div className="relative aspect-video overflow-hidden rounded-lg border">
                      <video
                        src={feed.videoUrl}
                        className="h-full w-full object-cover"
                        playsInline
                        muted
                        loop
                        autoPlay
                      />
                      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-black/60 p-2 text-white text-sm">
                        <span>{feed.location}</span>
                        <Badge variant={feed.statusVariant as any} className="text-xs">{feed.status}</Badge>
                      </div>
                    </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardContent>
    </Card>
  );
}
