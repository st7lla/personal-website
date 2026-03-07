"use client"

import { useState, useCallback, useEffect } from "react"
import dynamic from "next/dynamic"
import { MusicPlayer } from "@/components/music-player"
import { ContactLinks } from "@/components/contact-links"
import { SectionPanel } from "@/components/section-panel"
import { ThemeToggle } from "@/components/theme-toggle"

// Dynamic import for the 3D scene to avoid SSR issues
const Scene3D = dynamic(
  () => import("@/components/scene-3d").then((mod) => mod.Scene3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-background">
        <div className="text-muted-foreground animate-pulse">Loading 3D scene...</div>
      </div>
    )
  }
)

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isDark, setIsDark] = useState(true)

  // Apply theme to document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const handleSectionChange = useCallback((section: string) => {
    setActiveSection(section)
  }, [])

  const handleCloseSection = useCallback(() => {
    setActiveSection(null)
  }, [])

  const handleVinylClick = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  const handlePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  const handleThemeToggle = useCallback(() => {
    setIsDark((prev) => !prev)
  }, [])

  return (
    <main className="w-full h-screen overflow-hidden relative bg-background transition-colors duration-500">
      {/* Theme Toggle - Top Center */}
      <ThemeToggle isDark={isDark} onToggle={handleThemeToggle} />

      {/* Music Player - Top Left */}
      <MusicPlayer isPlaying={isPlaying} onPlayPause={handlePlayPause} />

      {/* Contact Links - Top Right */}
      <ContactLinks />

      {/* 3D Scene - Full Screen */}
      <div className="absolute inset-0 w-full h-full">
        <Scene3D
          activeSection={activeSection || ""}
          onSectionChange={handleSectionChange}
          onVinylClick={handleVinylClick}
          isPlaying={isPlaying}
          isDark={isDark}
        />
      </div>

      {/* Section Panel - Slides in from right */}
      <SectionPanel
        activeSection={activeSection}
        onClose={handleCloseSection}
      />

      {/* Click hint */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground transition-colors z-10">
        Click the ship to toggle engine glow • Drag to rotate view • Click menu to explore
      </div>
    </main>
  )
}
