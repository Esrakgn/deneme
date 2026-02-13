'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Baby, Video, Upload, AlertTriangle, ShieldCheck } from "lucide-react";
import { useState, useRef, useTransition, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { analyzeBirthVideo, AnalyzeBirthVideoOutput } from "@/ai/flows/ai-analyze-birth-video";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

type CocoDet = {
  detect: (
    input: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement
  ) => Promise<
    Array<{
      bbox: [number, number, number, number];
      class: string;
      score: number;
    }>
  >;
};

export default function NewbornAnalysisPage() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] =
    useState<AnalyzeBirthVideoOutput | null>(null);
  const [isAnalyzing, startTransition] = useTransition();

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [detector, setDetector] = useState<CocoDet | null>(null);
  const [cowScore, setCowScore] = useState<number | null>(null);
  const [cowCount, setCowCount] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setAnalysisResult(null);
      setCowScore(null);

      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        startTransition(async () => {
          try {
            const result = await analyzeBirthVideo({
              videoDataUri: dataUri,
            });
            setAnalysisResult(result);
          } catch (error) {
            console.error("Analysis failed:", error);
            setAnalysisResult({
              isBirthStarting: false,
              analysisResult:
                "Analiz sırasında bir hata oluştu. Lütfen tekrar deneyin.",
            });
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const getHealthStatus = () => {
    if (isAnalyzing) return "Analiz Ediliyor...";
    if (!analysisResult) return "Video Bekleniyor";
    return analysisResult.isBirthStarting
      ? "Doğum Başlıyor!"
      : "Normal Durum";
  };

  const getBadgeVariant = () => {
    if (isAnalyzing || !analysisResult) return "default";
    return analysisResult.isBirthStarting ? "destructive" : "outline";
  };

  // MODEL YÜKLEME
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const cocoSsd = await import("@tensorflow-models/coco-ssd");
        await import("@tensorflow/tfjs");
        const model = await (cocoSsd as any).load({
          base: "lite_mobilenet_v2",
        });
        if (!cancelled) setDetector(model as CocoDet);
      } catch (e) {
        console.error("Coco-SSD yüklenemedi:", e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // VIDEO ÜZERİNDE TESPİT
  useEffect(() => {
    if (!videoRef.current || !canvasRef.current || !detector) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;

    const offscreen = document.createElement("canvas");
    const offctx = offscreen.getContext("2d")!;

    let raf = 0;
    let running = true;
    const THRESHOLD = 0.3;

    const resizeOverlay = () => {
      const rect = video.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const loop = async () => {
      if (!running) return;

      resizeOverlay();

      if (
        video.readyState >= 2 &&
        !video.paused &&
        !video.ended
      ) {
        const inW = video.videoWidth;
        const inH = video.videoHeight;

        offscreen.width = inW;
        offscreen.height = inH;
        offctx.drawImage(video, 0, 0, inW, inH);

        const preds = await detector.detect(offscreen);

        const cows = preds.filter(
          (p) => p.class === "cow" && p.score >= THRESHOLD
        );

        if (cows.length) {
          setCowScore(Math.max(...cows.map((c) => c.score)));
          setCowCount(cows.length);
        } else {
          setCowScore(null);
          setCowCount(0);
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        cows.forEach((cow) => {
          const [x, y, w, h] = cow.bbox;
          ctx.strokeStyle = "rgba(16,185,129,1)";
          ctx.lineWidth = 3;
          ctx.strokeRect(x, y, w, h);
        });
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
    };
  }, [videoSrc, detector]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">
        Yeni Doğan Analizi
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video /> Video Analizi
            </CardTitle>
            <CardDescription>
              Doğum sürecini analiz etmek için video yükleyin.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden relative">
              {videoSrc ? (
                <>
                  <video
                    ref={videoRef}
                    src={videoSrc}
                    controls
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover"
                  />
                  <canvas
                    ref={canvasRef}
                    className="absolute inset-0 pointer-events-none"
                  />
                  {cowCount > 0 && (
                    <div className="absolute top-2 left-2 bg-emerald-600 text-white px-2 py-1 text-xs rounded">
                      İnek tespiti:{" "}
                      {(cowScore! * 100).toFixed(1)}% •{" "}
                      {cowCount} adet
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Video yükleyin
                </div>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="video/*"
            />
            <Button onClick={handleUploadClick} className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Video Yükle ve Analiz Et
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Baby /> Sağlık Değerlendirmesi
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <Badge
              className="text-2xl px-4 py-2"
              variant={getBadgeVariant()}
            >
              {getHealthStatus()}
            </Badge>

            {analysisResult && (
              <p className="text-sm text-muted-foreground">
                {analysisResult.analysisResult}
              </p>
            )}

            {!analysisResult && (
              <p className="text-sm text-muted-foreground">
                Analiz için video yükleyin.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
