import { useState } from "react";
import Navbar from "@/components/Navbar";
import ArtworkCard from "@/components/ArtworkCard";
import { artworks } from "@/data/artworks";
import { Button } from "@/components/ui/button";

export default function Gallery() {
  const [lang, setLang] = useState("fr");
  const [filter, setFilter] = useState("all");

  const translations = {
    fr: {
      title: "Galerie des Œuvres",
      subtitle: "Explorez notre collection d'art africain",
      all: "Toutes",
      mask: "Textile / Mode",
      sculpture: "Archéologie",
      textile: "Armes / Histoire",
      noArtworks: "Aucune œuvre trouvée.",
    },
    en: {
      title: "Artwork Gallery",
      subtitle: "Explore our African art collection",
      all: "All",
      mask: "Textile / Mode",
      sculpture: "Archéologie",
      textile: "Textiles",
      noArtworks: "No artworks found.",
    },
    wo: {
      title: "Nataal Yi",
      subtitle: "Xool seen nataal yu Afrig",
      all: "Lépp",
      mask: "Textile / Mode",
      sculpture: "Nataal bu naqar",
      textile: "Dëkk",
      noArtworks: "Lépp nataal yu amul.",
    },
  };

  const t = translations[lang as keyof typeof translations];

  const categories = [
    { id: "all", label: t.all },
    { id: "Textile / Mode", label: t.mask },
    { id: "Archéologie", label: t.sculpture },
    { id: "Armes / Histoire", label: t.textile },
  ];

  const filteredArtworks =
    filter === "all"
      ? artworks
      : artworks.filter((artwork) => artwork.category === filter);

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
            <p className="text-lg text-muted-foreground">{t.subtitle}</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={filter === category.id ? "default" : "outline"}
                onClick={() => setFilter(category.id)}
                className="transition-all"
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Gallery Grid */}
          {filteredArtworks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArtworks.map((artwork) => (
                <ArtworkCard
                  key={artwork.id}
                  id={artwork.id}
                  image={artwork.image}
                  title={artwork.translations[lang as keyof typeof artwork.translations].title}
                  period={artwork.period}
                  category={artwork.category}
                  hasAudio={artwork.hasAudio}
                  hasAR={artwork.hasAR}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground text-lg">
              {t.noArtworks}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
