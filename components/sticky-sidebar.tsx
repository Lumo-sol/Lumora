"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, ChevronUp, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { useWallet } from "@/components/wallet-provider"
import { useLanguage } from "@/components/language-toggle"

const trendingItems = [
  { user: "LumoraBot_7", action: "NO", market: "JUP DAO #47", amount: "0.8", won: false, timeAgo: "2m" },
  { user: "NightTrader", action: "YES", market: "SOL >$200", amount: "8.0", won: false, timeAgo: "5m" },
  { user: "AlphaSeeker", action: "WON", market: "SOL >$175", amount: "+3.2", won: true, timeAgo: "8m" },
  { user: "DeFiOracle", action: "YES", market: "UNI TVL >$50B", amount: "3.0", won: false, timeAgo: "12m" },
  { user: "QuantBot", action: "NO", market: "ETH Gas <10", amount: "1.5", won: false, timeAgo: "18m" },
]

interface BetSlipItem {
  id: string
  question: string
  type: "yes" | "no"
  amount: number
  odds: number
}

export function StickySidebar() {
  const { connected, openModal } = useWallet()
  const { t } = useLanguage()
  const [betSlip, setBetSlip] = useState<BetSlipItem[]>([
    { id: "1", question: "BTC breaks $95K in 1h?", type: "yes", amount: 0.5, odds: 62 },
  ])
  const [isMinimized, setIsMinimized] = useState(false)

  const totalStake = betSlip.reduce((acc, bet) => acc + bet.amount, 0)
  const potentialReturn = betSlip.reduce((acc, bet) => acc + (bet.amount * (100 / bet.odds)), 0)

  const removeBet = (id: string) => {
    setBetSlip(betSlip.filter(b => b.id !== id))
  }

  return (
    <aside className="sticky top-20 space-y-3">
      {/* Live Activity */}
      <section className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <span className="text-caption text-foreground">{t("liveActivity")}</span>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-live" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            <span className="text-caption text-primary">{t("live")}</span>
          </div>
        </div>
        <ul className="divide-y divide-border">
          {trendingItems.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-secondary/40"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-xs font-medium text-foreground">{item.user}</span>
                  <span
                    className={`text-caption shrink-0 ${
                      item.action === "WON"
                        ? "text-primary"
                        : item.action === "YES"
                          ? "text-primary"
                          : "text-danger"
                    }`}
                  >
                    {item.action}
                  </span>
                </div>
                <div className="mt-0.5 truncate font-mono text-[11px] text-muted-foreground">
                  {item.market}
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`tabular-nums text-xs font-medium ${
                    item.won ? "text-primary" : "text-foreground"
                  }`}
                >
                  {item.won ? (
                    <ArrowUpRight className="mr-0.5 inline h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="mr-0.5 inline h-3 w-3 text-muted-foreground" />
                  )}
                  {item.amount} SOL
                </div>
                <div className="font-mono text-[10px] text-muted-foreground">{item.timeAgo}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Bet Slip */}
      <section className="overflow-hidden rounded-lg border border-border bg-card">
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="flex w-full items-center justify-between border-b border-border px-4 py-2.5 transition-colors hover:bg-secondary/30"
        >
          <div className="flex items-center gap-2">
            <span className="text-caption text-foreground">{t("betSlip")}</span>
            {betSlip.length > 0 && (
              <span className="rounded bg-primary px-1.5 py-px text-[10px] font-semibold tabular-nums text-primary-foreground">
                {betSlip.length}
              </span>
            )}
          </div>
          <ChevronUp
            className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${
              isMinimized ? "rotate-180" : ""
            }`}
          />
        </button>

        {!isMinimized && (
          <div className="p-3">
            {betSlip.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-sm text-foreground">{t("noBetsSelected")}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t("clickYesOrNo")}</p>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  {betSlip.map((bet) => (
                    <div
                      key={bet.id}
                      className="rounded-md border border-border bg-secondary/30 p-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="line-clamp-2 text-sm text-foreground">{bet.question}</p>
                        <button
                          onClick={() => removeBet(bet.id)}
                          className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                          aria-label="Remove"
                        >
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
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">{t("platformFee")}</dt>
                    <dd className="tabular-nums text-muted-foreground">1.00%</dd>
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
              </>
            )}
          </div>
        )}
      </section>
    </aside>
  )
}
