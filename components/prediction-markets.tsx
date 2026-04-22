"use client"

import { useState } from "react"
import { MarketCard } from "./market-card"
import { ChevronDown, Grid3X3, List } from "lucide-react"
import { useLanguage } from "@/components/language-toggle"

const markets = [
  {
    category: "price",
    isHot: true,
    isAiGenerated: true,
    time: "47m",
    question: "BTC breaks $95,000 in 1h?",
    yesPercent: 62,
    noPercent: 38,
    participants: 847,
    volume: "$12.4K",
    context: "BTC currently at $94,200, up 2.3% in the last hour",
  },
  {
    category: "meme",
    isHot: true,
    isAiGenerated: false,
    time: "18h",
    question: "BONK pumps 20% in 24h?",
    yesPercent: 38,
    noPercent: 62,
    participants: 523,
    volume: "$8.7K",
    context: "High trading volume on Raydium detected",
  },
  {
    category: "defi",
    isHot: false,
    isAiGenerated: true,
    time: "3d",
    question: "Uniswap v4 TVL >$50B this week?",
    yesPercent: 71,
    noPercent: 29,
    participants: 312,
    volume: "$5.2K",
    context: "Current TVL: $48.2B, growing 1.2% daily",
  },
  {
    category: "gas",
    isHot: false,
    isAiGenerated: false,
    time: "52m",
    question: "ETH Gas avg <12 gwei next hour?",
    yesPercent: 55,
    noPercent: 45,
    participants: 198,
    volume: "$3.1K",
    context: "Current gas: 14 gwei, trending down",
  },
  {
    category: "synth",
    isHot: false,
    isAiGenerated: true,
    time: "20h",
    question: "Solana DeFi Index >3% in 24h?",
    yesPercent: 44,
    noPercent: 56,
    participants: 411,
    volume: "$6.8K",
  },
  {
    category: "gov",
    isHot: false,
    isAiGenerated: false,
    time: "2d",
    question: "JUP DAO Proposal #47 passes?",
    yesPercent: 83,
    noPercent: 17,
    participants: 156,
    volume: "$2.9K",
    context: "83% approval with 2 days remaining",
  },
  {
    category: "price",
    isHot: true,
    isAiGenerated: true,
    time: "22h",
    question: "SOL breaks $200 in 24h?",
    yesPercent: 29,
    noPercent: 71,
    participants: 932,
    volume: "$15.1K",
    context: "SOL at $187, resistance at $195",
  },
  {
    category: "meme",
    isHot: false,
    isAiGenerated: false,
    time: "55m",
    question: "WIF pumps 30% in 1h?",
    yesPercent: 51,
    noPercent: 49,
    participants: 267,
    volume: "$4.3K",
  },
  {
    category: "defi",
    isHot: false,
    isAiGenerated: true,
    time: "20h",
    question: "Raydium 24h vol > Uniswap?",
    yesPercent: 18,
    noPercent: 82,
    participants: 445,
    volume: "$7.6K",
    context: "Raydium: $1.2B vs Uniswap: $2.8B",
  },
]

type CategoryKey = "all" | "price" | "meme" | "defi" | "gas" | "synth" | "gov"

export function PredictionMarkets() {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [mobileTabOpen, setMobileTabOpen] = useState(false)

  const categories: { id: CategoryKey; label: string; count: number }[] = [
    { id: "all", label: t("allMarkets"), count: 127 },
    { id: "price", label: t("catPrice"), count: 45 },
    { id: "meme", label: t("catMeme"), count: 32 },
    { id: "defi", label: t("catDeFi"), count: 28 },
    { id: "gas", label: t("catGas"), count: 12 },
    { id: "synth", label: t("catSynth"), count: 6 },
    { id: "gov", label: t("catGov"), count: 4 },
  ]

  const filteredMarkets =
    activeCategory === "all"
      ? markets
      : markets.filter((m) => m.category === activeCategory)

  const activeLabel = categories.find(c => c.id === activeCategory)?.label || t("allMarkets")

  return (
    <section>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between md:mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground md:text-2xl">{t("predictionMarkets")}</h2>
          <p className="text-xs text-muted-foreground md:text-sm">{t("marketsSubtitle")}</p>
        </div>

        {/* View Mode Toggle - Desktop */}
        <div className="hidden items-center gap-1 rounded-md border border-border bg-card p-0.5 sm:flex">
          <button
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
            className={`rounded-sm p-1.5 transition-colors ${viewMode === "grid" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Grid3X3 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            aria-label="List view"
            className={`rounded-sm p-1.5 transition-colors ${viewMode === "list" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            <List className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div className="relative mb-4 sm:hidden">
        <button
          onClick={() => setMobileTabOpen(!mobileTabOpen)}
          className="flex w-full items-center justify-between rounded-md border border-border bg-card px-3 py-2.5"
        >
          <span className="text-sm font-medium text-foreground">{activeLabel}</span>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${mobileTabOpen ? "rotate-180" : ""}`} />
        </button>

        {mobileTabOpen && (
          <div className="absolute left-0 right-0 top-full z-10 mt-1 overflow-hidden rounded-md border border-border bg-card shadow-lg">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id)
                  setMobileTabOpen(false)
                }}
                className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-sm transition-colors hover:bg-secondary ${
                  activeCategory === cat.id ? "bg-secondary/60 text-primary" : "text-foreground"
                }`}
              >
                <span>{cat.label}</span>
                <span className="text-xs tabular-nums text-muted-foreground">{cat.count}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Tabs */}
      <div className="mb-5 hidden flex-wrap gap-1.5 sm:flex">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors ${
              activeCategory === cat.id
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
            }`}
          >
            {cat.label}
            <span
              className={`rounded px-1 py-px text-[10px] tabular-nums ${
                activeCategory === cat.id ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
              }`}
            >
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Markets Grid */}
      <div
        className={`grid gap-3 md:gap-4 ${
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
            : "grid-cols-1"
        }`}
      >
        {filteredMarkets.map((market, index) => (
          <MarketCard key={index} {...market} />
        ))}
      </div>

      {/* Load More */}
      <div className="mt-6 text-center">
        <button className="rounded-md border border-border bg-card px-5 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground">
          {t("loadMore")}
        </button>
      </div>
    </section>
  )
}
