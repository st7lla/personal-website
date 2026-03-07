"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, MeshReflectorMaterial, OrbitControls, Stars } from "@react-three/drei"
import { useRef, useState, Suspense, useEffect, useMemo } from "react"
import * as THREE from "three"

function MillenniumFalcon({ isPlaying, onClick }: { isPlaying: boolean; onClick: () => void }) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.12
    }
  })

  const hull = hovered ? "#a0a08a" : "#8a8a74"
  const dark = "#4a4a3e"
  const mid = "#6a6a58"
  const light = "#b0b09a"

  return (
    <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.2}>
      <group
        ref={groupRef}
        rotation={[0.25, -0.5, 0.05]}
        scale={1.3}
        onClick={onClick}
        onPointerOver={() => { setHovered(true); document.body.style.cursor = "pointer" }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = "default" }}
      >
        {/* Main hull */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[2.4, 2.6, 0.38, 48]} />
          <meshStandardMaterial color={hull} metalness={0.55} roughness={0.45} />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[1.2, 1.8, 0.18, 32]} />
          <meshStandardMaterial color={mid} metalness={0.5} roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.22, 0]}>
          <cylinderGeometry args={[1.0, 1.6, 0.14, 32]} />
          <meshStandardMaterial color={dark} metalness={0.5} roughness={0.5} />
        </mesh>
        {[1.6, 2.0, 2.3].map((r, i) => (
          <mesh key={i} position={[0, 0.2, 0]}>
            <torusGeometry args={[r, 0.04, 6, 48]} />
            <meshStandardMaterial color={i === 1 ? light : dark} metalness={0.7} roughness={0.3} />
          </mesh>
        ))}
        {/* Radar dish */}
        <group position={[-0.3, 0.42, 0.5]}>
          <mesh>
            <cylinderGeometry args={[0.06, 0.06, 0.35, 8]} />
            <meshStandardMaterial color={dark} metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0, 0.42, 0.12, 20]} />
            <meshStandardMaterial color={light} metalness={0.85} roughness={0.15} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 0.22, 0]}>
            <torusGeometry args={[0.42, 0.025, 6, 24]} />
            <meshStandardMaterial color={mid} metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
        {/* Mandibles */}
        {[0.55, -0.55].map((z, mi) => (
          <group key={mi} position={[2.5, 0.0, z]} rotation={[0, mi === 0 ? 0.08 : -0.08, 0]}>
            <mesh castShadow>
              <boxGeometry args={[1.5, 0.28, 0.55]} />
              <meshStandardMaterial color={hull} metalness={0.55} roughness={0.45} />
            </mesh>
            {[0.3, -0.3].map((x, i) => (
              <mesh key={i} position={[x, 0.15, 0]}>
                <boxGeometry args={[0.08, 0.04, 0.5]} />
                <meshStandardMaterial color={dark} metalness={0.7} roughness={0.3} />
              </mesh>
            ))}
          </group>
        ))}
        <mesh position={[3.45, 0, 0]} castShadow>
          <boxGeometry args={[0.55, 0.25, 0.9]} />
          <meshStandardMaterial color={mid} metalness={0.55} roughness={0.45} />
        </mesh>
        {/* Cockpit */}
        <group position={[2.1, 0.18, 0.62]}>
          <mesh castShadow>
            <boxGeometry args={[0.6, 0.22, 0.38]} />
            <meshStandardMaterial color={mid} metalness={0.6} roughness={0.4} />
          </mesh>
          {[-0.06, 0, 0.06].map((z, i) => (
            <mesh key={i} position={[0.28, 0.04, z]}>
              <boxGeometry args={[0.06, 0.1, 0.07]} />
              <meshStandardMaterial color="#88ccff" emissive="#44aaff" emissiveIntensity={0.8} metalness={0.9} roughness={0.05} />
            </mesh>
          ))}
        </group>
        {/* Engines */}
        <group position={[-2.55, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.35, 0.55, 1.5]} />
            <meshStandardMaterial color={dark} metalness={0.65} roughness={0.35} />
          </mesh>
          {[-0.48, 0, 0.48].map((z, i) => (
            <group key={i} position={[-0.22, 0, z]}>
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.22, 0.26, 0.25, 12]} />
                <meshStandardMaterial color="#2a2a22" metalness={0.8} roughness={0.2} />
              </mesh>
              <mesh position={[-0.14, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <circleGeometry args={[0.19, 16]} />
                <meshStandardMaterial
                  color={isPlaying ? "#ff7020" : "#1a3a5a"}
                  emissive={isPlaying ? "#ff5500" : "#0a1a3a"}
                  emissiveIntensity={isPlaying ? 3 : 0.4}
                  side={THREE.DoubleSide}
                />
              </mesh>
            </group>
          ))}
          {isPlaying && <pointLight position={[-0.6, 0, 0]} color="#ff6020" intensity={3} distance={4} />}
        </group>
        {/* Surface greebles */}
        {([[0.6,0.22,0.8,0.5,0.06,0.35],[-0.4,0.22,-0.9,0.6,0.06,0.25],[0.1,0.22,-0.4,0.35,0.06,0.45],[-0.9,0.22,0.5,0.45,0.06,0.3],[1.0,0.22,-0.3,0.3,0.06,0.4],[-0.2,0.22,1.1,0.55,0.06,0.28],[0.7,0.22,-1.1,0.4,0.06,0.32],[-1.2,0.22,-0.4,0.38,0.06,0.38]] as number[][]).map(([x,y,z,w,h,d],i) => (
          <mesh key={i} position={[x,y,z]}>
            <boxGeometry args={[w,h,d]} />
            <meshStandardMaterial color={i%2===0?dark:mid} metalness={0.65} roughness={0.35} />
          </mesh>
        ))}
        {/* Turret */}
        <group position={[0.4, 0.48, -0.2]}>
          <mesh>
            <cylinderGeometry args={[0.18, 0.22, 0.18, 10]} />
            <meshStandardMaterial color={dark} metalness={0.8} roughness={0.2} />
          </mesh>
          {[-0.07, 0.07].map((z, i) => (
            <mesh key={i} position={[0.25, 0.06, z]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.025, 0.025, 0.4, 6]} />
              <meshStandardMaterial color="#3a3a30" metalness={0.9} roughness={0.1} />
            </mesh>
          ))}
        </group>
        {isPlaying && <pointLight position={[0, -0.8, 0]} color="#4060ff" intensity={0.8} distance={5} />}
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
      <meshStandardMaterial color="#d8d4cc" roughness={1} />
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

  const bgColor = isDark ? "#0a0a14" : "#eeeae3"

  return (
    <Canvas camera={{ position: [0, 3, 11], fov: 42 }} shadows
      style={{ width:"100%", height:"100%", background: bgColor }}
      gl={{ antialias: true, alpha: false }}>
      <color attach="background" args={[bgColor]} />
      <fog attach="fog" args={[bgColor, 18, 38]} />
      <Suspense fallback={null}>
        <ambientLight intensity={isDark ? 0.35 : 0.5} />
        <pointLight position={[10,10,10]} intensity={1.4} color="#d4a574" />
        <pointLight position={[-10,-10,-10]} intensity={0.4} color="#4a90d4" />
        <spotLight position={[0,15,5]} angle={0.4} penumbra={1} intensity={1.2} castShadow />
        <pointLight position={[5,5,-5]} intensity={0.6} color="#8888ff" />
        <group position={[-2.5, 0, 0]}>
          <MillenniumFalcon isPlaying={isPlaying} onClick={onVinylClick} />
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
        <OrbitControls enableZoom={true} enablePan={false}
          minDistance={5} maxDistance={15}
          minPolarAngle={Math.PI/5} maxPolarAngle={Math.PI/2.1} />
      </Suspense>
    </Canvas>
  )
}
