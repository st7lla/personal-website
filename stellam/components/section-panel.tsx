"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface SectionPanelProps {
  activeSection: string | null
  onClose: () => void
}

const sections: Record<string, { title: string; content: React.ReactNode }> = {
  about: {
    title: "About Me",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          {"I'm a creative developer passionate about crafting immersive digital experiences that blend art and technology."}
        </p>
        <p className="text-muted-foreground leading-relaxed">
          With a love for jazz, design, and clean code, I create websites and applications that feel as good as they look.
        </p>
        <div className="pt-4">
          <h4 className="text-sm font-bold text-primary mb-2">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {["React", "Next.js", "Three.js", "TypeScript", "Node.js", "Python"].map((tech) => (
              <span key={tech} className="px-3 py-1 text-xs bg-secondary rounded-full text-secondary-foreground">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  projects: {
    title: "Projects",
    content: (
      <div className="space-y-6">
        {[
          { name: "Project Alpha", description: "A 3D visualization platform", tech: "Three.js, React" },
          { name: "Jazz Archive", description: "Digital music collection app", tech: "Next.js, Supabase" },
          { name: "Motion Studio", description: "Animation toolkit for the web", tech: "Framer Motion, TypeScript" },
        ].map((project) => (
          <div key={project.name} className="group cursor-pointer">
            <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">
              {project.name}
            </h4>
            <p className="text-sm text-muted-foreground">{project.description}</p>
            <p className="text-xs text-primary/60 mt-1">{project.tech}</p>
          </div>
        ))}
      </div>
    ),
  },
  experience: {
    title: "Experience",
    content: (
      <div className="space-y-6">
        {[
          { role: "Senior Developer", company: "Tech Studio", period: "2023 - Present" },
          { role: "Creative Developer", company: "Design Agency", period: "2021 - 2023" },
          { role: "Frontend Engineer", company: "Startup Inc", period: "2019 - 2021" },
        ].map((job) => (
          <div key={job.company} className="border-l-2 border-primary/30 pl-4">
            <h4 className="font-bold text-foreground">{job.role}</h4>
            <p className="text-sm text-primary">{job.company}</p>
            <p className="text-xs text-muted-foreground mt-1">{job.period}</p>
          </div>
        ))}
      </div>
    ),
  },
  contact: {
    title: "Contact",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          {"I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions."}
        </p>
        <div className="space-y-3 pt-4">
          <a href="mailto:your@email.com" className="block text-primary hover:underline">
            your@email.com
          </a>
          <a href="#" className="block text-primary hover:underline">
            linkedin.com/in/yourname
          </a>
          <a href="#" className="block text-primary hover:underline">
            github.com/yourname
          </a>
        </div>
      </div>
    ),
  },
}

export function SectionPanel({ activeSection, onClose }: SectionPanelProps) {
  const section = activeSection ? sections[activeSection] : null

  return (
    <AnimatePresence>
      {section && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 h-full w-full sm:w-96 bg-card/95 backdrop-blur-lg z-40 border-l border-border/50 overflow-y-auto"
        >
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground font-serif">{section.title}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-secondary rounded-full transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {section.content}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
