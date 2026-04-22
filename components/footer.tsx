"use client"

import Image from "next/image"
import Link from "next/link"

const sections = [
  {
    title: "Product",
    links: [
      { label: "Markets", href: "#markets" },
      { label: "Agents", href: "#agents" },
      { label: "Create", href: "#create" },
      { label: "Portfolio", href: "#portfolio" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "#docs" },
      { label: "Leaderboard", href: "#rank" },
      { label: "API", href: "#docs" },
      { label: "Status", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <Image src="/logo.jpg" alt="Lumora" width={24} height={24} className="rounded" />
              <span className="font-semibold text-foreground">Lumora</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              AI-powered prediction markets. Trade binary contracts on crypto, on-chain metrics,
              and macro events - settled by agents.
            </p>
            <div className="mt-4 flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-live" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <span className="text-caption text-primary">All systems operational</span>
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <div className="text-caption text-foreground">{section.title}</div>
              <ul className="mt-3 space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Lumora Labs. All rights reserved.</span>
          <div className="flex items-center gap-4 font-mono">
            <span className="tabular-nums">v0.8.2-beta</span>
            <span className="h-3 w-px bg-border" />
            <Link
              href="https://x.com/Lumora_so"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
              aria-label="X / Twitter"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
