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
      <MusicPlayer isPlaying={isPlaying} onPlayPause={handlePlayPause} isDark={isDark} />
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
          <h1 style={{ fontFamily: "var(--font-cursive, 'Great Vibes', cursive)" }} className="text-4xl text-foreground mb-1">stella migmar</h1>
          <p className="font-mono text-sm text-muted-foreground mb-5">18 · toronto</p>
          <p className="font-mono text-sm text-foreground/80 leading-relaxed mb-6 max-w-xs">
            i build quirky tools for problems i actually care about —
            hardware, code, or whatever it takes.
          </p>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse mt-1.5 shrink-0"></span>
              <p className="font-mono text-xs text-muted-foreground">product intern @ wealthsimple — self directed investing, options &amp; margin</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></span>
              <p className="font-mono text-xs text-muted-foreground">founder, code next affiliate (toronto) — $50k grant from google, open electronics &amp; builder sessions</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 mt-1.5 shrink-0"></span>
              <p className="font-mono text-xs text-muted-foreground">frc team #1310 lead — 2024 district championship winners, 100+ competing teams</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 mt-1.5 shrink-0"></span>
              <p className="font-mono text-xs text-muted-foreground">apprentice, creative destruction lab</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 mt-1.5 shrink-0"></span>
              <p className="font-mono text-xs text-muted-foreground">taught girls how to code as a national ambassador</p>
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
