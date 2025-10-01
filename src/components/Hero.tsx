import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-museum.jpg";

interface HeroProps {
  lang: string;
}

export default function Hero({ lang }: HeroProps) {
  const translations = {
    fr: {
      title: "Explorez les Civilisations Noires",
      subtitle: "Une expérience immersive et multilingue au cœur de l'histoire africaine",
      cta: "Découvrir les œuvres",
      features: ["Audio descriptions", "Réalité augmentée", "Parcours guidés"],
    },
    en: {
      title: "Explore Black Civilizations",
      subtitle: "An immersive multilingual experience at the heart of African history",
      cta: "Discover artworks",
      features: ["Audio descriptions", "Augmented reality", "Guided tours"],
    },
    wo: {
      title: "Xam-xam Yéenal Ñuul",
      subtitle: "Jàng bu rafet ci nataal yi ak liggéeyu Afrig",
      cta: "Gis nataal yi",
      features: ["Jàng bu dëgg", "Nataal bu gëna mag", "Yoon yu njëkk"],
    },
  };

  const t = translations[lang as keyof typeof translations];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/90 via-secondary/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-glow">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {lang === "fr" ? "Nouveau" : lang === "en" ? "New" : "Bu bees"}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-gold bg-clip-text text-transparent leading-tight">
            {t.title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto">
            {t.subtitle}
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {t.features.map((feature, index) => (
              <div 
                key={index}
                className="px-4 py-2 bg-card/50 backdrop-blur-sm rounded-lg border border-border"
              >
                <span className="text-sm font-medium text-card-foreground">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/gallery">
              <Button size="lg" className="gap-2 shadow-warm hover:shadow-elegant transition-all">
                {t.cta}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/routes">
              <Button size="lg" variant="secondary" className="gap-2">
                {lang === "fr" ? "Parcours interactifs" : lang === "en" ? "Interactive tours" : "Yoon yu njëkk"}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
