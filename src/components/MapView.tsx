import { FC, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// 🔹 Correction de l'icône Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

interface MapViewProps {
  lang: string;
}

// Configuration de l'icône par défaut
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapView: FC<MapViewProps> = ({ lang }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 🔹 Détection de la taille d'écran et gestion du SSR
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const translations = {
    fr: {
      museum: "Musée des Civilisations Noires",
      address: "Place de la Gare, Dakar, Sénégal",
      instructions: "Itinéraire Google Maps",
      welcome: "Bienvenue au Musée des Civilisations Noires",
      description: "Un espace culturel dédié aux civilisations noires du monde entier.",
      website: "Site Officiel",
      hours: "Horaires: 9h-18h (Fermé Lundi)",
      getDirections: "Obtenir l'itinéraire"
    },
    en: {
      museum: "Museum of Black Civilizations",
      address: "Place de la Gare, Dakar, Senegal",
      instructions: "Google Maps Directions",
      welcome: "Welcome to the Museum of Black Civilizations",
      description: "A cultural space dedicated to black civilizations worldwide.",
      website: "Official Website",
      hours: "Hours: 9AM-6PM (Closed Monday)",
      getDirections: "Get Directions"
    },
    wo: {
      museum: "Musée des Civilisations Noires",
      address: "Place de la Gare, Dakar, Senegaal",
      instructions: "Yoon Google Maps",
      welcome: "Dëgër ci Musée des Civilisations Noires",
      description: "Buntu mboot miy yilif ci cosaanu xeeti melan-yu àdduna bi.",
      website: "Xët wi ci njëkk",
      hours: "Njangu: 9-18 (Fermé Altine)",
      getDirections: "Am yoon wi"
    },
  };

  const t = translations[lang as keyof typeof translations] || translations.fr;

  // 🔹 Coordonnées exactes du Musée des Civilisations Noires, Dakar
  const museumCoordinates: [number, number] = [14.6736, -17.4332];

  // 🔹 Icônes responsives
  const museumIcon = L.icon({
    iconUrl: "data:image/svg+xml;base64," + btoa(`
      <svg width="${isMobile ? 24 : 32}" height="${isMobile ? 30 : 40}" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.163 0 0 7.163 0 16C0 28 16 40 16 40C16 40 32 28 32 16C32 7.163 24.837 0 16 0Z" fill="#8B4513"/>
        <path d="M16 8C12.134 8 9 11.134 9 15C9 18.866 12.134 22 16 22C19.866 22 23 18.866 23 15C23 11.134 19.866 8 16 8Z" fill="#FFD700"/>
        <path d="M16 2C8.268 2 2 8.268 2 16C2 24 16 36 16 36C16 36 30 24 30 16C30 8.268 23.732 2 16 2Z" fill="#D2691E" stroke="#8B4513" stroke-width="2"/>
      </svg>
    `),
    iconSize: isMobile ? [24, 30] : [32, 40],
    iconAnchor: isMobile ? [12, 30] : [16, 40],
    popupAnchor: isMobile ? [0, -30] : [0, -40],
  });

  // 🔹 Paramètres responsives pour la carte
  const mapZoom = isMobile ? 14 : 16;
  const mapHeight = isMobile ? "400px" : "600px";

  if (!mounted) {
    return (
      <div 
        className="w-full bg-gray-200 rounded-lg flex items-center justify-center"
        style={{ height: mapHeight }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">
            {lang === 'fr' && 'Chargement de la carte...'}
            {lang === 'en' && 'Loading map...'}
            {lang === 'wo' && 'Mappa di na...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-full rounded-lg overflow-hidden shadow-lg border border-gray-200 relative"
      style={{ height: mapHeight }}
    >
      <MapContainer
        center={museumCoordinates}
        zoom={mapZoom}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={!isMobile} // Désactive le zoom avec la molette sur mobile
        zoomControl={!isMobile} // Cache les contrôles de zoom sur mobile (gestes tactiles suffisent)
        dragging={true}
        touchZoom={true}
        doubleClickZoom={!isMobile}
        boxZoom={!isMobile}
        keyboard={true}
        className="z-0"
      >
        {/* 🔹 Tuiles OpenStreetMap optimisées pour mobile */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={19}
          minZoom={10}
        />

        {/* 🔹 Marker du musée */}
        <Marker 
          position={museumCoordinates} 
          icon={museumIcon}
        >
          <Popup 
            closeButton={true}
            className="custom-popup"
            maxWidth={isMobile ? 280 : 320}
            minWidth={isMobile ? 250 : 300}
            autoClose={false}
            closeOnEscapeKey={true}
          >
            <div className={`p-2 ${isMobile ? 'text-center' : 'text-left'}`}>
              {/* Emoji ou icône de musée */}
              <div className="text-2xl mb-2">🏛️</div>
              
              <h3 className={`font-bold ${isMobile ? 'text-base' : 'text-lg'} text-gray-800 mb-1`}>
                {t.museum}
              </h3>
              
              <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 mb-2`}>
                {t.welcome}
              </p>
              
              <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-gray-500 mb-3`}>
                {t.description}
              </p>

              <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mb-3">
                <p className={`${isMobile ? 'text-xs' : 'text-xs'} font-medium text-yellow-800`}>
                  📍 {t.address}
                </p>
              </div>

              {/* Liens d'action - disposition responsive */}
              <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-2 ${isMobile ? 'space-y-2' : 'space-x-2'}`}>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${museumCoordinates[0]},${museumCoordinates[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    bg-blue-600 text-white font-medium py-2 px-3 rounded-lg hover:bg-blue-700 
                    transition-colors duration-200 text-center flex items-center justify-center
                    ${isMobile ? 'text-sm' : 'text-sm'}
                  `}
                >
                  <span className="mr-2">🗺️</span>
                  {isMobile ? t.instructions : t.getDirections}
                </a>
                
                <a
                  href="https://www.mcn.sn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    border border-gray-300 text-gray-700 font-medium py-2 px-3 rounded-lg 
                    hover:bg-gray-50 transition-colors duration-200 text-center flex items-center justify-center
                    ${isMobile ? 'text-sm' : 'text-sm'}
                  `}
                >
                  <span className="mr-2">🌐</span>
                  {t.website}
                </a>
              </div>

              {/* Horaires d'ouverture */}
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className={`${isMobile ? 'text-xs' : 'text-xs'} font-semibold text-gray-700`}>
                  🕒 {t.hours}
                </p>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* 🔹 Légende responsive */}
      <div className={`
        absolute ${isMobile ? 'bottom-3 left-3' : 'bottom-4 left-4'} 
        bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm border border-gray-200 z-10
        ${isMobile ? 'max-w-[160px]' : 'max-w-[200px]'}
      `}>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#8B4513] rounded-full flex-shrink-0"></div>
          <span className={`
            text-gray-600 truncate
            ${isMobile ? 'text-xs' : 'text-xs'}
          `}>
            {t.museum}
          </span>
        </div>
      </div>

      {/* 🔹 Instructions tactiles pour mobile */}
      {isMobile && (
        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded z-10">
          📍 {lang === 'fr' && 'Pincer pour zoomer'}
          {lang === 'en' && 'Pinch to zoom'}
          {lang === 'wo' && 'Tëfëlal ngir zoom'}
        </div>
      )}

      {/* 🔹 Styles CSS responsives */}
      <style jsx global>{`
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        
        .leaflet-container {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: ${isMobile ? '14px' : '16px'};
        }
        
        .leaflet-popup-content {
          margin: 0;
          line-height: 1.4;
        }

        /* Amélioration des contrôles sur mobile */
        .leaflet-control-zoom {
          border: none !important;
          margin: ${isMobile ? '10px' : '15px'} !important;
        }

        .leaflet-control-zoom a {
          background: white !important;
          border: 1px solid #ddd !important;
          color: #333 !important;
          font-weight: bold !important;
          width: ${isMobile ? '30px' : '34px'} !important;
          height: ${isMobile ? '30px' : '34px'} !important;
          line-height: ${isMobile ? '28px' : '32px'} !important;
        }

        .leaflet-control-zoom a:hover {
          background: #f8f9fa !important;
        }

        /* Amélioration du popup sur mobile */
        @media (max-width: 768px) {
          .leaflet-popup-tip {
            width: 12px;
            height: 12px;
          }
          
          .leaflet-popup-close-button {
            width: 24px;
            height: 24px;
            font-size: 18px;
            line-height: 24px;
          }
        }

        /* Touch improvements */
        .leaflet-marker-icon {
          cursor: pointer;
        }

        .leaflet-popup-tip-container {
          margin-top: -1px;
        }
      `}</style>
    </div>
  );
};

export default MapView;