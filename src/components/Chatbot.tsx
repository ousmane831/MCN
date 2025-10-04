import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, X, Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatbotProps {
  lang: string;
}

export default function Chatbot({ lang }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const placeholders = {
    fr: "Posez votre question...",
    en: "Ask your question...",
    wo: "Laaj sa làkk...",
  };

  const welcomeMessages = {
    fr: "Bonjour ! Je suis votre guide virtuel du Musée des Civilisations Noires. Comment puis-je vous aider aujourd'hui ?",
    en: "Hello! I'm your virtual guide at the Museum of Black Civilizations. How can I help you today?",
    wo: "Salaam aleekum! Maa ngi ci gëm-gëm bu Musée bu Yéenal Ñuul. Naka man a mën a dimbal la?",
  };

  // Message de bienvenue
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: welcomeMessages[lang as keyof typeof welcomeMessages] || welcomeMessages.fr,
        },
      ]);
    }
  }, [isOpen, lang]);

  // Scroll automatique
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("museum-chat", {
        body: {
          messages: [...messages, userMessage],
          language: lang,
        },
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: "assistant",
        content: data.choices[0].message.content,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: lang === "fr" ? "Erreur" : lang === "en" ? "Error" : "Njumte",
        description:
          lang === "fr"
            ? "Impossible d'envoyer le message"
            : lang === "en"
            ? "Failed to send message"
            : "Dëkk wu-añ ci yónnë bataaxal",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className={`fixed ${isMobile ? 'bottom-4 right-4 h-12 w-12' : 'bottom-8 right-8 h-14 w-14'} rounded-full shadow-elegant hover:shadow-warm transition-all z-50 flex items-center justify-center`}
          size="icon"
        >
          <div className="relative">
            <Bot className={isMobile ? "h-6 w-6" : "h-7 w-7"} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              AI
            </span>
          </div>
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed ${isMobile ? 'inset-4 w-auto h-auto' : 'bottom-8 right-8 w-96 h-[600px]'} bg-card border border-border rounded-2xl shadow-2xl flex flex-col z-50 animate-fade-in`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-gold">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  {lang === "fr" ? "Guide MCN" : lang === "en" ? "MCN Guide" : "Gëm-gëm MCN"}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {lang === "fr" ? "En ligne" : lang === "en" ? "Online" : "Ci leer"}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl px-4 py-2">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={placeholders[lang as keyof typeof placeholders] || placeholders.fr}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                size="icon"
                className="h-10 w-10"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
