import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Volume2, Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface ArtworkCardProps {
  id: string;
  image: string;
  title: string;
  period: string;
  category: string;
  hasAudio: boolean;
  hasAR: boolean;
}

export default function ArtworkCard({
  id,
  image,
  title,
  period,
  category,
  hasAudio,
  hasAR,
}: ArtworkCardProps) {
  return (
    <Link to={`/artwork/${id}`}>
      <Card className="group overflow-hidden hover:shadow-warm transition-all duration-300 cursor-pointer">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {/* Badges */}
          <div className="absolute top-4 right-4 flex gap-2">
            {hasAudio && (
              <Badge variant="secondary" className="gap-1 bg-primary text-primary-foreground">
                <Volume2 className="w-3 h-3" />
                Audio
              </Badge>
            )}
            {hasAR && (
              <Badge variant="secondary" className="gap-1 bg-accent text-accent-foreground">
                <Eye className="w-3 h-3" />
                AR
              </Badge>
            )}
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg text-card-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">{period}</p>
          <Badge variant="outline">{category}</Badge>
        </div>
      </Card>
    </Link>
  );
}
