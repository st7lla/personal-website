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
      <Sun className={`w-4 h-4 transition-all ${isDark ? "text-muted-foreground scale-75" : "text-foreground/60 scale-100"}`} />
      <div className="relative w-10 h-5 rounded-full" style={{ background: isDark ? "#2a2520" : "#ddd5cc" }}>
        <div
          className="absolute top-0.5 w-4 h-4 rounded-full transition-all duration-300"
          style={{
            left: isDark ? "1.25rem" : "0.125rem",
            background: isDark ? "#7a9ab5" : "#c47a8a",
          }}
        />
      </div>
      <Moon className={`w-4 h-4 transition-all ${isDark ? "text-foreground/60 scale-100" : "text-muted-foreground scale-75"}`} />
    </button>
  )
}
