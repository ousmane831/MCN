import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface MapViewProps {
  lang: string;
}

export default function MapView({ lang }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState("");
  const [tokenEntered, setTokenEntered] = useState(false);

  const translations = {
    fr: {
      enterToken: "Entrez votre token Mapbox public pour afficher la carte",
      placeholder: "pk.eyJ1IjoiLi4u",
      museum: "Musée des Civilisations Noires",
      address: "Dakar, Sénégal",
      instructions: "Cliquez pour obtenir l'itinéraire",
    },
    en: {
      enterToken: "Enter your Mapbox public token to display the map",
      placeholder: "pk.eyJ1IjoiLi4u",
      museum: "Museum of Black Civilizations",
      address: "Dakar, Senegal",
      instructions: "Click for directions",
    },
    wo: {
      enterToken: "Dugal sa token Mapbox public ngir wone karte bi",
      placeholder: "pk.eyJ1IjoiLi4u",
      museum: "Musée des Civilisations Noires",
      address: "Dakar, Senegaal",
      instructions: "Bësal ngir am yoon",
    },
  };

  const t = translations[lang as keyof typeof translations];

  // Museum coordinates (Musée des Civilisations Noires, Dakar)
  const museumCoordinates: [number, number] = [-17.4467, 14.7167];

  useEffect(() => {
    if (!mapContainer.current || !tokenEntered || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: museumCoordinates,
      zoom: 15,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      "top-right"
    );

    // Add geolocate control
    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    });
    map.current.addControl(geolocateControl, "top-right");

    // Create custom marker element
    const markerEl = document.createElement("div");
    markerEl.className = "museum-marker";
    markerEl.style.backgroundImage = "url(https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png)";
    markerEl.style.width = "32px";
    markerEl.style.height = "40px";
    markerEl.style.backgroundSize = "100%";
    markerEl.style.cursor = "pointer";

    // Add marker for museum
    const marker = new mapboxgl.Marker(markerEl)
      .setLngLat(museumCoordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div class="p-2">
            <h3 class="font-bold text-lg">${t.museum}</h3>
            <p class="text-sm text-muted-foreground">${t.address}</p>
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=${museumCoordinates[1]},${museumCoordinates[0]}" 
              target="_blank"
              rel="noopener noreferrer"
              class="text-primary text-sm underline hover:no-underline mt-2 inline-block"
            >
              ${t.instructions}
            </a>
          </div>`
        )
      )
      .addTo(map.current);

    // Open popup by default
    marker.togglePopup();

    return () => {
      map.current?.remove();
    };
  }, [tokenEntered, mapboxToken, t, museumCoordinates]);

  if (!tokenEntered) {
    return (
      <Card className="p-8 max-w-md mx-auto">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{t.enterToken}</p>
          <Input
            type="text"
            placeholder={t.placeholder}
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && mapboxToken.trim()) {
                setTokenEntered(true);
              }
            }}
          />
          <button
            onClick={() => mapboxToken.trim() && setTokenEntered(true)}
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            OK
          </button>
        </div>
      </Card>
    );
  }

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
}
