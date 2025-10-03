import { useState, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { artworks } from "@/data/artworks";
import { Volume2, VolumeX, ArrowLeft, QrCode, Eye, ScanLine } from "lucide-react";
import QRCode from "react-qr-code";

export default function ArtworkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lang, setLang] = useState("fr");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const artwork = artworks.find((a) => a.id === id);

  // Check if user has scanned the QR code for this artwork
  useEffect(() => {
    const hasScanned = sessionStorage.getItem(`artwork_scanned_${id}`);
    if (!hasScanned) {
      // Redirect to QR scanner if not scanned
      navigate('/qr-scanner', { replace: true });
    }
  }, [id, navigate]);

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

  // Check again after artwork is found
  const hasScanned = sessionStorage.getItem(`artwork_scanned_${id}`);
  if (!hasScanned) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <ScanLine className="w-16 h-16 mx-auto mb-6 text-primary animate-pulse" />
          <h1 className="text-2xl font-bold mb-4">
            {lang === "fr" ? "QR Code requis" : lang === "en" ? "QR Code Required" : "QR Code laaj na"}
          </h1>
          <p className="text-muted-foreground mb-6">
            {lang === "fr" 
              ? "Vous devez scanner le QR Code de l'œuvre pour accéder à cette page." 
              : lang === "en"
              ? "You must scan the artwork's QR Code to access this page."
              : "Laaj nga scan QR Code bi ngir gis xët bi."}
          </p>
          <Link to="/qr-scanner">
            <Button className="gap-2">
              <QrCode className="w-4 h-4" />
              {lang === "fr" ? "Scanner un QR Code" : lang === "en" ? "Scan QR Code" : "Scan QR Code"}
            </Button>
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
        // Simulation d'audio - dans une vraie app, vous auriez des fichiers audio
        const utterance = new SpeechSynthesisUtterance(t.description);
        utterance.lang = lang === "fr" ? "fr-FR" : lang === "en" ? "en-US" : "wo-SN";
        speechSynthesis.speak(utterance);
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentLang={lang} onLanguageChange={setLang} />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/gallery">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className="w-4 h-4" />
              {lang === "fr" ? "Retour" : lang === "en" ? "Back" : "Dellu"}
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Section */}
            <div className="animate-fade-in">
              <Card className="overflow-hidden shadow-elegant">
                <div className="aspect-square relative">
                  <img
                    src={artwork.image}
                    alt={t.title}
                    className="w-full h-full object-cover"
                  />
                  {artwork.hasAR && (
                    <div className="absolute top-4 right-4">
                      <Badge className="gap-1 bg-accent text-accent-foreground">
                        <Eye className="w-3 h-3" />
                        AR Available
                      </Badge>
                    </div>
                  )}
                </div>
              </Card>

              {/* QR Code Section */}
              <Card className="mt-6 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">
                    {lang === "fr" ? "QR Code" : lang === "en" ? "QR Code" : "QR Code"}
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
                  <div className="flex justify-center p-4 bg-background rounded-lg animate-fade-in">
                    <QRCode value={currentUrl} size={200} />
                  </div>
                )}
                <p className="text-sm text-muted-foreground mt-4">
                  {lang === "fr"
                    ? "Scannez ce QR code pour partager cette œuvre"
                    : lang === "en"
                    ? "Scan this QR code to share this artwork"
                    : "Scan QR code bii ngir takk nataal bii"}
                </p>
              </Card>
            </div>

            {/* Content Section */}
            <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
              {/* Title and Period */}
              <div className="mb-6">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-gold bg-clip-text text-transparent">
                  {t.title}
                </h1>
                <div className="flex gap-3">
                  <Badge variant="secondary">{artwork.category}</Badge>
                  <Badge variant="outline">{artwork.period}</Badge>
                </div>
              </div>

              {/* Audio Player */}
              {artwork.hasAudio && (
                <Card className="p-4 mb-6 bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Volume2 className="w-5 h-5 text-primary" />
                      <span className="font-medium">
                        {lang === "fr"
                          ? "Audio description"
                          : lang === "en"
                          ? "Audio description"
                          : "Jàng bu dëgg"}
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
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  {lang === "fr" ? "Description" : lang === "en" ? "Description" : "Waxtan"}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t.description}
                </p>
              </div>

              {/* History */}
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  {lang === "fr" ? "Histoire" : lang === "en" ? "History" : "Taariix"}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t.history}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <audio ref={audioRef} />
    </div>
  );
}
