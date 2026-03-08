"use client"

import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"

const projects = [
  {
    name: "Mensa",
    description: "Raspberry Pi touchscreen kitchen recipe finder. A modern kitchen interface built for my countertop — runs React/Next.js on actual hardware.",
    tags: ["React", "Next.js", "Node.js", "Raspberry Pi"],
    status: "active",
    link: null,
  },
  {
    name: "E-Mural",
    description: "First student-programmed electronic mural at my school. Students submit live digital artwork that gets displayed in the hallway in real time.",
    tags: ["p5.js", "Hardware", "JavaScript"],
    status: "shipped",
    link: null,
  },
  {
    name: "Code Next Chapter",
    description: "Founded Canada's first Google Code Next chapter. Secured a $50,000 grant from Google, built an open electronics & builder space, and grew participation from 12 to 70+ students.",
    tags: ["Education", "Leadership", "Community"],
    status: "ongoing",
    link: null,
  },
  {
    name: "Grow an Aquarium",
    description: "A Roblox game where players grow and manage their own aquarium. Built with external code editors and Roblox's Lua scripting.",
    tags: ["Lua", "Roblox", "Game Dev"],
    status: "shipped",
    link: null,
  },
]

const statusColors: Record<string, string> = {
  active: "text-green-400 border-green-400/30 bg-green-400/10",
  shipped: "text-muted-foreground border-border bg-muted/30",
  ongoing: "text-blue-400 border-blue-400/30 bg-blue-400/10",
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-8 py-16">
        <Link href="/" className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors mb-12">
          <ArrowLeft className="w-3 h-3" /> back
        </Link>
        <h1 className="font-mono font-bold text-2xl text-foreground">projects</h1>
        <p className="font-mono text-sm text-muted-foreground mt-1 mb-10">things i've built</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {projects.map((p) => (
            <div key={p.name} className="border border-border rounded-xl p-5 bg-card hover:bg-card/80 hover:border-border/80 transition-all">
              <div className="w-full h-36 rounded-lg bg-muted/30 border border-border mb-4 flex items-center justify-center">
                <span className="font-mono text-xs text-muted-foreground/40">{p.name.toLowerCase()}</span>
              </div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-mono font-bold text-foreground text-sm">{p.name}</h3>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${statusColors[p.status]}`}>{p.status}</span>
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
              <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-3">{p.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((tag) => (
                  <span key={tag} className="font-mono text-xs px-2 py-0.5 bg-muted/40 border border-border rounded-full text-muted-foreground">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
