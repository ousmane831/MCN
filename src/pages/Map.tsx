import { useState } from "react";
import Navbar from "@/components/Navbar";
import MapView from "@/components/MapView";
import VirtualTour3D from "@/components/VirtualTour3D";
import { Button } from "@/components/ui/button";
import { Map as MapIcon, Box } from "lucide-react";

export default function Map() {
  const [lang, setLang] = useState("fr");
  const [viewMode, setViewMode] = useState<"map" | "3d">("map");

  const translations = {
    fr: {
      title: "Localiser le Musée",
      subtitle: "Trouvez votre chemin vers le musée et explorez-le en 3D",
      viewMap: "Carte Interactive",
      view3d: "Visite Virtuelle 3D",
    },
    en: {
      title: "Locate the Museum",
      subtitle: "Find your way to the museum and explore it in 3D",
      viewMap: "Interactive Map",
      view3d: "3D Virtual Tour",
    },
    wo: {
      title: "Gis Musée bi",
      subtitle: "Gis yoon ngir dem ci musée bi te xool ko ci 3D",
      viewMap: "Karte interactif",
      view3d: "Dëmbal 3D",
    },
  };

  const t = translations[lang as keyof typeof translations];

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentLang={lang} onLanguageChange={setLang} />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-gold bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* View Mode Selector */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            size="lg"
            onClick={() => setViewMode("map")}
            className="gap-2"
          >
            <MapIcon className="w-5 h-5" />
            {t.viewMap}
          </Button>
          <Button
            variant={viewMode === "3d" ? "default" : "outline"}
            size="lg"
            onClick={() => setViewMode("3d")}
            className="gap-2"
          >
            <Box className="w-5 h-5" />
            {t.view3d}
          </Button>
        </div>

        {/* Content based on view mode */}
        <div className="max-w-5xl mx-auto">
          {viewMode === "3d" ? (
            <div className="animate-fade-in">
              <VirtualTour3D lang={lang} />
            </div>
          ) : (
            <div className="animate-fade-in">
              <MapView lang={lang} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
