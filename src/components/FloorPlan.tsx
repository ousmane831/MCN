import { useState } from "react";
import { artworks, Artwork } from "@/data/artworks";
import { MapPin, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface FloorPlanProps {
  lang: string;
  selectedFloor: string;
}

export default function FloorPlan({ lang, selectedFloor }: FloorPlanProps) {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  const translations = {
    fr: {
      floor1: "Étage 1 - Royaumes et Masques",
      floor2: "Étage 2 - Textiles et Artisanat",
      entrance: "Entrée",
      viewDetails: "Voir les détails",
      close: "Fermer",
      room: "Salle",
    },
    en: {
      floor1: "Floor 1 - Kingdoms and Masks",
      floor2: "Floor 2 - Textiles and Crafts",
      entrance: "Entrance",
      viewDetails: "View details",
      close: "Close",
      room: "Room",
    },
    wo: {
      floor1: "Dawal 1 - Réew ak Ndaxu",
      floor2: "Dawal 2 - Dëkk ak Nataal",
      entrance: "Dugg",
      viewDetails: "Xool li gën",
      close: "Téey",
      room: "Dawal",
    },
  };

  const t = translations[lang as keyof typeof translations];

  const filteredArtworks = artworks.filter(
    (artwork) => artwork.location.floor === selectedFloor
  );

  return (
    <div className="relative w-full">
      {/* Floor Plan SVG */}
      <div className="relative bg-card border-2 border-border rounded-lg shadow-warm overflow-hidden">
        <svg
          viewBox="0 0 800 600"
          className="w-full h-auto"
          style={{ minHeight: "400px" }}
        >
          {/* Background */}
          <rect width="800" height="600" fill="hsl(var(--background))" />

          {/* Rooms */}
          {selectedFloor === "1" && (
            <>
              {/* Salle des Masques */}
              <rect
                x="50"
                y="100"
                width="300"
                height="200"
                fill="hsl(var(--muted))"
                stroke="hsl(var(--border))"
                strokeWidth="2"
                rx="8"
              />
              <text
                x="200"
                y="210"
                textAnchor="middle"
                fill="hsl(var(--muted-foreground))"
                fontSize="14"
                fontWeight="500"
              >
                Salle des Masques
              </text>

              {/* Salle des Royaumes */}
              <rect
                x="450"
                y="100"
                width="300"
                height="200"
                fill="hsl(var(--muted))"
                stroke="hsl(var(--border))"
                strokeWidth="2"
                rx="8"
              />
              <text
                x="600"
                y="210"
                textAnchor="middle"
                fill="hsl(var(--muted-foreground))"
                fontSize="14"
                fontWeight="500"
              >
                Salle des Royaumes
              </text>

              {/* Entrance */}
              <rect
                x="350"
                y="450"
                width="100"
                height="80"
                fill="hsl(var(--accent))"
                stroke="hsl(var(--border))"
                strokeWidth="2"
                rx="8"
              />
              <text
                x="400"
                y="500"
                textAnchor="middle"
                fill="hsl(var(--accent-foreground))"
                fontSize="12"
                fontWeight="600"
              >
                {t.entrance}
              </text>
            </>
          )}

          {selectedFloor === "2" && (
            <>
              {/* Salle des Textiles */}
              <rect
                x="200"
                y="150"
                width="400"
                height="300"
                fill="hsl(var(--muted))"
                stroke="hsl(var(--border))"
                strokeWidth="2"
                rx="8"
              />
              <text
                x="400"
                y="310"
                textAnchor="middle"
                fill="hsl(var(--muted-foreground))"
                fontSize="14"
                fontWeight="500"
              >
                Salle des Textiles
              </text>
            </>
          )}

          {/* Artwork Markers */}
          {filteredArtworks.map((artwork) => {
            const x = (artwork.location.x / 100) * 800;
            const y = (artwork.location.y / 100) * 600;

            return (
              <g
                key={artwork.id}
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => setSelectedArtwork(artwork)}
              >
                <circle
                  cx={x}
                  cy={y}
                  r="20"
                  fill="hsl(var(--primary))"
                  stroke="hsl(var(--primary-foreground))"
                  strokeWidth="3"
                  opacity="0.9"
                  className="animate-pulse"
                />
                <text
                  x={x}
                  y={y + 5}
                  textAnchor="middle"
                  fill="hsl(var(--primary-foreground))"
                  fontSize="16"
                  fontWeight="bold"
                >
                  {artwork.id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Artwork Info */}
      {selectedArtwork && (
        <Card className="mt-6 animate-fade-in border-primary/50">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">
                    {selectedArtwork.translations[lang as keyof typeof selectedArtwork.translations].title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.room}: {selectedArtwork.location.room}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedArtwork(null)}
              >
                {t.close}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{selectedArtwork.category}</Badge>
                <Badge variant="outline">{selectedArtwork.period}</Badge>
                {selectedArtwork.hasAudio && (
                  <Badge variant="default">Audio</Badge>
                )}
                {selectedArtwork.hasAR && (
                  <Badge variant="default">AR</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {selectedArtwork.translations[lang as keyof typeof selectedArtwork.translations].description}
              </p>
              <Link to={`/artwork/${selectedArtwork.id}`}>
                <Button className="w-full gap-2">
                  <Info className="w-4 h-4" />
                  {t.viewDetails}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Legend */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xs">
            #
          </div>
          <span className="text-muted-foreground">
            {lang === "fr" && "Cliquez sur les marqueurs pour voir les détails des œuvres"}
            {lang === "en" && "Click on markers to view artwork details"}
            {lang === "wo" && "Bësal ci marque yi ngir xool nataal yi"}
          </span>
        </div>
      </div>
    </div>
  );
}
