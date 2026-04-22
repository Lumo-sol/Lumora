"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, ChevronUp, Wallet } from "lucide-react"
import { useWallet } from "@/components/wallet-provider"
import { useLanguage } from "@/components/language-toggle"

interface BetSlipItem {
  id: string
  question: string
  type: "yes" | "no"
  amount: number
  odds: number
}

export function MobileBetSlip() {
  const { connected, openModal } = useWallet()
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [betSlip] = useState<BetSlipItem[]>([
    { id: "1", question: "BTC breaks $95K in 1h?", type: "yes", amount: 0.5, odds: 62 },
  ])

  const totalStake = betSlip.reduce((acc, bet) => acc + bet.amount, 0)
  const potentialReturn = betSlip.reduce((acc, bet) => acc + (bet.amount * (100 / bet.odds)), 0)

  if (betSlip.length === 0) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Collapsed Bar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between border-t border-border bg-card px-4 py-3 shadow-lg"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-caption text-foreground">{t("betSlip")}</span>
          <span className="rounded bg-primary px-1.5 py-px text-[10px] font-semibold tabular-nums text-primary-foreground">
            {betSlip.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs tabular-nums text-muted-foreground">→</span>
          <span className="tabular-nums text-sm font-semibold text-primary">
            {potentialReturn.toFixed(2)} SOL
          </span>
          <ChevronUp
            className={`h-4 w-4 text-muted-foreground transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Expanded Panel */}
      {isOpen && (
        <div className="border-t border-border bg-card p-3 shadow-2xl">
          <div className="space-y-2">
            {betSlip.map((bet) => (
              <div key={bet.id} className="rounded-md border border-border bg-secondary/30 p-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="line-clamp-2 text-sm text-foreground">{bet.question}</p>
                  <button className="shrink-0 text-muted-foreground hover:text-foreground" aria-label="Remove">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                        bet.type === "yes"
                          ? "bg-primary/15 text-primary"
                          : "bg-danger/15 text-danger"
                      }`}
                    >
                      {bet.type}
                    </span>
                    <span className="font-mono text-xs tabular-nums text-muted-foreground">
                      @ {(bet.odds / 100).toFixed(2)} SOL
                    </span>
                  </div>
                  <span className="tabular-nums text-sm font-medium text-foreground">
                    {bet.amount} SOL
                  </span>
                </div>
              </div>
            ))}
          </div>

          <dl className="mt-3 space-y-1 border-t border-border pt-3 text-xs">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">{t("totalStake")}</dt>
              <dd className="tabular-nums font-medium text-foreground">
                {totalStake.toFixed(2)} SOL
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">{t("potentialReturn")}</dt>
              <dd className="tabular-nums font-medium text-primary">
                {potentialReturn.toFixed(2)} SOL
              </dd>
            </div>
          </dl>

          <Button
            onClick={connected ? undefined : openModal}
            className="mt-3 h-10 w-full rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {connected ? (
              t("placeBet")
            ) : (
              <>
                <Wallet className="mr-1.5 h-4 w-4" />
                {t("connectWallet")}
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
