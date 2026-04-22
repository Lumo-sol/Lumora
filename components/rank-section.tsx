"use client"

import { useState } from "react"
import { Trophy, Crown } from "lucide-react"
import { useLanguage } from "@/components/language-toggle"

const topTraders = [
  { rank: 1, name: "whale.sol", avatar: "W", wins: 156, accuracy: 78.5, profit: 45200, streak: 12 },
  { rank: 2, name: "degen_master", avatar: "D", wins: 142, accuracy: 72.3, profit: 38700, streak: 8 },
  { rank: 3, name: "crypto_sage", avatar: "C", wins: 128, accuracy: 69.8, profit: 31400, streak: 5 },
]

const otherTraders = [
  { rank: 4, name: "sol_predictor", wins: 115, accuracy: 67.2, profit: 28100 },
  { rank: 5, name: "memecoin_king", wins: 103, accuracy: 65.9, profit: 24600 },
  { rank: 6, name: "alpha_hunter", wins: 98, accuracy: 64.1, profit: 21300 },
  { rank: 7, name: "based_trader", wins: 89, accuracy: 62.8, profit: 18900 },
  { rank: 8, name: "diamond_hands", wins: 82, accuracy: 61.5, profit: 16200 },
  { rank: 9, name: "smart_money", wins: 76, accuracy: 60.2, profit: 14800 },
  { rank: 10, name: "on_chain_ninja", wins: 71, accuracy: 59.4, profit: 13100 },
]

type Period = "weekly" | "monthly" | "allTime"

export function RankSection() {
  const { t } = useLanguage()
  const [period, setPeriod] = useState<Period>("weekly")

  const periods: { key: Period; label: string }[] = [
    { key: "weekly", label: t("weekly") },
    { key: "monthly", label: t("monthly") },
    { key: "allTime", label: t("allTime") },
  ]

  return (
    <section className="border-t border-border bg-background py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 md:mb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1">
              <Trophy className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-caption text-muted-foreground">{t("leaderboard")}</span>
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Top Traders
            </h2>
          </div>

          {/* Period segmented control */}
          <div className="inline-flex rounded-md border border-border bg-card p-0.5">
            {periods.map((p) => (
              <button
                key={p.key}
                onClick={() => setPeriod(p.key)}
                className={`text-caption rounded-sm px-3 py-1.5 transition-colors ${
                  period === p.key
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 */}
        <div className="mb-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {topTraders.map((trader, index) => {
            const accentText = [
              "text-primary",
              "text-foreground",
              "text-muted-foreground",
            ][index]
            return (
              <article
                key={trader.rank}
                className={`rounded-lg border bg-card p-4 ${
                  index === 0 ? "border-primary/40" : "border-border"
                } ${index === 2 ? "sm:col-span-2 lg:col-span-1" : ""}`}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-secondary/40 text-sm font-semibold text-foreground">
                      {trader.avatar}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate font-medium text-foreground">{trader.name}</div>
                      <div className="font-mono text-[11px] text-muted-foreground">
                        {trader.streak}W streak
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 ${accentText}`}>
                    {trader.rank === 1 && <Crown className="h-4 w-4" />}
                    <span className="tabular-nums text-lg font-semibold">#{trader.rank}</span>
                  </div>
                </div>

                <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-md border border-border bg-border">
                  <div className="bg-card p-2.5">
                    <dt className="text-caption text-muted-foreground">{t("wins")}</dt>
                    <dd className="mt-0.5 tabular-nums text-sm font-semibold text-foreground">
                      {trader.wins}
                    </dd>
                  </div>
                  <div className="bg-card p-2.5">
                    <dt className="text-caption text-muted-foreground">{t("accuracy")}</dt>
                    <dd className="mt-0.5 tabular-nums text-sm font-semibold text-foreground">
                      {trader.accuracy}%
                    </dd>
                  </div>
                  <div className="bg-card p-2.5">
                    <dt className="text-caption text-muted-foreground">P&amp;L</dt>
                    <dd className="mt-0.5 tabular-nums text-sm font-semibold text-primary">
                      +${(trader.profit / 1000).toFixed(1)}K
                    </dd>
                  </div>
                </dl>
              </article>
            )
          })}
        </div>

        {/* Rest table */}
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          {/* Desktop header */}
          <div className="hidden grid-cols-[72px_1fr_100px_100px_120px] items-center gap-4 border-b border-border px-4 py-2.5 md:grid">
            <div className="text-caption text-muted-foreground">Rank</div>
            <div className="text-caption text-muted-foreground">Trader</div>
            <div className="text-caption text-right text-muted-foreground">{t("wins")}</div>
            <div className="text-caption text-right text-muted-foreground">{t("accuracy")}</div>
            <div className="text-caption text-right text-muted-foreground">P&amp;L</div>
          </div>

          <ul className="divide-y divide-border">
            {otherTraders.map((trader) => (
              <li
                key={trader.rank}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-3 py-3 transition-colors hover:bg-secondary/30 md:grid-cols-[72px_1fr_100px_100px_120px] md:gap-4 md:px-4"
              >
                <span className="w-9 font-mono text-xs tabular-nums text-muted-foreground md:text-sm">
                  #{trader.rank}
                </span>
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-border bg-secondary/40 text-xs font-semibold text-foreground">
                    {trader.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="truncate text-sm font-medium text-foreground">
                    {trader.name}
                  </span>
                </div>

                {/* Mobile compact stats */}
                <div className="flex flex-col items-end md:hidden">
                  <span className="tabular-nums text-sm font-medium text-primary">
                    +${(trader.profit / 1000).toFixed(1)}K
                  </span>
                  <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
                    {trader.accuracy}% · {trader.wins}W
                  </span>
                </div>

                {/* Desktop cols */}
                <div className="hidden text-right tabular-nums text-sm text-foreground md:block">
                  {trader.wins}
                </div>
                <div className="hidden text-right tabular-nums text-sm text-foreground md:block">
                  {trader.accuracy}%
                </div>
                <div className="hidden text-right tabular-nums text-sm font-semibold text-primary md:block">
                  +${(trader.profit / 1000).toFixed(1)}K
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
