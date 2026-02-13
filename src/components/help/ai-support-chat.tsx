'use client'

import { useState, useRef, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Bot, Send, User, Upload } from "lucide-react";
import { analyzeBirthVideo } from "@/ai/flows/ai-analyze-birth-video";

type ChatMessage = {
  sender: 'user' | 'ai';
  text: string;
};

/** ✅ Hayvanla ilgili mi? (sadece hayvan sağlığı/davranışı) */
const isAnimalRelated = (text: string) => {
  const t = text.toLowerCase();

  const animalKeywords = [
    "kedi", "köpek", "kuş", "tavuk", "horoz", "civciv", "ördek", "kaz",
    "inek", "dana", "buzağı", "boğa", "koyun", "keçi", "kuzu",
    "at", "eşek", "domuz", "pet", "hayvan", "sürü",
    "veteriner", "aşı", "parazit", "kene", "bit", "pire"
  ];

  const symptomKeywords = [
    "hasta", "ishal", "kus", "kustu", "kusuyor", "ateş", "titreme",
    "öksür", "öksürüyor", "nefes", "solunum", "hırıltı", "garip ses", "inleme",
    "topall", "yürü", "iştah", "yemiyor", "mama yemiyor", "su içmiyor",
    "kan", "yar", "şiş", "şişlik", "ağrı", "halsiz", "uyuşuk",
    "doğum", "geb", "sancı", "plasenta",
    "idrar", "dışkı", "kabız", "salya", "göz", "kulak", "deri", "kaşın"
  ];

  return [...animalKeywords, ...symptomKeywords].some(k => t.includes(k));
};

/** ✅ Acil/riskli durum sinyali */
const isEmergency = (text: string) => {
  const t = text.toLowerCase();
  const emergencySignals = [
    "nefes alam", "boğul", "morard", "bayıl", "bilinci kapalı", "nöbet",
    "şiddetli kan", "durmayan kanama", "kan kus", "çok kan",
    "zehir", "zehirlendi", "toksik", "ilaç yuttu",
    "karın şiş", "şiddetli ağrı", "kırık", "travma", "araba çarptı",
    "doğumda takıldı", "doğum yapamıyor", "uzun süredir sancı",
    "gözü dışarı", "yanık", "ısı çarpması"
  ];
  return emergencySignals.some(s => t.includes(s));
};

/** ✅ Veteriner tarzı yanıt üret (AI çağırmadan, onboarding yok) */
const buildVetReply = (question: string) => {
  const q = question.toLowerCase();

  const isCat = q.includes("kedi");
  const isDog = q.includes("köpek");
  const animal = isCat ? "kediniz" : isDog ? "köpeğiniz" : "hayvanınız";

  const vomiting = q.includes("kus") || q.includes("kustu") || q.includes("kusuyor");
  const diarrhea = q.includes("ishal") || q.includes("sulu dışkı");
  const notEating = q.includes("yemiyor") || q.includes("iştah") || q.includes("mama yemiyor");
  const lethargy = q.includes("halsiz") || q.includes("uyuşuk") || q.includes("bitkin");
  const breathing = q.includes("nefes") || q.includes("solunum") || q.includes("hırılt");
  const weirdSound = q.includes("garip ses") || q.includes("inleme") || q.includes("çığlık") || q.includes("miyav") || q.includes("havla");

  const redFlags = [
    "kan", "kanlı", "siyah dışkı", "bayıl", "nöbet", "morard",
    "zehir", "zehirlendi", "şiddetli ağrı", "karın şiş"
  ].some(k => q.includes(k));

  if (redFlags || breathing || isEmergency(question)) {
    return (
      `Anlattıklarınız acil/riskli olabilir. ${animal} için vakit kaybetmeden en yakın veterinere başvurun.\n\n` +
      `Kırmızı bayraklar (beklemeyin): nefes alma güçlüğü, bayılma/nöbet, durmayan kanama, kanlı kusma/dışkı, zehirlenme şüphesi, şiddetli ağrı, travma.\n\n` +
      `İsterseniz sizi canlı veteriner hattımıza bağlayalım.`
    );
  }

  if (vomiting) {
    return (
      `${animal} kusuyorsa olası nedenler: mide hassasiyeti, hızlı yeme, besin değişikliği, tüy yumağı (kedi), enfeksiyon/parazit, yabancı cisim vb.\n\n` +
      `Evde güvenli ilk adımlar:\n` +
      `1) 6–8 saat mama vermeyin (su serbest; sık kusuyorsa suyu küçük yudumlarla verin).\n` +
      `2) Kusma durursa küçük porsiyonlarla hafif gıdaya geçin (veteriner diyeti varsa onu tercih edin).\n` +
      `3) 24 saat içinde düzelmezse, kusma tekrarlarsa veya halsizlik/iştahsızlık eşlik ederse veterinere gidin.\n\n` +
      `Şunları yazarsanız daha net yönlendireyim: kaç kez kustu, köpük/kan var mı, su içiyor mu, dışkı normal mi, yaşı/kilosu, son 24 saatte mama değişti mi?\n\n` +
      `İsterseniz sizi canlı veteriner hattımıza bağlayalım.`
    );
  }

  if (diarrhea) {
    return (
      `${animal} ishal olduysa olası nedenler: beslenme değişikliği, stres, enfeksiyon/parazit, bozulmuş gıda vb.\n\n` +
      `Evde güvenli takip:\n` +
      `• Su kaybı riski için suya erişimi mutlaka olsun.\n` +
      `• 24 saat içinde düzelme yoksa veya kanlı/siyah dışkı, kusma, belirgin halsizlik varsa veterinere gidin.\n\n` +
      `Şunları yaz: kaç gündür, dışkıda kan var mı, kusma var mı, iştah-suya dokunuyor mu, aşı/parazit durumu?\n\n` +
      `İsterseniz sizi canlı veteriner hattımıza bağlayalım.`
    );
  }

  if (notEating || lethargy) {
    return (
      `${animal} iştahsız/halsizse bunu ciddiye almak gerekir; ağrı, ateş, enfeksiyon, sindirim sorunu, stres vb. nedenler olabilir.\n\n` +
      `Evde güvenli ilk adımlar:\n` +
      `• Su içip içmediğini takip edin.\n` +
      `• 12–24 saat içinde iştah açılmıyorsa (özellikle yavru/yaşlıysa daha erken) veterinere gidin.\n\n` +
      `Şunları yaz: tür/yaş/kilo, ne zamandır yemiyor, su içiyor mu, kusma/ishal var mı, normalden farklı davranış var mı?\n\n` +
      `İsterseniz sizi canlı veteriner hattımıza bağlayalım.`
    );
  }

  if (weirdSound) {
    return (
      `${animal} “garip ses” çıkarıyorsa bunun sebebi ağrı, stres/korku, solunum irritasyonu, yabancı cisim, diş/boğaz problemi vb. olabilir.\n\n` +
      `Şunları kontrol et:\n` +
      `• Nefes alışı normal mi? Ağız açık soluma, hırıltı, morarma var mı?\n` +
      `• Ağrı belirtisi var mı (saklanma, dokununca tepki, topallama)?\n\n` +
      `Eğer nefes zorlanması, morarma, bayılma, sürekli çığlık/şiddetli ağrı varsa acil veterinere gidin.\n\n` +
      `İsterseniz sizi canlı veteriner hattımıza bağlayalım.`
    );
  }

  return (
    `Hayvan sağlığı/davranışı konusunda yardımcı olabilirim. Daha doğru yönlendirme için şunları yaz:\n` +
    `• Tür/yaş/kilo\n• Belirti tam olarak ne ve ne zamandır\n• İştah-su durumu\n• Kusma/ishal/dışkı-idrar\n• Solunum normal mi\n• Aşı/parazit geçmişi\n\n` +
    `İsterseniz sizi canlı veteriner hattımıza bağlayalım.`
  );
};

export function AISupportChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isAITyping, startTransition] = useTransition();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isAITyping]);

  useEffect(() => {
    setMessages([
      {
        sender: 'ai',
        text:
          "Merhaba, ben VetAI asistanınız. Bu sohbet yalnızca hayvan sağlığı ve davranışı ile ilgili soruları yanıtlar. " +
          "Belirtiyi yazabilir veya analiz için video yükleyebilirsiniz. " +
          "İsterseniz sizi canlı veteriner hattımıza da bağlayabiliriz."
      }
    ]);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const currentInput = input.trim();
    const userMessage: ChatMessage = { sender: 'user', text: currentInput };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // ✅ Hayvan dışı soruları tamamen reddet
    if (!isAnimalRelated(currentInput)) {
      const aiMessage: ChatMessage = {
        sender: 'ai',
        text:
          "Bu sohbet sadece hayvan sağlığı ve davranışı ile ilgili soruları yanıtlar; günlük/genel sorulara yanıt veremem. " +
          "Hayvanınızın türünü ve belirtileri yazarsanız yardımcı olabilirim.\n\n" +
          "İsterseniz sizi canlı veteriner hattımıza bağlayalım."
      };
      setMessages(prev => [...prev, aiMessage]);
      return;
    }

    startTransition(async () => {
      try {
        // ✅ Riskliyse/normal ise aynı yerden yönetiyoruz
        const reply = buildVetReply(currentInput);
        const aiMessage: ChatMessage = { sender: 'ai', text: reply };
        setMessages(prev => [...prev, aiMessage]);
      } catch (error) {
        console.error("AI chat failed:", error);
        const errorMessage: ChatMessage = {
          sender: 'ai',
          text:
            "Üzgünüm, bir hata oluştu. Lütfen daha sonra tekrar deneyin.\n\n" +
            "İsterseniz sizi canlı veteriner hattımıza bağlayalım."
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const userMessage: ChatMessage = { sender: 'user', text: `Dosya yükleniyor: ${file.name}` };
      setMessages(prev => [...prev, userMessage]);

      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        startTransition(async () => {
          try {
            const result = await analyzeBirthVideo({ videoDataUri: dataUri });
            const aiText =
              `${result.analysisResult}\n\n` +
              "Not: Bu bir ön bilgilendirmedir; riskli belirti varsa veterinere başvurun.\n" +
              "İsterseniz sizi canlı veteriner hattımıza bağlayalım.";

            const aiMessage: ChatMessage = { sender: 'ai', text: aiText };
            setMessages(prev => [...prev, aiMessage]);
          } catch (error) {
            console.error("Analysis failed:", error);
            const errorMessage: ChatMessage = {
              sender: 'ai',
              text:
                "Analiz sırasında bir hata oluştu. Lütfen geçerli bir video/görsel yüklediğinizden emin olun.\n\n" +
                "İsterseniz sizi canlı veteriner hattımıza bağlayalım."
            };
            setMessages(prev => [...prev, errorMessage]);
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col h-full border rounded-lg p-4 space-y-4">
      <div className="flex-grow h-[350px] space-y-4 overflow-y-auto pr-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}
          >
            {message.sender === 'ai' && (
              <Avatar className="h-8 w-8 border-2 border-primary">
                <AvatarFallback><Bot /></AvatarFallback>
              </Avatar>
            )}

            <div
              className={`max-w-[85%] rounded-lg px-4 py-2 text-sm ${message.sender === 'user'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted'
                }`}
            >
              {message.text}
            </div>

            {message.sender === 'user' && (
              <Avatar className="h-8 w-8">
                <AvatarFallback><User /></AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}

        {isAITyping && (
          <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8 border-2 border-primary">
              <AvatarFallback><Bot /></AvatarFallback>
            </Avatar>
            <div className="max-w-xs rounded-lg bg-muted px-4 py-2 text-sm animate-pulse">
              ...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="flex gap-2 border-t pt-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="video/*,image/*"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleUploadClick}
          disabled={isAITyping}
        >
          <Upload className="h-4 w-4" />
        </Button>

        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Sadece hayvan sağlığı/davranışı sorusu yazın..."
          disabled={isAITyping}
          className="flex-grow"
        />

        <Button type="submit" disabled={isAITyping || input.trim() === ""} size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}