"use client"

import { useState, useEffect } from "react"
import { X, Minus, Plus, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/components/wallet-provider"
import { useLanguage } from "@/components/language-toggle"

interface BetModalProps {
  isOpen: boolean
  onClose: () => void
  question: string
  betType: "yes" | "no"
  currentPercent: number
}

export function BetModal({ isOpen, onClose, question, betType, currentPercent }: BetModalProps) {
  const [amount, setAmount] = useState(0.1)
  const { connected, openModal } = useWallet()
  const { t } = useLanguage()

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const price = currentPercent / 100
  const shares = price > 0 ? amount / price : 0
  const potentialWin = shares.toFixed(3)
  const fee = (amount * 0.01).toFixed(4)
  const isYes = betType === "yes"

  const handleBet = () => {
    if (!connected) {
      openModal()
      return
    }
    alert(`Placing ${betType.toUpperCase()} bet of ${amount} SOL on: ${question}`)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full sm:max-w-md">
        <div className="overflow-hidden rounded-t-lg border-t border-x border-border bg-card shadow-2xl sm:rounded-lg sm:border">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-caption text-foreground">Place Order</span>
              <span className="h-3 w-px bg-border" />
              <span
                className={`text-caption ${
                  isYes ? "text-primary" : "text-danger"
                }`}
              >
                {betType.toUpperCase()} · {(currentPercent / 100).toFixed(2)} SOL
              </span>
            </div>
            <button
              onClick={onClose}
              className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-4">
            <p className="mb-4 text-sm text-foreground">{question}</p>

            {/* Side selector (visual only, preselected) */}
            <div className="mb-4 grid grid-cols-2 gap-2">
              <div
                className={`rounded-md border px-3 py-2.5 text-center ${
                  isYes
                    ? "border-primary bg-primary/10"
                    : "border-border bg-secondary/30"
                }`}
              >
                <div className="text-caption text-muted-foreground">YES</div>
                <div
                  className={`tabular-nums text-lg font-semibold ${
                    isYes ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {((isYes ? currentPercent : 100 - currentPercent) / 100).toFixed(2)}
                  <span className="ml-1 text-caption opacity-70">SOL</span>
                </div>
              </div>
              <div
                className={`rounded-md border px-3 py-2.5 text-center ${
                  !isYes
                    ? "border-danger bg-danger/10"
                    : "border-border bg-secondary/30"
                }`}
              >
                <div className="text-caption text-muted-foreground">NO</div>
                <div
                  className={`tabular-nums text-lg font-semibold ${
                    !isYes ? "text-danger" : "text-muted-foreground"
                  }`}
                >
                  {((!isYes ? currentPercent : 100 - currentPercent) / 100).toFixed(2)}
                  <span className="ml-1 text-caption opacity-70">SOL</span>
                </div>
              </div>
            </div>

            {/* Amount input */}
            <label className="mb-2 block text-caption text-muted-foreground">
              Amount (SOL)
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAmount(Math.max(0.01, Math.round((amount - 0.1) * 100) / 100))}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:bg-secondary"
                aria-label="Decrease"
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Math.max(0.01, parseFloat(e.target.value) || 0))}
                className="h-10 flex-1 rounded-md border border-border bg-card px-3 text-center text-lg font-semibold tabular-nums text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
                step="0.1"
                min="0.01"
              />
              <button
                onClick={() => setAmount(Math.round((amount + 0.1) * 100) / 100)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:bg-secondary"
                aria-label="Increase"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-2 grid grid-cols-4 gap-1.5">
              {[0.1, 0.5, 1, 5].map((val) => (
                <button
                  key={val}
                  onClick={() => setAmount(val)}
                  className={`h-8 rounded-md border text-xs font-medium tabular-nums transition-colors ${
                    amount === val
                      ? "border-primary/50 bg-primary/10 text-primary"
                      : "border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>

            {/* Summary */}
            <dl className="mt-4 space-y-1.5 rounded-md border border-border bg-secondary/30 p-3 text-xs">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Price</dt>
                <dd className="tabular-nums font-mono text-foreground">
                  {(currentPercent / 100).toFixed(2)} SOL
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Shares</dt>
                <dd className="tabular-nums font-mono text-foreground">
                  {shares.toFixed(3)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Fee (1%)</dt>
                <dd className="tabular-nums font-mono text-muted-foreground">
                  {fee} SOL
                </dd>
              </div>
              <div className="mt-1 flex items-center justify-between border-t border-border pt-1.5">
                <dt className="text-foreground">Potential Win</dt>
                <dd
                  className={`tabular-nums font-mono font-semibold ${
                    isYes ? "text-primary" : "text-danger"
                  }`}
                >
                  {potentialWin} SOL
                </dd>
              </div>
            </dl>

            <Button
              onClick={handleBet}
              className={`mt-4 h-11 w-full text-sm font-medium ${
                isYes
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-danger text-destructive-foreground hover:bg-danger/90"
              }`}
            >
              {connected ? (
                `Place ${betType.toUpperCase()} · ${amount} SOL`
              ) : (
                <>
                  <Wallet className="mr-1.5 h-4 w-4" />
                  {t("connectWallet")}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
