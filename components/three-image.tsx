'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

interface ThreeImageProps {
  imageUrl: string;
  altText: string;
  aiHint: string;
}

const ThreeImage: React.FC<ThreeImageProps> = ({
  imageUrl,
  altText,
  aiHint,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    let animationFrameId: number;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 1.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(imageUrl);
    const geometry = new THREE.PlaneGeometry(
      2,
      2 * (currentMount.clientHeight / currentMount.clientWidth)
    );
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      metalness: 0.1,
      roughness: 0.5,
    });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    const ambientLight = new THREE.AmbientLight(
      0xffffff,
      theme === 'dark' ? 0.4 : 0.8
    );
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(
      0xffffff,
      theme === 'dark' ? 0.5 : 0.7
    );
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    const mouse = new THREE.Vector2();
    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    let isMounted = true;

    const handleResize = () => {
      if (!currentMount || !isMounted) return;
      const width = currentMount.clientWidth;
      const height = currentMount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      plane.geometry.dispose();
      plane.geometry = new THREE.PlaneGeometry(2, 2 * (height / width));
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      if (!isMounted) return;
      animationFrameId = requestAnimationFrame(animate);
      plane.rotation.x += (mouse.y * 0.1 - plane.rotation.x) * 0.05;
      plane.rotation.y += (mouse.x * 0.1 - plane.rotation.y) * 0.05;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, [imageUrl, theme]);

  return (
    <div ref={mountRef} className='absolute inset-0 z-0 h-full w-full'>
      <img
        ref={imageRef}
        src={imageUrl}
        alt={altText}
        data-ai-hint={aiHint}
        className='sr-only'
      />
    </div>
  );
};

export default ThreeImage;
