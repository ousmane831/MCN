import { FC } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface MapViewProps {
  lang: string;
}

const MapView: FC<MapViewProps> = ({ lang }) => {
  const translations = {
    fr: {
      museum: "Musée des Civilisations Noires",
      address: "Dakar, Sénégal",
      instructions: "Cliquez pour obtenir l'itinéraire",
    },
    en: {
      museum: "Museum of Black Civilizations",
      address: "Dakar, Senegal",
      instructions: "Click for directions",
    },
    wo: {
      museum: "Musée des Civilisations Noires",
      address: "Dakar, Senegaal",
      instructions: "Bësal ngir am yoon",
    },
  };

  const t = translations[lang as keyof typeof translations];

  // Musée des Civilisations Noires, Dakar [lat, lng]
  const museumCoordinates: [number, number] = [14.7167, -17.4467];

  // Icon personnalisé
  const museumIcon = L.icon({
    iconUrl: "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
    iconSize: [32, 40],
    iconAnchor: [16, 40],
  });

  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={museumCoordinates}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Tuiles OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Marker du musée */}
        <Marker position={museumCoordinates} icon={museumIcon}>
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-lg">{t.museum}</h3>
              <p className="text-sm text-muted-foreground">{t.address}</p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${museumCoordinates[0]},${museumCoordinates[1]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-sm underline hover:no-underline mt-2 inline-block"
              >
                {t.instructions}
              </a>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;
