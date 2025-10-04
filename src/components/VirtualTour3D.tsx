import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Suspense, useState } from "react";

// 🔹 Ajoute tes 5 images ici
import outside from "@/assets/hero-museum.jpg";
import hall from "@/assets/unnamed.webp";
import room1 from "@/assets/sculpture-bronze.jpg";
import room2 from "@/assets/M3_0.webp";
import room3 from "@/assets/unnamed (1).webp";

function Panorama({ image }: { image: string }) {
  const texture = useLoader(THREE.TextureLoader, image);

  return (
    <mesh>
      <sphereGeometry args={[50, 64, 64]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}

export default function VirtualTour360() {
  // 🔹 Tableau avec toutes les scènes
  const panoramas = [
    { name: "Extérieur", image: outside },
    { name: "Interieur", image: hall },
    { name: "Salle 1", image: room1 },
    { name: "Salle 2", image: room2 },
    { name: "Salle 3", image: room3 },
  ];

  const [current, setCurrent] = useState(panoramas[0].image);

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden bg-black">
      <Canvas>
        <Suspense fallback={null}>
          <Panorama image={current} />
          <OrbitControls enablePan={false} enableZoom={false} enableRotate={true} />
        </Suspense>
      </Canvas>

      {/* 🔹 Boutons de navigation générés automatiquement */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 flex-wrap justify-center">
        {panoramas.map((pano, index) => (
          <button
            key={index}
            onClick={() => setCurrent(pano.image)}
            className={`px-4 py-2 rounded-lg ${
              current === pano.image ? "bg-blue-600 text-white" : "bg-black/70 text-white"
            }`}
          >
            {pano.name}
          </button>
        ))}
      </div>
    </div>
  );
}
