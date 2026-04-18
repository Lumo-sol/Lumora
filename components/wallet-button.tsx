"use client"

import { useWallet } from "@/components/wallet-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Wallet, LogOut, Copy, Check } from "lucide-react"
import { useState } from "react"

export function WalletButton() {
  const { publicKey, disconnect, connected, openModal } = useWallet()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  if (!connected || !publicKey) {
    return (
      <Button
        onClick={openModal}
        className="h-9 gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary/90 md:text-sm"
      >
        <Wallet className="h-3.5 w-3.5 md:h-4 md:w-4" />
        <span className="hidden sm:inline">Connect</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-9 gap-1.5 rounded-md border-border bg-card px-3 text-xs font-medium text-foreground hover:bg-secondary md:text-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="font-mono tabular-nums">{shortenAddress(publicKey)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleCopy} className="gap-2 cursor-pointer">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy Address"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={disconnect} className="gap-2 cursor-pointer text-destructive">
          <LogOut className="h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
