import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useState, useEffect, useRef, useMemo } from "react";

// 🔹 Import des images
import outside from "@/assets/loger.jpg";
import hall from "@/assets/Babouches_Serigne_Babacar_Sy.jpg";
import room1 from "@/assets/quran.jpg";
import room2 from "@/assets/perles.webp";
import room3 from "@/assets/homage_affrique.jpg";
import room4 from "@/assets/masqe.jpg";
import room5 from "@/assets/masque1.webp";
import room6 from "@/assets/masque2.jpg";
import floorTex from "@/assets/floor.jpg";

// 🔹 Hook pour précharger les textures
function usePreloadTextures(paths: string[]) {
  const [textures, setTextures] = useState<THREE.Texture[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    const loadedTextures: THREE.Texture[] = [];
    let loaded = 0;

    paths.forEach((path) => {
      loader.load(
        path,
        (texture) => {
          loadedTextures.push(texture);
          loaded++;
          setProgress(Math.round((loaded / paths.length) * 100));
          
          if (loaded === paths.length) {
            setTextures(loadedTextures);
          }
        },
        undefined,
        (error) => {
          console.error("Error loading texture:", error);
          loaded++;
          setProgress(Math.round((loaded / paths.length) * 100));
        }
      );
    });
  }, [paths]);

  return { textures, progress };
}

// 🔹 Composant Tableau simple
function Painting({ texture, position, isActive }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = THREE.MathUtils.lerp(material.opacity, isActive ? 1 : 0.3, 0.1);
    }
  });

  return (
    <group position={position}>
      {/* Cadre */}
      <mesh position={[0, 0, -0.1]}>
        <boxGeometry args={[5.2, 3.2, 0.2]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      {/* Image */}
      <mesh ref={meshRef} position={[0, 0, 0.01]}>
        <planeGeometry args={[5, 3]} />
        <meshBasicMaterial 
          map={texture} 
          transparent 
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// 🔹 Camera simple et fiable
function MuseumCamera({ paintings, currentIndex, isPaused }) {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3());

  useEffect(() => {
    if (paintings.length === 0) return;
    
    const painting = paintings[currentIndex];
    targetPosition.current.set(
      painting.position[0],
      painting.position[1] + 1,
      painting.position[2] + 8
    );
  }, [currentIndex, paintings]);

  useFrame(() => {
    if (isPaused || paintings.length === 0) return;

    camera.position.lerp(targetPosition.current, 0.05);
    
    const painting = paintings[currentIndex];
    const lookAt = new THREE.Vector3(
      painting.position[0],
      painting.position[1],
      painting.position[2]
    );
    camera.lookAt(lookAt);
  });

  return null;
}

// 🔹 Scène du musée simplifiée
function MuseumScene({ paintings, currentIndex }) {
  const floorTexture = useMemo(() => {
    const tex = new THREE.TextureLoader().load(floorTex);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 4);
    return tex;
  }, []);

  return (
    <>
      {/* Lumière */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        castShadow
      />

      {/* Sol */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -2, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial map={floorTexture} />
      </mesh>

      {/* Murs simples */}
      <mesh position={[0, 2, -10]}>
        <planeGeometry args={[40, 8]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>

      <mesh position={[0, 2, 10]} rotation-y={Math.PI}>
        <planeGeometry args={[40, 8]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>

      <mesh position={[-15, 2, 0]} rotation-y={Math.PI / 2}>
        <planeGeometry args={[20, 8]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>

      <mesh position={[15, 2, 0]} rotation-y={-Math.PI / 2}>
        <planeGeometry args={[20, 8]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>

      {/* Tableaux */}
      {paintings.map((painting, index) => (
        <Painting
          key={index}
          texture={painting.texture}
          position={painting.position}
          isActive={index === currentIndex}
        />
      ))}
    </>
  );
}

// 🔹 Composant de chargement
function LoadingScreen({ progress }) {
  return (
    <div className="absolute inset-0 bg-gray-900 flex flex-col items-center justify-center">
      <div className="text-white text-center mb-4">
        <h2 className="text-xl font-bold">Chargement du Musée</h2>
        <p className="text-gray-300 mt-2">{progress}%</p>
      </div>
      <div className="w-48 h-2 bg-gray-700 rounded-full">
        <div 
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// 🔹 COMPOSANT PRINCIPAL
export default function SimpleMuseumScene() {
  const texturePaths = [outside, hall, room1, room2, room3, room4, room5, room6];
  const { textures, progress } = usePreloadTextures(texturePaths);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Configuration des peintures
  const paintings = useMemo(() => {
    if (textures.length === 0) return [];

    return [
      // Mur arrière (z: -9)
      { texture: textures[0], position: [-12, 0, -9], title: "Objets archéologiques du Mali", description: "Collection d'objets archéologiques trouvés au Mali." },
      { texture: textures[1], position: [-4, 0, -9], title: "Babouches Serigne Babacar Sy", description: "Paire de babouches traditionnelles portées par Serigne Babacar Sy" },
      { texture: textures[2], position: [4, 0, -9], title: "Salle du Coran", description: "Manuscrits anciens" },
      { texture: textures[3], position: [12, 0, -9], title: "Artisanat Perlé", description: "Bijoux traditionnels" },
      
      // Mur avant (z: 9)
      { texture: textures[4], position: [-12, 0, 9], title: "Hommage à l'Afrique", description: "Œuvres contemporaines" },
      { texture: textures[5], position: [-4, 0, 9], title: "Masques Cérémoniels", description: "Rituels traditionnels" },
      { texture: textures[6], position: [4, 0, 9], title: "Masques Royaux", description: "Noblesse africaine" },
      { texture: textures[7], position: [12, 0, 9], title: "Sculptures", description: "Art historique" },
    ];
  }, [textures]);

  // Défilement automatique
  useEffect(() => {
    if (isPaused || paintings.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % paintings.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, paintings.length]);

  if (textures.length < texturePaths.length) {
    return <LoadingScreen progress={progress} />;
  }

  const currentPainting = paintings[currentIndex];

  return (
    <div className="relative w-full h-[600px] bg-gray-900 rounded-lg overflow-hidden">
      {/* Contrôles */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button
          className="bg-black/70 text-white px-4 py-2 rounded hover:bg-black/90 transition"
          onClick={() => setIsPaused(!isPaused)}
        >
          {isPaused ? "▶" : "⏸"}
        </button>
        <button
          className="bg-blue-600/70 text-white px-3 py-2 rounded hover:bg-blue-700/90 transition text-sm"
          onClick={() => setCurrentIndex((prev) => (prev + 1) % paintings.length)}
        >
          Suivant
        </button>
      </div>

      {/* Indicateur */}
      <div className="absolute top-4 left-4 z-10 bg-black/70 text-white px-3 py-1 rounded text-sm">
        {currentIndex + 1} / {paintings.length}
      </div>

      {/* Canvas Three.js */}
      <Canvas camera={{ position: [0, 2, 15], fov: 60 }}>
        <MuseumScene paintings={paintings} currentIndex={currentIndex} />
        <MuseumCamera 
          paintings={paintings} 
          currentIndex={currentIndex} 
          isPaused={isPaused} 
        />
      </Canvas>

      {/* Info du tableau actuel */}
      {currentPainting && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white p-4 rounded-lg max-w-md text-center">
          <h3 className="font-bold text-lg">{currentPainting.title}</h3>
          <p className="text-sm mt-1">{currentPainting.description}</p>
          <div className="text-xs text-gray-300 mt-2">
            {isPaused ? "⏸ Pause" : "▶ Défilement automatique"}
          </div>
        </div>
      )}
    </div>
  );
}