"use client"

import { useState } from "react"
import { Users, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { BetModal } from "@/components/bet-modal"
import { useLanguage } from "@/components/language-toggle"
import Link from "next/link"

interface MarketCardProps {
  id?: string
  category: string
  isHot?: boolean
  isAiGenerated?: boolean
  time: string
  question: string
  yesPercent: number
  noPercent: number
  participants: number
  volume: string
  context?: string
}

// Deterministic small change based on percent for visual variety
function getDelta(percent: number): number {
  const base = ((percent * 31) % 47) / 10
  return Math.round((base - 2.3) * 10) / 10
}

export function MarketCard({
  id = "1",
  category,
  isHot,
  isAiGenerated,
  time,
  question,
  yesPercent,
  noPercent,
  participants,
  volume,
  context,
}: MarketCardProps) {
  const { t } = useLanguage()
  const [betModal, setBetModal] = useState<{ open: boolean; type: "yes" | "no" }>({
    open: false,
    type: "yes",
  })

  const yesDelta = getDelta(yesPercent)
  const yesUp = yesDelta >= 0
  const ticker = `M-${id.toString().padStart(4, "0")}`

  const openBetModal = (type: "yes" | "no") => {
    setBetModal({ open: true, type })
  }

  return (
    <>
      <div className="group flex flex-col rounded-lg border border-border bg-card transition-colors hover:border-foreground/20">
        {/* Header meta row */}
        <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-2.5">
          <div className="flex min-w-0 items-center gap-2 overflow-hidden">
            <span className="text-caption shrink-0 text-muted-foreground">{category}</span>
            <span className="h-3 w-px shrink-0 bg-border" />
            <span className="font-mono text-[11px] text-muted-foreground">{ticker}</span>
            {isHot && (
              <>
                <span className="h-3 w-px shrink-0 bg-border" />
                <span className="text-caption shrink-0 text-orange-500">Hot</span>
              </>
            )}
            {isAiGenerated && (
              <>
                <span className="h-3 w-px shrink-0 bg-border" />
                <span className="text-caption shrink-0 text-muted-foreground">AI</span>
              </>
            )}
          </div>
          <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
            {time}
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-4">
          <Link href={`/market/${id}`}>
            <h3 className="line-clamp-2 text-[15px] font-medium leading-snug text-foreground transition-colors hover:text-primary">
              {question}
            </h3>
          </Link>

          {context && (
            <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{context}</p>
          )}

          {/* Price row */}
          <div className="mt-4 flex items-end justify-between">
            <div>
              <div className="text-caption text-muted-foreground">YES</div>
              <div className="flex items-baseline gap-1.5">
                <span className="tabular-nums text-2xl font-semibold text-primary">
                  {(yesPercent / 100).toFixed(2)}
                </span>
                <span className="text-caption text-primary/80">SOL</span>
                <span
                  className={`inline-flex items-center tabular-nums text-[11px] ${
                    yesUp ? "text-primary" : "text-danger"
                  }`}
                >
                  {yesUp ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {Math.abs(yesDelta)}%
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-caption text-muted-foreground">NO</div>
              <div className="flex items-baseline justify-end gap-1.5">
                <span className="tabular-nums text-2xl font-semibold text-muted-foreground">
                  {(noPercent / 100).toFixed(2)}
                </span>
                <span className="text-caption text-muted-foreground">SOL</span>
              </div>
            </div>
          </div>

          {/* Probability bar */}
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full bg-primary transition-[width] duration-500"
              style={{ width: `${yesPercent}%` }}
            />
          </div>

          {/* Action buttons */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              onClick={() => openBetModal("yes")}
              className="group/btn flex items-center justify-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/60 hover:bg-primary hover:text-primary-foreground"
            >
              <span>{t("yes")}</span>
              <span className="font-mono tabular-nums opacity-70 group-hover/btn:opacity-100">
                {(yesPercent / 100).toFixed(2)} SOL
              </span>
            </button>
            <button
              onClick={() => openBetModal("no")}
              className="group/btn flex items-center justify-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-danger/60 hover:bg-danger hover:text-destructive-foreground"
            >
              <span>{t("no")}</span>
              <span className="font-mono tabular-nums opacity-70 group-hover/btn:opacity-100">
                {(noPercent / 100).toFixed(2)} SOL
              </span>
            </button>
          </div>
        </div>

        {/* Footer data row */}
        <div className="grid grid-cols-2 divide-x divide-border border-t border-border text-xs">
          <div className="flex items-center gap-1.5 px-4 py-2.5 text-muted-foreground">
            <Users className="h-3 w-3" />
            <span className="tabular-nums">{participants.toLocaleString()}</span>
            <span className="text-caption ml-0.5 hidden sm:inline">traders</span>
          </div>
          <div className="flex items-center gap-1.5 px-4 py-2.5 text-muted-foreground">
            <TrendingUp className="h-3 w-3" />
            <span className="tabular-nums text-foreground">{volume}</span>
            <span className="text-caption ml-0.5 hidden sm:inline">vol</span>
          </div>
        </div>
      </div>

      <BetModal
        isOpen={betModal.open}
        onClose={() => setBetModal({ ...betModal, open: false })}
        question={question}
        betType={betModal.type}
        currentPercent={betModal.type === "yes" ? yesPercent : noPercent}
      />
    </>
  )
}

