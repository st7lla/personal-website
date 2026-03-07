"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, Html, MeshReflectorMaterial, OrbitControls, Stars } from "@react-three/drei"
import { useRef, useState, Suspense, useEffect } from "react"
import type { Group } from "three"
import * as THREE from "three"

// Millennium Falcon inspired spaceship
function MillenniumFalcon({ isPlaying, onClick }: { isPlaying: boolean; onClick: () => void }) {
  const groupRef = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15
      if (isPlaying) {
        groupRef.current.rotation.y += 0.002
      }
    }
  })
  
  const bodyColor = hovered ? "#b0b0b0" : "#8b8b8b"
  
  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group 
        ref={groupRef} 
        rotation={[0.15, -0.4, 0]} 
        scale={1.2}
        onClick={onClick}
        onPointerOver={() => {
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'default'
        }}
      >
        {/* Main body - disc shape */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[2.2, 2.5, 0.4, 32]} />
          <meshStandardMaterial color={bodyColor} metalness={0.7} roughness={0.3} />
        </mesh>
        
        {/* Top detail ring */}
        <mesh position={[0, 0.25, 0]}>
          <torusGeometry args={[1.8, 0.08, 8, 32]} />
          <meshStandardMaterial color="#6b6b6b" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Cockpit area - right mandible */}
        <group position={[1.8, 0.1, 0.8]}>
          <mesh castShadow>
            <boxGeometry args={[1.2, 0.35, 0.6]} />
            <meshStandardMaterial color="#7a7a7a" metalness={0.6} roughness={0.4} />
          </mesh>
          {/* Cockpit window */}
          <mesh position={[0.5, 0.1, 0]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#4a90d4" metalness={0.9} roughness={0.1} emissive="#4a90d4" emissiveIntensity={0.5} />
          </mesh>
        </group>
        
        {/* Left mandible */}
        <mesh position={[1.8, 0.1, -0.8]} castShadow>
          <boxGeometry args={[1.2, 0.35, 0.6]} />
          <meshStandardMaterial color="#7a7a7a" metalness={0.6} roughness={0.4} />
        </mesh>
        
        {/* Front wedge connecting mandibles */}
        <mesh position={[2.8, 0.1, 0]} castShadow>
          <boxGeometry args={[0.8, 0.3, 1.0]} />
          <meshStandardMaterial color="#8a8a8a" metalness={0.6} roughness={0.4} />
        </mesh>
        
        {/* Radar dish */}
        <group position={[0, 0.5, 0]}>
          <mesh>
            <cylinderGeometry args={[0.5, 0.4, 0.15, 16]} />
            <meshStandardMaterial color="#9a9a9a" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <sphereGeometry args={[0.35, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#b0b0b0" metalness={0.9} roughness={0.1} side={THREE.DoubleSide} />
          </mesh>
        </group>
        
        {/* Engine exhausts - back of ship */}
        <group position={[-2.2, 0, 0]}>
          {[-0.6, 0, 0.6].map((z, i) => (
            <mesh key={i} position={[0, 0, z]}>
              <cylinderGeometry args={[0.25, 0.3, 0.3, 8]} />
              <meshStandardMaterial 
                color={isPlaying ? "#ff6b35" : "#3a3a3a"} 
                emissive={isPlaying ? "#ff6b35" : "#000000"}
                emissiveIntensity={isPlaying ? 2 : 0}
                metalness={0.5} 
                roughness={0.5} 
              />
            </mesh>
          ))}
          {isPlaying && (
            <pointLight position={[-0.5, 0, 0]} color="#ff6b35" intensity={2} distance={3} />
          )}
        </group>
        
        {/* Surface panel details */}
        {[
          [0.8, 0.22, 0.5],
          [-0.5, 0.22, -0.8],
          [0.2, 0.22, -0.3],
          [-0.8, 0.22, 0.6],
        ].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <boxGeometry args={[0.4, 0.05, 0.3]} />
            <meshStandardMaterial color="#6a6a6a" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}
        
        {/* Top gun turret */}
        <group position={[0.5, 0.4, 0]}>
          <mesh>
            <cylinderGeometry args={[0.15, 0.15, 0.2, 8]} />
            <meshStandardMaterial color="#5a5a5a" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0.2, 0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
            <meshStandardMaterial color="#4a4a4a" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
        
        {/* Bottom plate */}
        <mesh position={[0, -0.25, 0]}>
          <cylinderGeometry args={[1.8, 2.0, 0.15, 32]} />
          <meshStandardMaterial color="#7a7a7a" metalness={0.6} roughness={0.4} />
        </mesh>
        
        {/* Landing gear struts */}
        {[
          [1, -0.35, 1],
          [1, -0.35, -1],
          [-1.5, -0.35, 0],
        ].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <cylinderGeometry args={[0.08, 0.1, 0.2, 8]} />
            <meshStandardMaterial color="#5a5a5a" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

// Using Html component for text to avoid font loading issues
function NavigationOverlay({ 
  activeSection, 
  onSectionChange 
}: { 
  activeSection: string
  onSectionChange: (section: string) => void 
}) {
  const navItems = [
    { text: "about me", id: "about" },
    { text: "projects", id: "projects" },
    { text: "experience", id: "experience" },
    { text: "contact", id: "contact" },
  ]

  return (
    <Html position={[3.5, 0.5, 0]} transform distanceFactor={8}>
      <div className="flex flex-col gap-2 font-mono select-none">
        <h1 className="text-2xl font-bold text-foreground mb-1">your name</h1>
        <p className="text-sm text-muted-foreground mb-4">creative developer</p>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`text-left text-sm transition-all hover:translate-x-1 ${
              activeSection === item.id 
                ? "text-primary font-bold" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {activeSection === item.id ? `> ${item.text}` : item.text}
          </button>
        ))}
      </div>
    </Html>
  )
}

function ReflectiveFloor({ isDark }: { isDark: boolean }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
      <planeGeometry args={[50, 50]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={40}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color={isDark ? "#0a0a12" : "#e8e8e0"}
        metalness={0.5}
        mirror={0.5}
      />
    </mesh>
  )
}

interface Scene3DProps {
  activeSection: string
  onSectionChange: (section: string) => void
  onVinylClick: () => void
  isPlaying: boolean
  isDark: boolean
}

function SceneContent({ activeSection, onSectionChange, onVinylClick, isPlaying, isDark }: Scene3DProps) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={isDark ? 0.4 : 0.7} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#d4a574" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4a90d4" />
      <spotLight position={[0, 15, 5]} angle={0.4} penumbra={1} intensity={1} color="#ffffff" castShadow />

      {/* Millennium Falcon */}
      <group position={[-0.5, 0, 0]}>
        <MillenniumFalcon isPlaying={isPlaying} onClick={onVinylClick} />
      </group>
      
      {/* Navigation overlay using Html */}
      <NavigationOverlay activeSection={activeSection} onSectionChange={onSectionChange} />

      {/* Reflective floor */}
      <ReflectiveFloor isDark={isDark} />
      
      {/* Stars for dark mode */}
      {isDark && <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />}
      
      {/* Environment */}
      <Environment preset={isDark ? "night" : "sunset"} />
      
      {/* Camera controls */}
      <OrbitControls 
        enableZoom={true} 
        enablePan={false}
        minDistance={5}
        maxDistance={15}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.2}
      />
    </>
  )
}

export function Scene3D({ activeSection, onSectionChange, onVinylClick, isPlaying, isDark }: Scene3DProps) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-background">
        <div className="text-muted-foreground animate-pulse">Loading 3D scene...</div>
      </div>
    )
  }

  const bgColor = isDark ? '#0a0a14' : '#f5f4ef'

  return (
    <Canvas
      camera={{ position: [0, 2, 10], fov: 45 }}
      shadows
      style={{ width: '100%', height: '100%', background: bgColor }}
      gl={{ antialias: true, alpha: false }}
    >
      <color attach="background" args={[bgColor]} />
      <fog attach="fog" args={[bgColor, 15, 35]} />
      <Suspense fallback={null}>
        <SceneContent 
          activeSection={activeSection}
          onSectionChange={onSectionChange}
          onVinylClick={onVinylClick}
          isPlaying={isPlaying}
          isDark={isDark}
        />
      </Suspense>
    </Canvas>
  )
}
