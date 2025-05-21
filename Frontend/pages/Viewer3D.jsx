import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useSearchParams } from "react-router-dom";

const Model = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} />;
};

const Viewer3D = () => {
  const [searchParams] = useSearchParams();
  const modelUrl = searchParams.get("model");

  if (!modelUrl) return <p>❌ No model URL provided in query params</p>;

  return (
    <div className="w-screen h-screen">
      <Canvas camera={{ position: [0, 1, 3] }}>
        <ambientLight />
        <directionalLight position={[0, 5, 5]} />
        <OrbitControls />
        <Model url={modelUrl} />
      </Canvas>
    </div>
  );
};

export default Viewer3D;
