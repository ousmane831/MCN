import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";
import museumExterior from "@/assets/museum-exterior.jpg";

interface VirtualTour3DProps {
  lang: string;
}

function MuseumEnvironment() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#8B7355" />
      </mesh>

      {/* Museum Building */}
      <mesh position={[0, 3, 0]} castShadow>
        <boxGeometry args={[15, 8, 12]} />
        <meshStandardMaterial color="#D4A574" />
      </mesh>

      {/* Museum Facade with texture */}
      <mesh position={[0, 3, -5.99]} castShadow>
        <planeGeometry args={[15, 8]} />
        <meshStandardMaterial 
          map={new THREE.TextureLoader().load(museumExterior)}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Entrance */}
      <mesh position={[0, 1, -6]} castShadow>
        <boxGeometry args={[4, 4, 0.2]} />
        <meshStandardMaterial color="#6B4423" />
      </mesh>

      {/* Columns */}
      {[-4, -2, 2, 4].map((x, i) => (
        <mesh key={i} position={[x, 2, -6]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 4]} />
          <meshStandardMaterial color="#C19A6B" />
        </mesh>
      ))}

      {/* Roof */}
      <mesh position={[0, 7.5, 0]} castShadow>
        <boxGeometry args={[16, 1, 13]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Trees */}
      {[[-10, 2, -8], [10, 2, -8], [-8, 2, 5], [8, 2, 5]].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh position={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[0.3, 0.4, 3]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
          <mesh position={[0, 2.5, 0]} castShadow>
            <sphereGeometry args={[1.5]} />
            <meshStandardMaterial color="#228B22" />
          </mesh>
        </group>
      ))}

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, 10, -10]} intensity={0.5} />
    </group>
  );
}

export default function VirtualTour3D({ lang }: VirtualTour3DProps) {
  const translations = {
    fr: {
      controls: "Utilisez la souris pour faire pivoter, la molette pour zoomer",
    },
    en: {
      controls: "Use mouse to rotate, scroll to zoom",
    },
    wo: {
      controls: "Jëfandikoo souris ngir yokk, molette ngir zoom",
    },
  };

  const t = translations[lang as keyof typeof translations] || translations.fr;

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden bg-gradient-to-b from-sky-300 to-sky-100">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 8, 20]} />
        <Suspense fallback={null}>
          <MuseumEnvironment />
          <Environment preset="sunset" />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={40}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
        {t.controls}
      </div>
    </div>
  );
}
