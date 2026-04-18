"use client"

import { useEffect, useState, useCallback, useRef } from "react"

interface CryptoPrice {
  symbol: string
  name: string
  price: number
  change24h: number
}

const fallbackPrices: CryptoPrice[] = [
  { symbol: "BTC", name: "Bitcoin", price: 94250, change24h: 2.1 },
  { symbol: "ETH", name: "Ethereum", price: 1820, change24h: 1.8 },
  { symbol: "SOL", name: "Solana", price: 178.5, change24h: 3.2 },
  { symbol: "DOGE", name: "Dogecoin", price: 0.124, change24h: -1.5 },
  { symbol: "BONK", name: "BONK", price: 0.000028, change24h: 8.5 },
  { symbol: "WIF", name: "dogwifhat", price: 2.85, change24h: -3.2 },
  { symbol: "PEPE", name: "Pepe", price: 0.0000082, change24h: 5.7 },
  { symbol: "SHIB", name: "Shiba Inu", price: 0.0000089, change24h: 4.2 },
]

export function PriceTicker() {
  const [cryptos, setCryptos] = useState<CryptoPrice[]>(fallbackPrices)
  const scrollRef = useRef<HTMLDivElement>(null)

  const fetchPrices = useCallback(async () => {
    try {
      const res = await fetch("/api/prices")
      if (res.ok) {
        const data = await res.json()
        setCryptos(data)
      }
    } catch (error) {
      console.error("Failed to fetch prices:", error)
    }
  }, [])

  useEffect(() => {
    fetchPrices()
    const interval = setInterval(fetchPrices, 30000)
    return () => clearInterval(interval)
  }, [fetchPrices])

  // Reset animation when cryptos change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.style.animation = "none"
      scrollRef.current.offsetHeight // trigger reflow
      scrollRef.current.style.animation = ""
    }
  }, [cryptos])

  const duplicatedCryptos = [...cryptos, ...cryptos]

  const formatPrice = (price: number) => {
    if (price === 0) return "Loading..."
    if (price < 0.0001) return `$${price.toFixed(10)}`
    if (price < 1) return `$${price.toFixed(6)}`
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  return (
    <div className="relative overflow-hidden border-b border-border bg-card/40">
      <div
        ref={scrollRef}
        className="flex whitespace-nowrap animate-ticker"
        style={{ width: "fit-content" }}
      >
        {duplicatedCryptos.map((crypto, index) => {
          const hasChange = crypto.price > 0 && crypto.change24h !== undefined
          const up = crypto.change24h >= 0
          const colorCls = !hasChange
            ? "text-muted-foreground"
            : up
              ? "text-emerald-500"
              : "text-red-500"
          const arrow = up ? "▲" : "▼"
          return (
            <div
              key={`${crypto.symbol}-${index}`}
              className={`group relative flex shrink-0 items-center gap-2 border-r border-border px-4 py-2 transition-colors ${
                hasChange ? (up ? "hover:bg-emerald-500/5" : "hover:bg-red-500/5") : ""
              }`}
            >
              {/* Left accent bar for up/down */}
              {hasChange && (
                <span
                  className={`absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 ${
                    up ? "bg-emerald-500" : "bg-red-500"
                  }`}
                />
              )}
              <span className="text-caption text-muted-foreground">{crypto.symbol}</span>
              <span className={`font-mono text-xs font-medium tabular-nums ${colorCls}`}>
                {formatPrice(crypto.price)}
              </span>
              {hasChange && (
                <span
                  className={`inline-flex items-center gap-0.5 font-mono text-[11px] font-semibold tabular-nums ${colorCls}`}
                >
                  <span className="text-[9px] leading-none">{arrow}</span>
                  {up ? "+" : "-"}
                  {Math.abs(crypto.change24h).toFixed(2)}%
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
