"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, ArrowRight } from "lucide-react"

interface SectionPanelProps {
  activeSection: string | null
  onClose: () => void
}

const sections: Record<string, { title: string; content: React.ReactNode }> = {
  about: {
    title: "about me",
    content: (
      <div className="space-y-3">
        <div className="border border-white/10 rounded-lg p-4 bg-white/5">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-3">who</p>
          <p className="text-white font-mono text-lg">Stella Migmar</p>
          <p className="text-white/50 font-mono text-sm">18 · Toronto, Ontario</p>
        </div>
        <div className="border border-white/10 rounded-lg p-4 bg-white/5">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-3">right now</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block"></span>
              <p className="text-white/80 font-mono text-sm">gap year</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block"></span>
              <p className="text-white/80 font-mono text-sm">Product Intern @ Wealthsimple</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block"></span>
              <p className="text-white/80 font-mono text-sm">incoming McMaster Engineering, fall 2026</p>
            </div>
          </div>
        </div>
        <div className="border border-white/10 rounded-lg p-4 bg-white/5">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-3">stack</p>
          <div className="flex flex-wrap gap-2">
            {["React", "Next.js", "Node.js", "Raspberry Pi", "p5.js", "Hardware"].map((tech) => (
              <span key={tech} className="px-2.5 py-1 text-xs bg-white/10 border border-white/10 rounded-full text-white/70 font-mono hover:bg-white/20 transition-colors">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  projects: {
    title: "things i've built",
    content: (
      <div className="space-y-3">
        {[
          {
            name: "Mensa",
            tag: "hardware · software",
            description: "Raspberry Pi touchscreen kitchen recipe finder. A modern kitchen interface built for my countertop.",
            status: "active",
          },
          {
            name: "E-Mural",
            tag: "hardware · p5.js",
            description: "First student-programmed electronic mural at my school — students submit live digital art displayed in the hallway.",
            status: "shipped",
          },
          {
            name: "Google Code Next Chapter",
            tag: "education · leadership",
            description: "Founded Canada's first chapter. $50k grant, student makerspace, grew from 12 → 70+ students.",
            status: "ongoing",
          },
        ].map((project) => (
          <div key={project.name} className="group border border-white/10 rounded-lg p-4 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all cursor-default">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="text-white font-mono font-bold">{project.name}</h4>
                <p className="text-white/30 font-mono text-xs mt-0.5">{project.tag}</p>
              </div>
              <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${
                project.status === "active" ? "text-green-400 border-green-400/30 bg-green-400/10" :
                project.status === "ongoing" ? "text-blue-400 border-blue-400/30 bg-blue-400/10" :
                "text-white/40 border-white/20 bg-white/5"
              }`}>{project.status}</span>
            </div>
            <p className="text-white/50 font-mono text-xs leading-relaxed">{project.description}</p>
          </div>
        ))}
      </div>
    ),
  },
  experience: {
    title: "experience",
    content: (
      <div className="space-y-3">
        {[
          { role: "Product Intern", company: "Wealthsimple", period: "2025 – present", current: true, detail: "Self Directed Investing · Options & Margins" },
          { role: "Team Captain", company: "FIRST Robotics #1310", period: "prev", current: false, detail: "Led a 30+ person team through regional competitions" },
          { role: "Apprentice", company: "Creative Destruction Lab", period: "prev", current: false, detail: "" },
          { role: "National Ambassador", company: "Hackergal", period: "prev", current: false, detail: "Ran biweekly coding workshops · spoke at national events" },
        ].map((job, i) => (
          <div key={i} className="border border-white/10 rounded-lg p-4 bg-white/5 hover:bg-white/10 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-white font-mono font-bold text-sm">{job.role}</p>
                  {job.current && <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block"></span>}
                </div>
                <p className="text-white/50 font-mono text-xs mt-0.5">{job.company}</p>
                {job.detail ? <p className="text-white/30 font-mono text-xs mt-2 leading-relaxed">{job.detail}</p> : null}
              </div>
              <p className="text-white/20 font-mono text-xs">{job.period}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  goodreads: {
    title: "good reads",
    content: (
      <div className="space-y-3">
        <p className="text-white/30 font-mono text-xs">things worth your time —</p>
        {[
          {
            title: "Zeroth-Principles Thinking",
            author: "Bryan Johnson",
            url: "https://medium.com/@bryan-johnson/zeroth-principles-thinking-9376d0b7e7f5",
            platform: "Medium",
          },
          {
            title: "The Right Philosophy for Our Times",
            author: "Adam Dhalla",
            url: "https://medium.com/curious/the-right-philosophy-for-our-times-356b723b6ae4",
            platform: "Medium",
          },
          {
            title: "On Learning Deeply",
            author: "Adam Dhalla",
            url: "https://medium.com/@adamdhalla/on-learning-deeply-7efd9a4284a8",
            platform: "Medium",
          },
          {
            title: "audrey's thread on making things",
            author: "@audrlo",
            url: "https://x.com/audrlo/status/2029318318180712480",
            platform: "X",
          },
        ].map((item) => (
          <a
            key={item.title}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start justify-between border border-white/10 rounded-lg p-4 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all"
          >
            <div>
              <p className="text-white font-mono text-sm group-hover:text-white/90 transition-colors leading-snug">{item.title}</p>
              <p className="text-white/30 font-mono text-xs mt-1">{item.author} · {item.platform}</p>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors mt-0.5 shrink-0 ml-3" />
          </a>
        ))}
      </div>
    ),
  },
}

export function SectionPanel({ activeSection, onClose }: SectionPanelProps) {
  const section = activeSection ? sections[activeSection] : null

  return (
    <AnimatePresence>
      {section && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-40 backdrop-blur-2xl bg-black/50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-6"
          >
            <div
              className="pointer-events-auto w-full max-w-sm max-h-[80vh] overflow-y-auto rounded-2xl"
              style={{
                background: "rgba(10, 10, 20, 0.92)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 25px 60px rgba(0,0,0,0.6)"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-white font-mono font-bold text-base tracking-wide">{section.title}</h2>
                  <button
                    onClick={onClose}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/30 hover:text-white/70"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {section.content}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
