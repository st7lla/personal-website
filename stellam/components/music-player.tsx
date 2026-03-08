"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"
import { Slider } from "@/components/ui/slider"

interface MusicPlayerProps {
  isPlaying: boolean
  onPlayPause: () => void
}

const playlist = [
  { url: "/song.webm", name: "My Lucky Stars", artist: "Tupperwave" },
  { url: "/nangs.webm", name: "Xtal", artist: "Aphex Twin" },
  { url: "/xtal.webm", name: "Nangs", artist: "Tame Impala" },
]

export function MusicPlayer({ isPlaying, onPlayPause }: MusicPlayerProps) {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)
  const [trackIndex, setTrackIndex] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const track = playlist[trackIndex]

  // When track changes, reload audio and play if needed
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.src = track.url
    audio.load()
    setCurrentTime(0)
    setDuration(0)
    if (isPlaying) audio.play().catch(() => {})
  }, [trackIndex])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const onEnded = () => setTrackIndex((i) => (i + 1) % playlist.length)
    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", onEnded)
    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", onEnded)
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) audio.play().catch(() => {})
    else audio.pause()
  }, [isPlaying])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = value[0]
    setCurrentTime(value[0])
  }

  const handlePrev = () => setTrackIndex((i) => (i - 1 + playlist.length) % playlist.length)
  const handleNext = () => setTrackIndex((i) => (i + 1) % playlist.length)

  return (
    <div className="fixed top-6 left-6 z-50 bg-card/80 backdrop-blur-md rounded-lg p-4 w-72 border border-border/50 shadow-xl">
      <audio ref={audioRef} src={track.url} />

      <div className="flex items-center gap-4 mb-3">
        <div
          className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0"
          style={{ animation: isPlaying ? "spin 3s linear infinite" : "none" }}
        >
          <div className="w-5 h-5 rounded-full bg-background" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-foreground truncate">{track.name}</p>
          <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
        </div>
      </div>

      <div className="mb-3">
        <Slider value={[currentTime]} max={duration || 100} step={0.1} onValueChange={handleSeek} className="w-full" />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={handlePrev} className="p-1.5 hover:text-primary transition-colors text-muted-foreground">
            <SkipBack className="w-4 h-4" />
          </button>
          <button onClick={onPlayPause} className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          <button onClick={handleNext} className="p-1.5 hover:text-primary transition-colors text-muted-foreground">
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsMuted(!isMuted)} className="p-1.5 hover:text-primary transition-colors text-muted-foreground">
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <Slider value={[isMuted ? 0 : volume]} max={1} step={0.01} onValueChange={(v) => { setVolume(v[0]); setIsMuted(false) }} className="w-16" />
        </div>
      </div>
    </div>
  )
}
