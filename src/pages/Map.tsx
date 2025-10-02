import { useState } from "react";
import Navbar from "@/components/Navbar";
import FloorPlan from "@/components/FloorPlan";
import { Button } from "@/components/ui/button";
import { Building, Building2 } from "lucide-react";

export default function Map() {
  const [lang, setLang] = useState("fr");
  const [selectedFloor, setSelectedFloor] = useState("1");

  const translations = {
    fr: {
      title: "Plan du Musée",
      subtitle: "Explorez les différents espaces et localisez les œuvres",
      floor1: "Étage 1",
      floor2: "Étage 2",
    },
    en: {
      title: "Museum Map",
      subtitle: "Explore the different spaces and locate artworks",
      floor1: "Floor 1",
      floor2: "Floor 2",
    },
    wo: {
      title: "Karte Musée",
      subtitle: "Xool seen yoon yi ak sa xel ci nataal yi",
      floor1: "Dawal 1",
      floor2: "Dawal 2",
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

        {/* Floor Selector */}
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

        {/* Floor Plan */}
        <div className="max-w-5xl mx-auto">
          <FloorPlan lang={lang} selectedFloor={selectedFloor} />
        </div>
      </main>
    </div>
  );
}
