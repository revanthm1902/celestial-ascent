import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';

const FloatingCrystal = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Gentle rotation
    groupRef.current.rotation.y = time * 0.2;
    groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
    
    // Mouse tracking
    groupRef.current.rotation.y += mousePosition.x * 0.3;
    groupRef.current.rotation.x += mousePosition.y * 0.2;
    
    if (innerRef.current) {
      innerRef.current.rotation.y = time * -0.5;
      innerRef.current.rotation.z = time * 0.3;
    }
    
    if (ringsRef.current) {
      ringsRef.current.rotation.z = time * 0.1;
      ringsRef.current.rotation.x = Math.sin(time * 0.2) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef}>
        {/* Outer crystal sphere */}
        <Sphere args={[2, 64, 64]}>
          <MeshDistortMaterial
            color="#1a3a6e"
            envMapIntensity={1}
            roughness={0}
            metalness={0.8}
            distort={0.3}
            speed={2}
            transparent
            opacity={0.7}
          />
        </Sphere>
        
        {/* Inner glowing core */}
        <Sphere ref={innerRef} args={[1.2, 32, 32]}>
          <meshStandardMaterial
            color="#ffd700"
            emissive="#ffd700"
            emissiveIntensity={2}
            transparent
            opacity={0.9}
          />
        </Sphere>
        
        {/* Energy core */}
        <Sphere args={[0.5, 16, 16]}>
          <meshBasicMaterial color="#ffffff" />
        </Sphere>
        
        {/* Orbital rings */}
        <group ref={ringsRef}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[3, 0.03, 16, 100]} />
            <meshStandardMaterial
              color="#ffd700"
              emissive="#ffd700"
              emissiveIntensity={0.5}
              transparent
              opacity={0.6}
            />
          </mesh>
          <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
            <torusGeometry args={[3.5, 0.02, 16, 100]} />
            <meshStandardMaterial
              color="#60a5fa"
              emissive="#60a5fa"
              emissiveIntensity={0.5}
              transparent
              opacity={0.4}
            />
          </mesh>
        </group>
        
        {/* Orbiting particles */}
        {[...Array(8)].map((_, i) => (
          <OrbitingParticle key={i} index={i} />
        ))}
      </group>
    </Float>
  );
};

const OrbitingParticle = ({ index }: { index: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const radius = 3 + index * 0.3;
  const speed = 0.5 + index * 0.1;
  const offset = (index / 8) * Math.PI * 2;
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime * speed + offset;
    meshRef.current.position.x = Math.cos(time) * radius;
    meshRef.current.position.z = Math.sin(time) * radius;
    meshRef.current.position.y = Math.sin(time * 2) * 0.5;
  });
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshBasicMaterial color="#ffd700" />
    </mesh>
  );
};

interface CrystalOrbProps {
  mousePosition: { x: number; y: number };
}

const CrystalOrb = ({ mousePosition }: CrystalOrbProps) => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffd700" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#60a5fa" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          color="#ffd700"
        />
        
        <FloatingCrystal mousePosition={mousePosition} />
        
        <Stars
          radius={50}
          depth={50}
          count={1000}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />
        
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

export default CrystalOrb;
