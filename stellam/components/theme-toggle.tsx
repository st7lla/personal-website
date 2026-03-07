"use client"

import { Moon, Sun } from "lucide-react"

interface ThemeToggleProps {
  isDark: boolean
  onToggle: () => void
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border hover:bg-card transition-colors"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Sun className={`w-4 h-4 transition-all ${isDark ? 'text-muted-foreground scale-75' : 'text-primary scale-100'}`} />
      <div className="relative w-10 h-5 bg-muted rounded-full">
        <div 
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-primary transition-all duration-300 ${isDark ? 'left-5' : 'left-0.5'}`}
        />
      </div>
      <Moon className={`w-4 h-4 transition-all ${isDark ? 'text-primary scale-100' : 'text-muted-foreground scale-75'}`} />
    </button>
  )
}
