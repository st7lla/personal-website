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
        <div>
          <h4 className="text-sm font-bold text-primary mb-2">Personal Info</h4>
          <p className="text-muted-foreground leading-relaxed">Stella Migmar</p>
          <p className="text-muted-foreground leading-relaxed">Toronto, Ontario, Canada</p>
        </div>
        <div>
          <h4 className="text-sm font-bold text-primary mb-2">Current Status</h4>
          <p className="text-muted-foreground leading-relaxed">Currently on a gap year</p>
          <p className="text-muted-foreground leading-relaxed">Incoming Engineering student at McMaster University (Fall 2026)</p>
        </div>
        <div>
          <h4 className="text-sm font-bold text-primary mb-2">Current Role</h4>
          <p className="text-muted-foreground leading-relaxed">Product Intern at Wealthsimple</p>
          <p className="text-muted-foreground leading-relaxed text-sm">Team: Self Directed Investing</p>
          <p className="text-muted-foreground leading-relaxed text-sm">Focus: Options & Margins</p>
        </div>
        <div className="pt-2">
          <h4 className="text-sm font-bold text-primary mb-2">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {["React", "Next.js", "Node.js", "Raspberry Pi", "p5.js", "Hardware / Electronics"].map((tech) => (
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
          {
            name: "Mensa",
            description: "Raspberry Pi touchscreen kitchen recipe finder. Designed as a modern kitchen interface.",
            tech: "React, Next.js, Node.js, Raspberry Pi",
          },
          {
            name: "Electronic Mural (E-Mural)",
            description: "First student-programmed electronic mural at my school. Allows students to submit live digital artwork.",
            tech: "p5.js, Hardware",
          },
          {
            name: "Google Code Next Chapter",
            description: "Founder of Canada's first Google Code Next chapter. Secured a $50,000 grant, built a student makerspace, and grew participation from 12 to 70+ students.",
            tech: "Community & Education",
          },
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
          { role: "Product Intern", company: "Wealthsimple", period: "Current" },
          { role: "Team Lead", company: "FIRST Robotics Team 1310", period: "Previous" },
          { role: "Apprentice", company: "Creative Destruction Lab", period: "Previous" },
          { role: "National Ambassador", company: "Hackergal", period: "Previous" },
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
          {"I'm always open to discussing new projects, creative ideas, or opportunities."}
        </p>
        <div className="space-y-3 pt-4">
          <a href="mailto:your@email.com" className="block text-primary hover:underline">
            your@email.com
          </a>
          <a href="#" className="block text-primary hover:underline">
            linkedin.com/in/stellamigmar
          </a>
          <a href="https://github.com/st7lla" className="block text-primary hover:underline">
            github.com/st7lla
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
          className="fixed right-0 top-0 h-full w-full sm:w-96 bg-card/95 backdrop-blur-lg z-50 border-l border-border/50 overflow-y-auto"
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
