import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { routes, artworks } from "@/data/artworks";
import { ArrowRight, Trophy, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function RoutesPage() {
  const [lang, setLang] = useState("fr");

  const translations = {
    fr: {
      title: "Parcours Interactifs",
      subtitle: "Découvrez des histoires thématiques",
      artworks: "œuvres",
      start: "Commencer",
      gamification: "Gagnez des badges en complétant les parcours !",
    },
    en: {
      title: "Interactive Tours",
      subtitle: "Discover thematic stories",
      artworks: "artworks",
      start: "Start",
      gamification: "Earn badges by completing tours!",
    },
    wo: {
      title: "Yoon Yu Njëkk",
      subtitle: "Xam liggéey yi ak seen xalaat",
      artworks: "nataal",
      start: "Tamit",
      gamification: "Mën nga am badge bu ëpp bu tàmbaali yoon yi!",
    },
  };

  const t = translations[lang as keyof typeof translations];

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentLang={lang} onLanguageChange={setLang} />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-gold bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">{t.subtitle}</p>

            {/* Gamification Banner */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-success/10 border border-success/20 rounded-full">
              <Trophy className="w-5 h-5 text-success" />
              <span className="text-sm font-medium text-success">{t.gamification}</span>
              <Star className="w-4 h-4 text-success fill-success" />
            </div>
          </div>

          {/* Routes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {routes.map((route, index) => {
              const routeTranslations = route.translations[lang as keyof typeof route.translations];
              const routeArtworks = artworks.filter((artwork) =>
                route.artworks.includes(artwork.id)
              );

              return (
                <Card
                  key={route.id}
                  className="group overflow-hidden hover:shadow-warm transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Images Preview */}
                  <div className="grid grid-cols-2 gap-2 p-4">
                    {routeArtworks.slice(0, 2).map((artwork) => (
                      <div
                        key={artwork.id}
                        className="aspect-square rounded-lg overflow-hidden"
                      >
                        <img
                          src={artwork.image}
                          alt={artwork.translations[lang as keyof typeof artwork.translations].title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Content */}
                  <div className="p-6 pt-2">
                    <h3 className="text-2xl font-bold mb-2 text-card-foreground group-hover:text-primary transition-colors">
                      {routeTranslations.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {routeTranslations.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="gap-1">
                        {route.artworks.length} {t.artworks}
                      </Badge>

                      <Link to={`/route/${route.id}`}>
                        <Button className="gap-2 group-hover:shadow-warm transition-all">
                          {t.start}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
