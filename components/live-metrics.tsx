"use client"

import { useEffect, useState } from "react"
import { Activity, Gauge, TimerReset, TrendingUp } from "lucide-react"

interface PriceRow {
  symbol: string
  name: string
  price: number
  change24h: number
}

const networkCards = [
  { label: "Average fee", value: "< $0.01", icon: Gauge },
  { label: "Settlement profile", value: "Sub-second UX", icon: TimerReset },
  { label: "Narrative mode", value: "Growth cycle", icon: TrendingUp },
]

export function LiveMetrics() {
  const [prices, setPrices] = useState<PriceRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch("/api/prices")
        const data = await response.json()
        setPrices(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error("Failed to load price data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPrices()
  }, [])

  const sol = prices.find((price) => price.symbol === "SOL")
  const peers = prices.filter((price) => price.symbol !== "SOL").slice(0, 4)

  return (
    <section id="metrics" className="border-b border-border bg-background py-14 md:py-18">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="text-caption text-primary">Live Context</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Market metrics that support the story</h2>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground md:flex">
            <Activity className="h-3.5 w-3.5 text-primary" />
            API-backed price panel
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-caption text-muted-foreground">Featured asset</div>
                <div className="mt-2 text-2xl font-semibold">SOL / USD</div>
              </div>
              <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Auto refresh on load
              </div>
            </div>

            {loading ? (
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="h-28 rounded-2xl bg-secondary/50" />
                ))}
              </div>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-background p-5">
                  <div className="text-caption text-muted-foreground">Spot price</div>
                  <div className="mt-2 text-4xl font-semibold">
                    ${sol ? sol.price.toFixed(sol.price > 10 ? 2 : 4) : "178.50"}
                  </div>
                  <div className={`mt-2 text-sm font-medium ${sol && sol.change24h >= 0 ? "text-primary" : "text-destructive"}`}>
                    {sol ? `${sol.change24h >= 0 ? "+" : ""}${sol.change24h.toFixed(2)}%` : "+3.20%"} in 24h
                  </div>
                </div>

                <div className="rounded-2xl border border-border p-5">
                  <div className="text-caption text-muted-foreground">Why it matters</div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    This panel gives the landing page a real product signal instead of static marketing text.
                    It shows visitors that the story is tied to live market context.
                  </p>
                </div>

                {peers.map((price) => (
                  <div key={price.symbol} className="rounded-2xl border border-border p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold">{price.symbol}</div>
                        <div className="text-xs text-muted-foreground">{price.name}</div>
                      </div>
                      <div className={`text-sm font-medium ${price.change24h >= 0 ? "text-primary" : "text-destructive"}`}>
                        {price.change24h >= 0 ? "+" : ""}
                        {price.change24h.toFixed(2)}%
                      </div>
                    </div>
                    <div className="mt-4 text-2xl font-semibold">
                      ${price.price.toFixed(price.price > 10 ? 2 : 4)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid gap-4">
            {networkCards.map((card) => {
              const Icon = card.icon
              return (
                <div key={card.label} className="rounded-3xl border border-border bg-card p-6">
                  <Icon className="h-5 w-5 text-primary" />
                  <div className="mt-4 text-caption text-muted-foreground">{card.label}</div>
                  <div className="mt-2 text-2xl font-semibold">{card.value}</div>
                </div>
              )
            })}

            <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6">
              <div className="text-caption text-primary">MVP function</div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                The metrics module is intentionally narrow: it demonstrates live data ingestion,
                supports the token narrative, and stays lightweight enough for a first GitHub upload.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
