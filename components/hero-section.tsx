"use client"

import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/components/language-toggle"

export function HeroSection() {
  const { t } = useLanguage()

  const stats = [
    { label: t("activeMarkets"), value: "1,247", delta: "+12", positive: true },
    { label: t("volume24h"), value: "$2.4M", delta: "+8.3%", positive: true },
    { label: t("avgSettlement"), value: "340ms", delta: "p99" },
    { label: t("successRate"), value: "99.98%", delta: "30d" },
  ]

  const featured = {
    ticker: "SOL-200-0525",
    title: "SOL > $200 by May 25",
    yesPrice: 67,
    yesDelta: 2.4,
    noPrice: 33,
    volume: "$184.2K",
    liquidity: "$42.1K",
    traders: 1284,
  }

  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="bg-grid absolute inset-0 opacity-60 dark:opacity-40" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 md:py-14 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div className="flex flex-col items-start gap-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-live" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <span className="text-caption text-muted-foreground">{t("aiPowered")}</span>
            </div>

            <h1 className="max-w-2xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              {t("heroTitlePrefix")} <span className="text-primary">{t("heroTitleHighlight")}</span>
            </h1>

            <p className="max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
              {t("heroSubtitle")}
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              <a
                href="#markets"
                className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {t("exploreMarkets")}
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#create"
                className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-card px-5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                {t("createMarket")}
              </a>
            </div>

            <div className="mt-4 grid w-full grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-card p-3 md:p-4">
                  <div className="text-caption text-muted-foreground">{stat.label}</div>
                  <div className="mt-1.5 flex items-baseline gap-1.5">
                    <span className="tabular-nums text-lg font-semibold text-foreground md:text-xl">
                      {stat.value}
                    </span>
                    <span className={`tabular-nums text-xs ${stat.positive ? "text-primary" : "text-muted-foreground"}`}>
                      {stat.delta}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-px rounded-xl border border-primary/20" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-caption text-muted-foreground">Featured</span>
                    <span className="font-mono text-xs text-muted-foreground">{featured.ticker}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-live" />
                    <span className="text-caption text-primary">Live</span>
                  </div>
                </div>

                <div className="px-4 pt-4">
                  <div className="text-sm font-medium text-foreground">{featured.title}</div>
                  <div className="mt-3 flex items-end justify-between gap-2">
                    <div>
                      <div className="text-caption text-muted-foreground">YES</div>
                      <div className="flex items-baseline gap-2">
                        <span className="tabular-nums text-3xl font-semibold text-primary">
                          {(featured.yesPrice / 100).toFixed(2)}
                        </span>
                        <span className="text-caption text-primary/80">SOL</span>
                        <span className="inline-flex items-center gap-0.5 tabular-nums text-xs text-primary">
                          <ArrowUpRight className="h-3 w-3" />
                          {featured.yesDelta}%
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-caption text-muted-foreground">NO</div>
                      <div className="flex items-baseline justify-end gap-2">
                        <span className="tabular-nums text-3xl font-semibold text-muted-foreground">
                          {(featured.noPrice / 100).toFixed(2)}
                        </span>
                        <span className="text-caption text-muted-foreground">SOL</span>
                        <span className="inline-flex items-center gap-0.5 tabular-nums text-xs text-danger">
                          <ArrowDownRight className="h-3 w-3" />
                          {featured.yesDelta}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 pt-4">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                    <div className="h-full bg-primary" style={{ width: `${featured.yesPrice}%` }} />
                  </div>
                </div>

                <div className="px-4 pt-4">
                  <svg viewBox="0 0 240 60" className="h-14 w-full" preserveAspectRatio="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="hero-spark" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" className="text-primary" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0" className="text-primary" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,42 L20,38 L40,40 L60,32 L80,36 L100,28 L120,30 L140,22 L160,26 L180,18 L200,22 L220,14 L240,18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-primary"
                    />
                    <path
                      d="M0,42 L20,38 L40,40 L60,32 L80,36 L100,28 L120,30 L140,22 L160,26 L180,18 L200,22 L220,14 L240,18 L240,60 L0,60 Z"
                      fill="url(#hero-spark)"
                    />
                  </svg>
                </div>

                <div className="grid grid-cols-3 divide-x divide-border border-t border-border">
                  <div className="px-4 py-3">
                    <div className="text-caption text-muted-foreground">Volume</div>
                    <div className="mt-0.5 tabular-nums text-sm font-medium text-foreground">{featured.volume}</div>
                  </div>
                  <div className="px-4 py-3">
                    <div className="text-caption text-muted-foreground">Liquidity</div>
                    <div className="mt-0.5 tabular-nums text-sm font-medium text-foreground">{featured.liquidity}</div>
                  </div>
                  <div className="px-4 py-3">
                    <div className="text-caption text-muted-foreground">Traders</div>
                    <div className="mt-0.5 tabular-nums text-sm font-medium text-foreground">
                      {featured.traders.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
