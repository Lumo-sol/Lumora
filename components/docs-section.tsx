"use client"

import { useState } from "react"
import { BookOpen, ChevronRight, HelpCircle, Shield, TrendingUp, Users, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-toggle"

const docData = [
  {
    id: "getting-started",
    titleKey: "docGettingStarted",
    descriptionKey: "docGettingStartedDesc",
    articles: [
      {
        title: "What is Lumora?",
        content:
          "Lumora is an AI-powered prediction market platform built on Solana. Users can trade binary contracts on crypto prices, on-chain metrics, and market events.",
      },
      {
        title: "How to Connect Wallet",
        content:
          "Click the Connect Wallet button in the top right corner. Lumora supports Phantom, Solflare, and other Solana wallets.",
      },
      {
        title: "Making Your First Bet",
        content:
          "Browse the Markets section, pick a prediction, choose YES or NO, enter your amount, and confirm the transaction in your wallet.",
      },
    ],
  },
  {
    id: "markets",
    titleKey: "docUnderstanding",
    descriptionKey: "docUnderstandingDesc",
    articles: [
      {
        title: "Market Categories",
        content:
          "Markets are organized into price, meme, DeFi, gas, synthetic, and governance categories so traders can quickly find relevant opportunities.",
      },
      {
        title: "How Odds Work",
        content:
          "Odds are displayed as percentages. If YES shows 65%, the market is pricing a 65% chance of that outcome.",
      },
      {
        title: "Market Resolution",
        content:
          "AI agents monitor data sources and resolve markets when the outcome is clear. Winning positions can then be settled automatically.",
      },
    ],
  },
  {
    id: "agents",
    titleKey: "docAiAgents",
    descriptionKey: "docAiAgentsDesc",
    articles: [
      {
        title: "What are AI Agents?",
        content:
          "AI agents are autonomous systems that help create markets, monitor data, update odds, and settle outcomes.",
      },
      {
        title: "Agent Accuracy",
        content:
          "Each agent reports operational metrics such as latency, data source coverage, and settlement accuracy.",
      },
      {
        title: "Following Agents",
        content:
          "Traders can use agent activity as context when reviewing markets and making their own decisions.",
      },
    ],
  },
  {
    id: "security",
    titleKey: "docSecurity",
    descriptionKey: "docSecurityDesc",
    articles: [
      {
        title: "Smart Contract Security",
        content:
          "All on-chain actions should be verified before signing. Lumora never asks for your seed phrase.",
      },
      {
        title: "Wallet Safety",
        content:
          "Always verify the connected website, wallet prompt, transaction details, and network before confirming.",
      },
      {
        title: "Dispute Handling",
        content:
          "Disputed outcomes should be reviewed through the project governance or support process once live operations are enabled.",
      },
    ],
  },
  {
    id: "faq",
    titleKey: "docFaq",
    descriptionKey: "docFaqDesc",
    articles: [
      {
        title: "What fees does Lumora charge?",
        content:
          "The current public page presents the product interface. Final fee details should be confirmed in official launch documentation.",
      },
      {
        title: "What is the minimum bet?",
        content:
          "The demo interface shows SOL-denominated markets. Final limits depend on the deployed contracts and liquidity settings.",
      },
      {
        title: "Can I cancel a bet?",
        content:
          "On-chain transactions generally cannot be reversed after confirmation. Always review before signing.",
      },
    ],
  },
]

const iconMap = {
  "getting-started": Zap,
  markets: TrendingUp,
  agents: Users,
  security: Shield,
  faq: HelpCircle,
}

export function DocsSection() {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState(docData[0].id)
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null)

  const activeCategory = docData.find((category) => category.id === selectedCategory) ?? docData[0]
  const ActiveIcon = iconMap[activeCategory.id as keyof typeof iconMap]

  return (
    <section className="border-t border-border bg-background py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex items-center gap-2 md:mb-8">
          <BookOpen className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-bold text-foreground md:text-2xl">{t("documentation")}</h2>
        </div>

        <div className="mb-4 flex gap-1.5 overflow-x-auto pb-1 lg:hidden">
          {docData.map((category) => {
            const Icon = iconMap[category.id as keyof typeof iconMap]
            return (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id)
                  setExpandedArticle(null)
                }}
                className={`flex shrink-0 items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors ${
                  selectedCategory === category.id
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {t(category.titleKey)}
              </button>
            )
          })}
        </div>

        <div className="grid gap-4 lg:grid-cols-[260px_1fr] lg:gap-6">
          <div className="hidden space-y-1 lg:block">
            {docData.map((category) => {
              const Icon = iconMap[category.id as keyof typeof iconMap]
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id)
                    setExpandedArticle(null)
                  }}
                  className={`flex w-full items-center gap-3 rounded-md border px-3 py-2.5 text-left transition-colors ${
                    selectedCategory === category.id
                      ? "border-primary/40 bg-primary/5 text-primary"
                      : "border-transparent text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium">{t(category.titleKey)}</div>
                    <div className="truncate text-xs opacity-70">{t(category.descriptionKey)}</div>
                  </div>
                </button>
              )
            })}
          </div>

          <Card className="bg-card">
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center gap-2 text-base">
                {ActiveIcon && <ActiveIcon className="h-4 w-4 text-muted-foreground" />}
                {t(activeCategory.titleKey)}
              </CardTitle>
            </CardHeader>
            <CardContent className="divide-y divide-border p-0">
              {activeCategory.articles.map((article, index) => {
                const itemId = `${selectedCategory}-${index}`
                const isExpanded = expandedArticle === itemId

                return (
                  <div key={itemId}>
                    <button
                      onClick={() => setExpandedArticle(isExpanded ? null : itemId)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-secondary/40"
                    >
                      <span className="text-sm font-medium text-foreground">{article.title}</span>
                      <ChevronRight
                        className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
                          isExpanded ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="border-t border-border bg-secondary/20 px-4 py-3">
                        <p className="text-sm leading-relaxed text-muted-foreground">{article.content}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
