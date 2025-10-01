import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ArtworkCard from "@/components/ArtworkCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { routes, artworks } from "@/data/artworks";
import { ArrowLeft, Trophy, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function RouteDetail() {
  const { id } = useParams();
  const [lang, setLang] = useState("fr");
  const [completedArtworks, setCompletedArtworks] = useState<string[]>([]);

  const route = routes.find((r) => r.id === id);
  
  if (!route) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Parcours non trouvé</h1>
          <Link to="/routes">
            <Button>Retour aux parcours</Button>
          </Link>
        </div>
      </div>
    );
  }

  const routeTranslations = route.translations[lang as keyof typeof route.translations];
  const routeArtworks = artworks.filter((artwork) =>
    route.artworks.includes(artwork.id)
  );

  const progress = (completedArtworks.length / routeArtworks.length) * 100;

  const translations = {
    fr: {
      back: "Retour",
      progress: "Progression",
      completed: "Terminé",
      artworks: "œuvres",
      markComplete: "Marquer comme vu",
      congratulations: "Félicitations ! Parcours terminé !",
      badge: "Vous avez gagné un badge !",
    },
    en: {
      back: "Back",
      progress: "Progress",
      completed: "Completed",
      artworks: "artworks",
      markComplete: "Mark as seen",
      congratulations: "Congratulations! Tour completed!",
      badge: "You earned a badge!",
    },
    wo: {
      back: "Dellu",
      progress: "Yoon",
      completed: "Jeex na",
      artworks: "nataal",
      markComplete: "Xam ne gisoon naa",
      congratulations: "Jaaxal ! Yoon bi jeex na !",
      badge: "Amoon nga badge !",
    },
  };

  const t = translations[lang as keyof typeof translations];

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentLang={lang} onLanguageChange={setLang} />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Link to="/routes">
              <Button variant="ghost" className="gap-2 mb-4">
                <ArrowLeft className="w-4 h-4" />
                {t.back}
              </Button>
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-gold bg-clip-text text-transparent">
              {routeTranslations.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              {routeTranslations.description}
            </p>

            {/* Progress Section */}
            <div className="bg-card rounded-lg p-6 shadow-warm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  <span className="font-semibold">{t.progress}</span>
                </div>
                <Badge variant="secondary">
                  {completedArtworks.length} / {routeArtworks.length} {t.artworks}
                </Badge>
              </div>
              <Progress value={progress} className="h-2" />
              
              {progress === 100 && (
                <div className="mt-4 p-4 bg-success/10 border border-success/20 rounded-lg flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-success" />
                  <div>
                    <p className="font-semibold text-success">{t.congratulations}</p>
                    <p className="text-sm text-success/80">{t.badge}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Artworks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {routeArtworks.map((artwork) => {
              const translation = artwork.translations[lang as keyof typeof artwork.translations];
              return (
                <div key={artwork.id} className="space-y-3">
                  <ArtworkCard
                    id={artwork.id}
                    image={artwork.image}
                    title={translation.title}
                    period={artwork.period}
                    category={artwork.category}
                    hasAudio={artwork.hasAudio}
                    hasAR={artwork.hasAR}
                  />
                {!completedArtworks.includes(artwork.id) && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setCompletedArtworks([...completedArtworks, artwork.id])}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {t.markComplete}
                  </Button>
                )}
                {completedArtworks.includes(artwork.id) && (
                  <div className="flex items-center justify-center gap-2 text-success">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">{t.completed}</span>
                  </div>
                )}
              </div>
            );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
