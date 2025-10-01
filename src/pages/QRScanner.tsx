import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { QrCode, Camera, ArrowLeft } from "lucide-react";
import { artworks } from "@/data/artworks";
import { Link } from "react-router-dom";

export default function QRScanner() {
  const [lang, setLang] = useState("fr");
  const [artworkId, setArtworkId] = useState("");
  const navigate = useNavigate();

  const translations = {
    fr: {
      title: "Scanner un QR Code",
      subtitle: "Scannez le code sur l'œuvre ou saisissez son numéro",
      scanButton: "Activer la caméra",
      manualInput: "Ou saisissez le numéro de l'œuvre",
      placeholder: "Exemple: 1, 2, 3...",
      goButton: "Voir l'œuvre",
      back: "Retour",
      info: "Chaque œuvre du musée possède un QR Code unique. Scannez-le pour découvrir son histoire en détail.",
      demo: "Mode démo : Entrez 1, 2 ou 3 pour voir les œuvres disponibles",
    },
    en: {
      title: "Scan QR Code",
      subtitle: "Scan the code on the artwork or enter its number",
      scanButton: "Activate Camera",
      manualInput: "Or enter the artwork number",
      placeholder: "Example: 1, 2, 3...",
      goButton: "View Artwork",
      back: "Back",
      info: "Each artwork in the museum has a unique QR Code. Scan it to discover its detailed history.",
      demo: "Demo mode: Enter 1, 2 or 3 to see available artworks",
    },
    wo: {
      title: "Scan QR Code",
      subtitle: "Scan code bi ci nataal bi walla dugalal nimero bi",
      scanButton: "Liggéey ak kamera",
      manualInput: "Walla dugalal nimero nataal bi",
      placeholder: "Misaal: 1, 2, 3...",
      goButton: "Gis nataal bi",
      back: "Dellu",
      info: "Benn benn nataal ci musée bi am na seen QR Code. Scan ko ngir gis seen liggéey.",
      demo: "Mode demo : Dugalal 1, 2 walla 3 ngir gis nataal yi",
    },
  };

  const t = translations[lang as keyof typeof translations];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (artworkId && artworks.find(a => a.id === artworkId)) {
      navigate(`/artwork/${artworkId}`);
    }
  };

  const handleScanSimulation = () => {
    // Simulation: redirect to first artwork
    navigate("/artwork/1");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentLang={lang} onLanguageChange={setLang} />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <Link to="/">
            <Button variant="ghost" className="gap-2 mb-6">
              <ArrowLeft className="w-4 h-4" />
              {t.back}
            </Button>
          </Link>

          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="w-20 h-20 bg-gradient-sunset rounded-full flex items-center justify-center mx-auto mb-6 shadow-warm">
              <QrCode className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-gold bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-lg text-muted-foreground">{t.subtitle}</p>
          </div>

          {/* Scanner Section */}
          <div className="space-y-6">
            {/* Camera Button */}
            <Card className="p-8 text-center hover:shadow-warm transition-all">
              <Camera className="w-16 h-16 mx-auto mb-4 text-primary" />
              <Button 
                size="lg" 
                className="gap-2 shadow-warm"
                onClick={handleScanSimulation}
              >
                <QrCode className="w-5 h-5" />
                {t.scanButton}
              </Button>
            </Card>

            {/* Manual Input */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 text-center">{t.manualInput}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder={t.placeholder}
                  value={artworkId}
                  onChange={(e) => setArtworkId(e.target.value)}
                  className="text-center text-lg"
                />
                <Button type="submit" className="w-full" size="lg">
                  {t.goButton}
                </Button>
              </form>
            </Card>

            {/* Info Card */}
            <Card className="p-6 bg-primary/5 border-primary/20">
              <p className="text-sm text-muted-foreground text-center mb-2">
                {t.info}
              </p>
              <p className="text-xs text-muted-foreground text-center font-medium">
                💡 {t.demo}
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
