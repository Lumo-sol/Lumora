"use client"

import { useEffect, useState } from "react"
import { Bot, Sparkles, Database, Zap } from "lucide-react"
import { useLanguage } from "@/components/language-toggle"

export function AgentHub() {
  const { t } = useLanguage()
  const [pulseIndex, setPulseIndex] = useState(0)

  const agents = [
    {
      id: "creator",
      code: "AGT-01",
      name: t("marketCreator"),
      icon: Sparkles,
      description: t("marketCreatorDesc"),
      stats: [
        { label: t("statCreated"), value: "3,847" },
        { label: t("statToday"), value: "142" },
        { label: t("statNlpAccuracy"), value: "94.7%" },
        { label: t("statLatency"), value: "120ms" },
      ],
      lastAction: "CREATED · SOL>$200 in 24h",
    },
    {
      id: "oracle",
      code: "AGT-02",
      name: t("dataOracle"),
      icon: Database,
      description: t("dataOracleDesc"),
      stats: [
        { label: t("statDataSources"), value: "Pyth+Grass" },
        { label: t("statQueriesPerHour"), value: "48.2K" },
        { label: t("statRlVersion"), value: "v847" },
        { label: t("statLatency"), value: "85ms" },
      ],
      lastAction: "UPDATED · BTC/USD feed",
    },
    {
      id: "settler",
      code: "AGT-03",
      name: t("settlementEngine"),
      icon: Zap,
      description: t("settlementEngineDesc"),
      stats: [
        { label: t("statSettled"), value: "28,401" },
        { label: t("statToday"), value: "1,203" },
        { label: t("statAccuracy"), value: "99.98%" },
        { label: t("statSpeed"), value: "340ms" },
      ],
      lastAction: "SETTLED · ETH Gas <10 gwei",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % 3)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="border-t border-border bg-background py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-8 flex flex-col items-start gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1">
              <Bot className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-caption text-muted-foreground">
                {t("aiAgentInfra")}
              </span>
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {t("agentHub")}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
              {t("agentHubDesc")}
            </p>
          </div>

          {/* Live status chip */}
          <div className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-live" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            <span className="text-caption text-foreground">3 Agents · Online</span>
          </div>
        </div>

        {/* Agent Cards */}
        <div className="grid gap-3 md:grid-cols-3">
          {agents.map((agent, index) => {
            const isActive = pulseIndex === index
            return (
              <article
                key={agent.id}
                className={`group relative overflow-hidden rounded-lg border bg-card transition-colors ${
                  isActive ? "border-primary/50" : "border-border"
                }`}
              >
                {/* Top bar */}
                <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-muted-foreground">{agent.code}</span>
                    <span className="h-3 w-px bg-border" />
                    <span className="text-caption text-primary">Live</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`h-1.5 w-1.5 rounded-full bg-primary ${
                        isActive ? "animate-live" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-secondary/50">
                      <agent.icon className="h-4 w-4 text-foreground" />
                    </div>
                    <div>
                      <div className="text-base font-semibold text-foreground">{agent.name}</div>
                      <div className="text-xs text-muted-foreground">{agent.description.split(".")[0]}</div>
                    </div>
                  </div>

                  {/* Stats in a clean 2x2 */}
                  <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border">
                    {agent.stats.map((stat) => (
                      <div key={stat.label} className="bg-card p-2.5">
                        <dt className="text-caption text-muted-foreground">{stat.label}</dt>
                        <dd className="mt-0.5 tabular-nums text-sm font-semibold text-foreground">
                          {stat.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {/* Last action strip */}
                  <div className="mt-4 flex items-center gap-2 rounded-md border border-border bg-secondary/40 px-3 py-2">
                    <span className="text-caption text-muted-foreground">{t("lastAction")}</span>
                    <span className="h-3 w-px bg-border" />
                    <span className="truncate font-mono text-[11px] text-foreground">
                      {agent.lastAction}
                    </span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Bottom aggregate stats */}
        <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">
          {[
            { label: t("totalMarkets"), value: "1,247" },
            { label: t("totalSettled"), value: "28,401" },
            { label: t("avgSettlement"), value: "340ms" },
            { label: t("successRate"), value: "99.98%" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card p-4">
              <div className="text-caption text-muted-foreground">{stat.label}</div>
              <div className="mt-1 tabular-nums text-xl font-semibold text-foreground">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
