import { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { artworks } from "@/data/artworks";
import { Volume2, VolumeX, ArrowLeft, Eye, QrCode, Copy } from "lucide-react";
import QRCode from "react-qr-code";

export default function ArtworkDetail() {
  const { id } = useParams();
  const [lang, setLang] = useState("fr");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const artwork = artworks.find((a) => a.id === id);

  if (!artwork) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Œuvre non trouvée</h1>
          <Link to="/gallery">
            <Button>Retour à la galerie</Button>
          </Link>
        </div>
      </div>
    );
  }

  const t = artwork.translations[lang as keyof typeof artwork.translations];
  const currentUrl = window.location.href;

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        const utterance = new SpeechSynthesisUtterance(t.description);
        utterance.lang = lang === "fr" ? "fr-FR" : lang === "en" ? "en-US" : "wo-SN";
        speechSynthesis.speak(utterance);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(currentUrl);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentLang={lang} onLanguageChange={setLang} />

      <main className="pt-24 pb-16 px-4">
        {/* Back Button */}
        <div className="max-w-3xl mx-auto">
          <Link to="/gallery">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className="w-4 h-4" />
              {lang === "fr" ? "Retour" : lang === "en" ? "Back" : "Dellu"}
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image & QR */}
            <div className="flex flex-col gap-6">
              {/* Image */}
              <Card className="overflow-hidden shadow-elegant">
                <div className="relative w-full aspect-square">
                  <img
                    src={artwork.image}
                    alt={t.title}
                    className="w-full h-full object-cover"
                  />
                  {artwork.hasAR && (
                    <Badge className="absolute top-4 right-4 gap-1 bg-accent text-accent-foreground">
                      <Eye className="w-3 h-3" />
                      AR Available
                    </Badge>
                  )}
                </div>
              </Card>

              {/* QR Code Share */}
              <Card className="p-4 flex flex-col items-center gap-4">
                <div className="flex justify-between w-full items-center">
                  <h3 className="font-semibold text-lg">
                    {lang === "fr" ? "Partager via QR Code" : lang === "en" ? "Share via QR Code" : "Takk ak QR Code"}
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowQR(!showQR)}
                    className="gap-2"
                  >
                    <QrCode className="w-4 h-4" />
                    {showQR
                      ? lang === "fr"
                        ? "Masquer"
                        : lang === "en"
                        ? "Hide"
                        : "Nëbb"
                      : lang === "fr"
                      ? "Afficher"
                      : lang === "en"
                      ? "Show"
                      : "Wone"}
                  </Button>
                </div>

                {showQR && (
                  <div className="flex flex-col items-center gap-2">
                    <QRCode value={currentUrl} size={200} />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyLink}
                      className="gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      {lang === "fr" ? "Copier le lien" : lang === "en" ? "Copy Link" : "Dugal Link"}
                    </Button>
                    <p className="text-sm text-muted-foreground text-center">
                      {lang === "fr"
                        ? "Scannez ce QR code pour partager cette œuvre avec vos amis"
                        : lang === "en"
                        ? "Scan this QR code to share this artwork with your friends"
                        : "Scan QR code bii ngir takk nataal bii ak xarit yi"}
                    </p>
                  </div>
                )}
              </Card>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-6">
              {/* Title & badges */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-gold bg-clip-text text-transparent">
                  {t.title}
                </h1>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{artwork.category}</Badge>
                  <Badge variant="outline">{artwork.period}</Badge>
                </div>
              </div>

              {/* Audio Player */}
              {artwork.hasAudio && (
                <Card className="p-4 bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Volume2 className="w-5 h-5 text-primary" />
                      <span className="font-medium">
                        {lang === "fr" ? "Audio description" : lang === "en" ? "Audio description" : "Jàng bu dëgg"}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant={isPlaying ? "destructive" : "default"}
                      onClick={toggleAudio}
                      className="gap-2"
                    >
                      {isPlaying ? (
                        <>
                          <VolumeX className="w-4 h-4" />
                          {lang === "fr" ? "Arrêter" : lang === "en" ? "Stop" : "Taxaw"}
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4" />
                          {lang === "fr" ? "Écouter" : lang === "en" ? "Listen" : "Dégg"}
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              )}

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold mb-2">{lang === "fr" ? "Description" : lang === "en" ? "Description" : "Waxtan"}</h2>
                <p className="text-base text-muted-foreground leading-relaxed">{t.description}</p>
              </div>

              {/* History */}
              <div>
                <h2 className="text-xl font-semibold mb-2">{lang === "fr" ? "Histoire" : lang === "en" ? "History" : "Taariix"}</h2>
                <p className="text-base text-muted-foreground leading-relaxed">{t.history}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <audio ref={audioRef} />
    </div>
  );
}
