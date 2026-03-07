"use client"

import { useState, useCallback, useEffect } from "react"
import dynamic from "next/dynamic"
import { MusicPlayer } from "@/components/music-player"
import { ContactLinks } from "@/components/contact-links"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

const Scene3D = dynamic(
  () => import("@/components/scene-3d").then((mod) => mod.Scene3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-background">
        <div className="text-muted-foreground animate-pulse font-mono text-sm">loading...</div>
      </div>
    )
  }
)

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark")
    else document.documentElement.classList.remove("dark")
  }, [isDark])

  const handleVinylClick = useCallback(() => setIsPlaying((prev) => !prev), [])
  const handlePlayPause = useCallback(() => setIsPlaying((prev) => !prev), [])
  const handleThemeToggle = useCallback(() => setIsDark((prev) => !prev), [])

  return (
    <main className="w-full h-screen overflow-hidden relative bg-background transition-colors duration-500">
      <ThemeToggle isDark={isDark} onToggle={handleThemeToggle} />
      <MusicPlayer isPlaying={isPlaying} onPlayPause={handlePlayPause} />
      <ContactLinks />

      {/* 3D Scene */}
      <div className="absolute inset-0 w-full h-full">
        <Scene3D
          onVinylClick={handleVinylClick}
          isPlaying={isPlaying}
          isDark={isDark}
        />
      </div>

      {/* About text overlay - right side */}
      <div className="absolute right-0 top-0 h-full w-[38%] flex flex-col justify-center pr-12 pl-4 z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <h1 className="font-mono font-bold text-2xl text-foreground mb-1">stella migmar</h1>
          <p className="font-mono text-sm text-muted-foreground mb-6">18 · toronto</p>
          <p className="font-mono text-sm text-foreground/80 leading-relaxed mb-6 max-w-xs">
            builder & tinkerer. i make things with code and hardware —
            from robots to raspberry pi kitchen displays to maker programs for students.
            currently interning at wealthsimple on self directed investing.
          </p>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              <p className="font-mono text-xs text-muted-foreground">product intern @ wealthsimple</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              <p className="font-mono text-xs text-muted-foreground">incoming mcmaster engineering, fall 2026</p>
            </div>
          </div>
          <div className="flex gap-4 mt-8">
            <Link href="/projects" className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors hover:translate-x-0.5 inline-block">
              projects →
            </Link>
            <Link href="/reads" className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors hover:translate-x-0.5 inline-block">
              good reads →
            </Link>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground font-mono z-10 pointer-events-none">
        click ship to toggle engine · drag to rotate
      </div>
    </main>
  )
}
