"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, Copy, Menu, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { LanguageToggle, useLanguage } from "@/components/language-toggle"
import { NotificationCenter } from "@/components/notification-center"
import { ThemeToggle } from "@/components/theme-toggle"
import { WalletButton } from "@/components/wallet-button"

export function Header() {
  const { t } = useLanguage()
  const navItems: { key: "markets" | "agents" | "create" | "rank" | "docs" | "portfolio"; href: string }[] = [
    { key: "markets", href: "#markets" },
    { key: "agents", href: "#agents" },
    { key: "create", href: "#create" },
    { key: "rank", href: "#rank" },
    { key: "docs", href: "#docs" },
    { key: "portfolio", href: "#portfolio" },
  ]

  const [copied, setCopied] = useState(false)
  const [contractAddress, setContractAddress] = useState("88888888888888888888888888888888")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("/api/config")
        const data = await response.json()
        if (data.contractAddress) {
          setContractAddress(data.contractAddress)
        }
      } catch (error) {
        console.error("Failed to fetch config:", error)
      }
    }

    fetchConfig()
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy address:", error)
    }
  }

  const shortAddress =
    contractAddress.length > 8
      ? `${contractAddress.slice(0, 4)}...${contractAddress.slice(-4)}`
      : contractAddress

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-3 md:h-16 md:px-4">
        <div className="flex items-center gap-2 md:gap-8">
          <Link href="#markets" className="flex items-center gap-2">
            <Image src="/logo.jpg" alt="Lumora Logo" width={28} height={28} className="rounded" />
            <span className="text-base font-semibold text-foreground md:text-lg">Lumora</span>
            <Badge variant="outline" className="hidden border-primary/50 text-primary text-[10px] font-medium sm:inline-flex">
              BETA
            </Badge>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1.5 md:gap-2">
          <button
            onClick={copyAddress}
            className="hidden cursor-pointer items-center gap-2 rounded-md border border-border bg-secondary/50 px-2.5 py-1.5 transition-colors hover:bg-secondary lg:flex"
          >
            <span className="text-xs text-muted-foreground">CA:</span>
            <span className="font-mono text-xs text-foreground">{shortAddress}</span>
            {copied ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3 text-muted-foreground" />}
          </button>

          <div className="hidden items-center gap-1.5 sm:flex">
            <LanguageToggle />
            <NotificationCenter />
            <ThemeToggle />
            <Link
              href="https://x.com/Lumora_so"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-secondary"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
          </div>

          <WalletButton />

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-secondary md:hidden"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-3 py-3">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between gap-2 border-t border-border pt-3">
              <button
                onClick={copyAddress}
                className="flex flex-1 cursor-pointer items-center justify-between gap-2 rounded-md border border-border bg-secondary/50 px-3 py-2"
              >
                <span className="text-xs text-muted-foreground">CA</span>
                <span className="font-mono text-xs text-foreground">{shortAddress}</span>
                {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5 text-muted-foreground" />}
              </button>
              <div className="flex items-center gap-1.5">
                <LanguageToggle />
                <NotificationCenter />
                <ThemeToggle />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
