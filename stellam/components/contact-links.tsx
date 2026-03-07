"use client"

import { Github, Linkedin, Mail } from "lucide-react"

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

interface ContactLinksProps {
  hidden?: boolean
}

export function ContactLinks({ hidden = false }: ContactLinksProps) {
  const links = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "mailto:your@email.com", label: "Email" },
    { icon: Github, href: "https://github.com/st7lla", label: "GitHub" },
  ]

  if (hidden) return null

  return (
    <div className="fixed top-6 right-6 z-40">
      <div className="flex items-center gap-3">
        {links.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-secondary/50"
            aria-label={label}
          >
            <Icon className="w-5 h-5" />
          </a>
        ))}
        
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-secondary/50"
          aria-label="X"
        >
          <XIcon className="w-5 h-5" />
        </a>
      </div>
    </div>
  )
}