"use client"

import { Wallet, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/components/wallet-provider"
import { useLanguage } from "@/components/language-toggle"

export function PortfolioSection() {
  const { connected, openModal } = useWallet()
  const { t } = useLanguage()

  if (!connected) {
    return (
      <section className="border-t border-border bg-background py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-6 md:mb-8">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1">
              <Wallet className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-caption text-muted-foreground">{t("myPortfolio")}</span>
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {t("myPortfolio")}
            </h2>
          </div>

          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/60 px-4 py-16">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md border border-border bg-secondary/40">
              <Wallet className="h-5 w-5 text-muted-foreground" />
            </div>
            <h3 className="mb-1 text-base font-semibold text-foreground">{t("connectYourWallet")}</h3>
            <p className="mb-5 max-w-sm text-center text-sm text-muted-foreground">
              {t("connectWalletDesc")}
            </p>
            <Button onClick={openModal} className="h-10 bg-primary px-5 text-primary-foreground hover:bg-primary/90">
              {t("connectWallet")}
            </Button>
          </div>
        </div>
      </section>
    )
  }

  const stats = {
    totalValue: 1250.0,
    todayPnL: 82.5,
    todayPnLPercent: 7.1,
    activeBets: 2,
    winRate: 68,
    totalBets: 25,
  }

  const activeBets = [
    { market: "BTC breaks $95,000 in 1h?", position: "YES", amount: 50, currentOdds: 62, potentialWin: 80.65, timeLeft: "32m" },
    { market: "BONK pumps 20% in 24h?", position: "NO", amount: 25, currentOdds: 38, potentialWin: 65.79, timeLeft: "18h" },
  ]

  const recentHistory = [
    { market: "ETH Gas <12 gwei?", position: "YES", amount: 100, result: "won", profit: 82 },
    { market: "SOL breaks $200?", position: "YES", amount: 75, result: "lost", profit: -75 },
    { market: "JUP token launch pump?", position: "YES", amount: 50, result: "won", profit: 45 },
  ]

  const pnlUp = stats.todayPnL >= 0

  return (
    <section className="border-t border-border bg-background py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1">
            <Wallet className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-caption text-muted-foreground">{t("myPortfolio")}</span>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Account Overview
          </h2>
        </div>

        {/* Summary: big hero number + mini stats */}
        <div className="mb-3 grid gap-3 md:grid-cols-[1.3fr_1fr]">
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-caption text-muted-foreground">{t("totalValue")}</span>
              <span className="font-mono text-[11px] text-muted-foreground">USD</span>
            </div>
            <div className="mt-2 flex items-end gap-3">
              <span className="tabular-nums text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                ${stats.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span
                className={`mb-1 inline-flex items-center gap-1 tabular-nums text-sm ${
                  pnlUp ? "text-primary" : "text-danger"
                }`}
              >
                {pnlUp ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                {pnlUp ? "+" : ""}${stats.todayPnL.toFixed(2)}
                <span className="text-muted-foreground">({pnlUp ? "+" : ""}{stats.todayPnLPercent}%)</span>
              </span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-md border border-border bg-border">
              <div className="bg-card px-3 py-2">
                <div className="text-caption text-muted-foreground">{t("activeBets")}</div>
                <div className="mt-0.5 tabular-nums text-sm font-semibold text-foreground">
                  {stats.activeBets}
                </div>
              </div>
              <div className="bg-card px-3 py-2">
                <div className="text-caption text-muted-foreground">{t("winRate")}</div>
                <div className="mt-0.5 tabular-nums text-sm font-semibold text-primary">
                  {stats.winRate}%
                </div>
              </div>
              <div className="bg-card px-3 py-2">
                <div className="text-caption text-muted-foreground">{t("totalBets")}</div>
                <div className="mt-0.5 tabular-nums text-sm font-semibold text-foreground">
                  {stats.totalBets}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-5">
            <span className="text-caption text-muted-foreground">24h Performance</span>
            <svg
              viewBox="0 0 240 80"
              className="mt-3 h-20 w-full"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="portfolio-spark" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" className="text-primary" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" className="text-primary" />
                </linearGradient>
              </defs>
              <path
                d="M0,58 L20,54 L40,56 L60,48 L80,52 L100,44 L120,46 L140,38 L160,42 L180,30 L200,34 L220,22 L240,18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-primary"
              />
              <path
                d="M0,58 L20,54 L40,56 L60,48 L80,52 L100,44 L120,46 L140,38 L160,42 L180,30 L200,34 L220,22 L240,18 L240,80 L0,80 Z"
                fill="url(#portfolio-spark)"
              />
            </svg>
            <div className="mt-2 flex items-center justify-between font-mono text-[11px] tabular-nums text-muted-foreground">
              <span>24h ago</span>
              <span>now</span>
            </div>
          </div>
        </div>

        {/* Positions + History */}
        <div className="grid gap-3 lg:grid-cols-2">
          {/* Active Positions */}
          <div className="overflow-hidden rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
              <span className="text-caption text-foreground">{t("activePositions")}</span>
              <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                {activeBets.length}
              </span>
            </div>
            <ul className="divide-y divide-border">
              {activeBets.map((bet, i) => (
                <li key={i} className="p-4">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <p className="min-w-0 text-sm font-medium text-foreground">{bet.market}</p>
                    <span className="flex shrink-0 items-center gap-1 font-mono text-[11px] tabular-nums text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {bet.timeLeft}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                          bet.position === "YES"
                            ? "bg-primary/15 text-primary"
                            : "bg-danger/15 text-danger"
                        }`}
                      >
                        {bet.position}
                      </span>
                      <span className="font-mono text-xs tabular-nums text-muted-foreground">
                        @ {(bet.currentOdds / 100).toFixed(2)} SOL
                      </span>
                      <span className="tabular-nums text-xs text-foreground">${bet.amount}</span>
                    </div>
                    <span className="tabular-nums text-xs text-primary">
                      → ${bet.potentialWin.toFixed(2)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent History */}
          <div className="overflow-hidden rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
              <span className="text-caption text-foreground">{t("recentHistory")}</span>
              <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                {recentHistory.length}
              </span>
            </div>
            <ul className="divide-y divide-border">
              {recentHistory.map((bet, i) => (
                <li key={i} className="flex items-center justify-between gap-3 p-4">
                  <div className="min-w-0 flex-1">
                    <p className="mb-1 truncate text-sm font-medium text-foreground">{bet.market}</p>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                          bet.position === "YES"
                            ? "bg-primary/15 text-primary"
                            : "bg-danger/15 text-danger"
                        }`}
                      >
                        {bet.position}
                      </span>
                      <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                        ${bet.amount}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p
                      className={`tabular-nums text-sm font-semibold ${
                        bet.result === "won" ? "text-primary" : "text-danger"
                      }`}
                    >
                      {bet.profit >= 0 ? "+" : ""}${bet.profit}
                    </p>
                    <p className="text-caption text-muted-foreground">
                      {bet.result === "won" ? t("won") : t("lost")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
