'use client'

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ArrowLeft, MessageSquare, Send, User, UserRound } from "lucide-react";

type ChatMessage = {
  sender: 'user' | 'vet';
  text: string;
};

type Vet = {
  id: string;
  name: string;
  specialty: string;
};

const availableVets: Vet[] = [
  { id: '1', name: 'Dr. Ahmet Yılmaz', specialty: 'Büyükbaş Hayvan Sağlığı' },
  { id: '2', name: 'Dr. Zeynep Kaya', specialty: 'Yeni Doğan ve Buzağı Hastalıkları' },
  { id: '3', name: 'Dr. Mustafa Öztürk', specialty: 'Sürü Yönetimi ve Beslenme' },
  { id: '4', name: 'Dr. Elif Güneş', specialty: 'Beslenme ve Rasyon Danışmanlığı' },
  { id: '5', name: 'Dr. Barış Kurtuluş', specialty: 'Genel Cerrahi ve Ortopedi' },
];

const vetResponses = [
  "Anlıyorum. Hayvanın ID'sini ve gözlemlediğiniz belirtileri daha detaylı anlatabilir misiniz?",
  "Peki, bu durum ne kadar süredir devam ediyor? Başka hayvanlarda da benzer bir durum gözlemlediniz mi?",
  "Anlattıklarınıza göre bu bir topallama başlangıcı olabilir. Size yardımcı olması için sistemdeki 'Anormal Yatma Davranışı' alarmını kontrol etmenizi ve ilgili hayvanın son 24 saatlik video kaydını incelemenizi öneririm. Ayrıca, bölgedeki diğer veteriner hekimlerden gelen benzer vakalar olup olmadığını kontrol edeceğim.",
  "Rica ederim, her zaman yardımcı olmaya hazırım. Lütfen gelişmeleri bildirin. Geçmiş olsun."
];

function ChatInterface({ vet, onBack }: { vet: Vet; onBack: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isVetTyping, setIsVetTyping] = useState(false);
  const [responseIndex, setResponseIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isVetTyping]);

  useEffect(() => {
    setMessages([
      { sender: 'vet', text: `Merhaba, ben ${vet.name}. Size nasıl yardımcı olabilirim?` }
    ]);
  }, [vet]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const userMessage: ChatMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsVetTyping(true);

    setTimeout(() => {
      const vetMessage: ChatMessage = {
        sender: 'vet',
        text: vetResponses[responseIndex] || "Üzgünüm, şu an daha fazla yardımcı olamıyorum. Lütfen daha sonra tekrar deneyin."
      };
      setMessages(prev => [...prev, vetMessage]);
      setResponseIndex(prev => prev + 1);
      setIsVetTyping(false);
    }, 1500 + Math.random() * 500);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b p-2">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Avatar className="h-10 w-10 border-2 border-green-500">
          <AvatarFallback className="bg-primary/15 text-primary">
            <UserRound className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold">{vet.name}</p>
          <p className="text-xs text-muted-foreground">{vet.specialty}</p>
        </div>
      </div>

      <div className="h-[300px] flex-grow space-y-4 overflow-y-auto p-4 pr-2">
        {messages.map((message, index) => (
          <div key={index} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
            {message.sender === 'vet' && (
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/15 text-primary">
                  <UserRound className="h-3.5 w-3.5" />
                </AvatarFallback>
              </Avatar>
            )}
            <div className={`max-w-[85%] rounded-lg px-4 py-2 text-sm ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              {message.text}
            </div>
            {message.sender === 'user' && (
              <Avatar className="h-8 w-8">
                <AvatarFallback><User /></AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}

        {isVetTyping && (
          <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/15 text-primary">
                <UserRound className="h-3.5 w-3.5" />
              </AvatarFallback>
            </Avatar>
            <div className="max-w-xs animate-pulse rounded-lg bg-muted px-4 py-2 text-sm">...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="flex gap-2 border-t p-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Mesajınızı yazın..."
          disabled={isVetTyping}
          className="flex-grow"
        />
        <Button type="submit" disabled={isVetTyping || input.trim() === ""} size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}

function VetSelection({ onSelectVet }: { onSelectVet: (vet: Vet) => void }) {
  return (
    <div className="space-y-3">
      <h4 className="text-center text-sm font-medium text-muted-foreground">Görüşmek istediğiniz uzmanı seçin.</h4>
      {availableVets.map((vet) => (
        <button
          key={vet.id}
          className="flex w-full items-center justify-between rounded-md border p-3 transition-colors hover:bg-muted"
          onClick={() => onSelectVet(vet)}
        >
          <div className="flex items-center gap-3 text-left">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary/15 text-primary">
                <UserRound className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold">{vet.name}</p>
              <p className="text-xs text-muted-foreground">{vet.specialty}</p>
            </div>
          </div>
          <MessageSquare className="h-5 w-5 text-muted-foreground" />
        </button>
      ))}
    </div>
  );
}

export function LiveSupportChat() {
  const [selectedVet, setSelectedVet] = useState<Vet | null>(null);

  const handleSelectVet = (vet: Vet) => {
    setSelectedVet(vet);
  };

  const handleBackToList = () => {
    setSelectedVet(null);
  };

  return (
    <div className="flex h-full flex-col rounded-lg border">
      {!selectedVet ? (
        <div className="flex flex-grow flex-col justify-center p-4">
          <VetSelection onSelectVet={handleSelectVet} />
        </div>
      ) : (
        <ChatInterface vet={selectedVet} onBack={handleBackToList} />
      )}
    </div>
  );
}
