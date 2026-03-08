"use client"

import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"

const reads = [
  {
    title: "Zeroth-Principles Thinking",
    author: "Bryan Johnson",
    platform: "Medium",
    url: "https://medium.com/@bryan-johnson/zeroth-principles-thinking-9376d0b7e7f5",
    note: "how to think from scratch, not just first principles",
  },
  {
    title: "The Right Philosophy for Our Times",
    author: "Adam Dhalla",
    platform: "Medium",
    url: "https://medium.com/curious/the-right-philosophy-for-our-times-356b723b6ae4",
    note: "a framework for navigating this era",
  },
  {
    title: "On Learning Deeply",
    author: "Adam Dhalla",
    platform: "Medium",
    url: "https://medium.com/@adamdhalla/on-learning-deeply-7efd9a4284a8",
    note: "quality over quantity when it comes to knowledge",
  },
  {
    title: "audrey's thread on making things",
    author: "@audrlo",
    platform: "X",
    url: "https://x.com/audrlo/status/2029318318180712480",
    note: "one of those threads that stays with you",
  },
]

export default function ReadsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-2xl mx-auto px-8 py-16">
        <Link href="/" className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors mb-12">
          <ArrowLeft className="w-3 h-3" /> back
        </Link>
        <h1 className="font-mono font-bold text-2xl text-foreground">good reads</h1>
        <p className="font-mono text-sm text-muted-foreground mt-1 mb-10">things worth your time</p>

        <div className="flex flex-col gap-3">
          {reads.map((item, i) => (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-border rounded-xl p-5 bg-card hover:bg-card/80 hover:border-border/80 transition-all flex items-start justify-between gap-4"
            >
              <div>
                <p className="font-mono text-sm text-foreground font-medium group-hover:text-foreground/80 leading-snug">{item.title}</p>
                <p className="font-mono text-xs text-muted-foreground mt-1">{item.author} · {item.platform}</p>
                {item.note && <p className="font-mono text-xs text-muted-foreground/60 mt-2 italic">{item.note}</p>}
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors shrink-0 mt-0.5" />
            </a>
          ))}
        </div>
      </div>
    </main>
  )
}
