"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, Copy, Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { WalletButton } from "@/components/wallet-button"
import { Badge } from "@/components/ui/badge"

const navItems = [
  { label: "Overview", href: "#overview" },
  { label: "Metrics", href: "#metrics" },
  { label: "Utility", href: "#utility" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "FAQ", href: "#faq" },
  { label: "Docs", href: "#docs" },
  { label: "Community", href: "#community" },
]

export function Header() {
  const [copied, setCopied] = useState(false)
  const [contractAddress, setContractAddress] = useState("So11111111111111111111111111111111111111112")
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

  const shortAddress =
    contractAddress.length > 12
      ? `${contractAddress.slice(0, 4)}...${contractAddress.slice(-4)}`
      : contractAddress

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy address:", error)
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4">
        <div className="flex items-center gap-3">
          <Link href="#overview" className="flex items-center gap-2">
            <Image src="/logo.jpg" alt="Lumora" width={28} height={28} className="rounded-md" />
            <span className="text-base font-semibold tracking-tight">Lumora</span>
          </Link>
          <Badge variant="outline" className="hidden border-primary/40 text-primary md:inline-flex">
            SOL-Native
          </Badge>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={copyAddress}
            className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-secondary"
          >
            <span className="font-mono text-foreground">{shortAddress}</span>
            {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
          <ThemeToggle />
          <WalletButton />
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-border md:hidden"
        >
          {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={copyAddress}
              className="mt-2 flex items-center justify-between rounded-md border border-border bg-card px-3 py-2 text-sm"
            >
              <span className="font-mono">{shortAddress}</span>
              {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
            </button>
            <div className="mt-2 flex items-center gap-2">
              <ThemeToggle />
              <WalletButton />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
