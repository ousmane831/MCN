import { useState } from "react";
import Navbar from "@/components/Navbar";
import FloorPlan from "@/components/FloorPlan";
import VirtualTour3D from "@/components/VirtualTour3D";
import { Button } from "@/components/ui/button";
import { Building, Building2, Box } from "lucide-react";

export default function Map() {
  const [lang, setLang] = useState("fr");
  const [selectedFloor, setSelectedFloor] = useState("1");
  const [viewMode, setViewMode] = useState<"2d" | "3d">("3d");

  const translations = {
    fr: {
      title: "Plan du Musée",
      subtitle: "Explorez les différents espaces et localisez les œuvres",
      floor1: "Étage 1",
      floor2: "Étage 2",
      view2d: "Plan 2D",
      view3d: "Visite Virtuelle 3D",
      virtualTourTitle: "Visite Virtuelle 3D",
      virtualTourSubtitle: "Explorez le musée en 3D - Zoomez et faites pivoter",
    },
    en: {
      title: "Museum Map",
      subtitle: "Explore the different spaces and locate artworks",
      floor1: "Floor 1",
      floor2: "Floor 2",
      view2d: "2D Plan",
      view3d: "3D Virtual Tour",
      virtualTourTitle: "3D Virtual Tour",
      virtualTourSubtitle: "Explore the museum in 3D - Zoom and rotate",
    },
    wo: {
      title: "Karte Musée",
      subtitle: "Xool seen yoon yi ak sa xel ci nataal yi",
      floor1: "Dawal 1",
      floor2: "Dawal 2",
      view2d: "Karte 2D",
      view3d: "Dëmbal 3D",
      virtualTourTitle: "Dëmbal 3D",
      virtualTourSubtitle: "Xool musée bi ci 3D - Zoom ak yokk",
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
            variant={viewMode === "2d" ? "default" : "outline"}
            size="lg"
            onClick={() => setViewMode("2d")}
            className="gap-2"
          >
            <Building className="w-5 h-5" />
            {t.view2d}
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
              {/* Floor Selector for 2D view */}
              <div className="flex justify-center gap-4 mb-8">
                <Button
                  variant={selectedFloor === "1" ? "default" : "outline"}
                  size="lg"
                  onClick={() => setSelectedFloor("1")}
                  className="gap-2"
                >
                  <Building className="w-5 h-5" />
                  {t.floor1}
                </Button>
                <Button
                  variant={selectedFloor === "2" ? "default" : "outline"}
                  size="lg"
                  onClick={() => setSelectedFloor("2")}
                  className="gap-2"
                >
                  <Building2 className="w-5 h-5" />
                  {t.floor2}
                </Button>
              </div>
              <FloorPlan lang={lang} selectedFloor={selectedFloor} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
