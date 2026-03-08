"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, MeshReflectorMaterial, OrbitControls, Stars, useGLTF } from "@react-three/drei"
import { useRef, useState, Suspense, useEffect, useMemo } from "react"
import * as THREE from "three"

function MillenniumFalcon({ isPlaying, onClick, isDark }: { isPlaying: boolean; onClick: () => void; isDark: boolean }) {
  const { scene } = useGLTF("/falcon.glb")
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.castShadow = true
        mesh.receiveShadow = true
        const darkColor = hovered ? "#c0bfb0" : "#a0a090"
        const lightColor = hovered ? "#d4a0b0" : "#c47a8a"
        const mat = new THREE.MeshStandardMaterial({
          color: isDark ? darkColor : lightColor,
          metalness: isDark ? 0.4 : 0.7,
          roughness: isDark ? 0.7 : 0.3,
        })
        mesh.material = mat
      }
    })
  }, [scene, hovered, isDark])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.06
    }
  })

  return (
    <Float speed={0.6} rotationIntensity={0.02} floatIntensity={0.08}>
      <group
        ref={groupRef}
        rotation={[-0.2, -0.5, 0.05]}
        scale={0.9}
        onClick={onClick}
        onPointerOver={() => { setHovered(true); document.body.style.cursor = "pointer" }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = "default" }}
      >
        <primitive object={scene} />
        {/* Engine glow */}
        {isPlaying && (
          <>
            <pointLight position={[-1.5, 0, 0]} color="#ff6020" intensity={3} distance={4} />
            <pointLight position={[0, -0.5, 0]} color="#4060ff" intensity={0.6} distance={5} />
          </>
        )}
      </group>
    </Float>
  )
}

function ShootingStar() {
  const ref = useRef<THREE.Mesh>(null)
  const trailRef = useRef<THREE.Mesh>(null)
  const active = useRef(false)
  const progress = useRef(0)
  const nextShot = useRef(Math.random() * 10 + 30)

  useFrame((_, delta) => {
    nextShot.current -= delta
    if (nextShot.current <= 0 && !active.current) {
      active.current = true
      progress.current = 0
      nextShot.current = Math.random() * 10 + 30
    }
    if (active.current && ref.current && trailRef.current) {
      progress.current += delta * 0.7
      const t = progress.current
      ref.current.position.set(-50 + t * 100, 25 - t * 18, -40)
      trailRef.current.position.set(ref.current.position.x - 1.5, ref.current.position.y + 1.1, -40)
      if (progress.current >= 1) active.current = false
    }
    if (ref.current) ref.current.visible = active.current
    if (trailRef.current) trailRef.current.visible = active.current
  })

  return (
    <>
      <mesh ref={ref} visible={false}>
        <sphereGeometry args={[0.08, 6, 6]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh ref={trailRef} visible={false} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[2.5, 0.04, 0.04]} />
        <meshBasicMaterial color="#aaccff" transparent opacity={0.5} />
      </mesh>
    </>
  )
}

function TwinkleStar({ position, phase }: { position: [number,number,number]; phase: number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (ref.current) {
      (ref.current.material as THREE.MeshBasicMaterial).opacity =
        0.2 + Math.abs(Math.sin(state.clock.elapsedTime * (0.4 + phase * 0.25) + phase)) * 0.8
    }
  })
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.045, 4, 4]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
    </mesh>
  )
}

function TwinklingStars() {
  const positions = useMemo(() =>
    Array.from({ length: 80 }, () => [
      (Math.random()-0.5)*200, (Math.random()-0.5)*80+20, (Math.random()-0.5)*100-20
    ] as [number,number,number]), [])
  return <>{positions.map((pos, i) => <TwinkleStar key={i} position={pos} phase={i * 0.3} />)}</>
}

function ReflectiveFloor({ isDark }: { isDark: boolean }) {
  if (!isDark) return (
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,-2.5,0]}>
      <planeGeometry args={[50,50]} />
      <meshStandardMaterial color="#d5ccc0" roughness={0.8} />
    </mesh>
  )
  return (
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,-2.5,0]}>
      <planeGeometry args={[50,50]} />
      <MeshReflectorMaterial blur={[300,100]} resolution={1024} mixBlur={1} mixStrength={40}
        roughness={1} depthScale={1.2} minDepthThreshold={0.4} maxDepthThreshold={1.4}
        color="#0a0a12" metalness={0.5} mirror={0.5} />
    </mesh>
  )
}

interface Scene3DProps {
  onVinylClick: () => void
  isPlaying: boolean
  isDark: boolean
}

export function Scene3D({ onVinylClick, isPlaying, isDark }: Scene3DProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return (
    <div className="w-full h-full flex items-center justify-center bg-background">
      <div className="text-muted-foreground animate-pulse font-mono text-sm">loading...</div>
    </div>
  )

  const bgColor = isDark ? "#0a0a14" : "#e8e0d5"

  return (
    <Canvas camera={{ position: [-1, 3.5, 8], fov: 42 }} shadows
      style={{ width:"100%", height:"100%", background: bgColor }}
      gl={{ antialias: true, alpha: false }}>
      <color attach="background" args={[bgColor]} />
      <fog attach="fog" args={[bgColor, 18, 38]} />
      <Suspense fallback={null}>
        <ambientLight intensity={isDark ? 0.5 : 1.2} />
        <directionalLight position={[5, 10, 5]} intensity={isDark ? 1.5 : 2.5} castShadow color={isDark ? "#fffbe8" : "#fff0f5"} />
        <pointLight position={[-8, 5, -5]} intensity={0.8} color="#4a90d4" />
        <pointLight position={[8, 3, 3]} intensity={0.6} color="#d4a574" />
        <group position={[-2, 0, 0]}>
          <MillenniumFalcon isPlaying={isPlaying} onClick={onVinylClick} isDark={isDark} />
        </group>
        <ReflectiveFloor isDark={isDark} />
        {isDark && (
          <>
            <Stars radius={100} depth={50} count={2500} factor={3} saturation={0} fade speed={0.8} />
            <TwinklingStars />
            <ShootingStar />
          </>
        )}
        <Environment preset={isDark ? "night" : "sunset"} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.04}
          rotateSpeed={0.35}
          zoomSpeed={0.4}
          minDistance={4}
          maxDistance={14}
          minPolarAngle={Math.PI/5}
          maxPolarAngle={Math.PI/2.1}
        />
      </Suspense>
    </Canvas>
  )
}
