import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useSearchParams } from "react-router-dom";

const Viewer3D = () => {
  const mountRef = useRef(null);
  const [backgroundFile, setBackgroundFile] = useState(null);
  const [modelPath, setModelPath] = useState(null);
  const [sceneReady, setSceneReady] = useState(false);

  const [searchParams] = useSearchParams();
  const modelQuery = searchParams.get("model"); // e.g., ?model=models/sofa.glb

  useEffect(() => {
    if (!modelQuery) return;
    setModelPath(modelQuery);
  }, [modelQuery]);

  useEffect(() => {
    if (!modelPath) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const loader = new GLTFLoader();
    const modelGroup = new THREE.Group();

    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(1.2, 1.2, 1.2);
        model.position.set(0, -2, 0);
        modelGroup.add(model);
        scene.add(modelGroup);
        setSceneReady(true);
      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
      }
    );

    camera.position.set(0, 1, 8);

    let isMouseDown = false;
    let previousMousePosition = { x: 0, y: 0 };

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    const onMouseDown = (e) => {
      isMouseDown = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => (isMouseDown = false);
    const onMouseMove = (e) => {
      if (isMouseDown) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        modelGroup.rotation.y += deltaX * 0.01;
        modelGroup.rotation.x += deltaY * 0.01;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };
    const onKeyDown = (e) => {
      modelGroup.children.forEach((model) => {
        switch (e.key) {
          case "ArrowUp":
            model.position.z -= 0.2;
            break;
          case "ArrowDown":
            model.position.z += 0.2;
            break;
          case "ArrowLeft":
            model.position.x -= 0.2;
            break;
          case "ArrowRight":
            model.position.x += 0.2;
            break;
          case "w":
            model.position.y += 0.2;
            break;
          case "s":
            model.position.y -= 0.2;
            break;
        }
      });
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("keydown", onKeyDown);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [modelPath]);

  useEffect(() => {
    if (!backgroundFile || !sceneReady) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(e.target.result, (texture) => {
        const scene = mountRef.current.children[0].__scene;
        if (scene) scene.background = texture;
      });
    };
    reader.readAsDataURL(backgroundFile);
  }, [backgroundFile, sceneReady]);

  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-4 left-4 z-10 bg-white/80 p-4 rounded-xl shadow-md">
        <label className="block text-sm font-medium text-gray-700">
          Upload Background Image:
        </label>
        <input
          type="file"
          accept="image/*"
          className="mt-2"
          onChange={(e) => setBackgroundFile(e.target.files[0])}
        />
      </div>
      <div
        ref={mountRef}
        className="w-full h-full"
      ></div>
    </div>
  );
};

export default Viewer3D;
