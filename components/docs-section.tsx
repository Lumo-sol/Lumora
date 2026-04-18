"use client"

import { useState } from "react"
import { BookOpen, ChevronRight, Coins, Shield, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const docCategories = [
  {
    id: "overview",
    title: "Project Overview",
    description: "The first-principles summary of the product.",
    icon: Sparkles,
    articles: [
      {
        title: "What is Lumora?",
        content:
          "Lumora is a SOL-focused landing page MVP built to explain token positioning, show live market context, and convert visitors into community members.",
      },
      {
        title: "Why start with an MVP?",
        content:
          "The MVP prioritizes the smallest set of modules needed before a GitHub handoff: hero narrative, live metrics, utility, roadmap, FAQ, and a wallet-ready CTA.",
      },
    ],
  },
  {
    id: "token",
    title: "Token Utility",
    description: "How the token fits the product story.",
    icon: Coins,
    articles: [
      {
        title: "What utility is included?",
        content:
          "The current MVP frames utility around access, community coordination, staking alignment, and future ecosystem activations without overpromising functionality.",
      },
      {
        title: "What is intentionally omitted?",
        content:
          "No claims are made about guaranteed returns, official endorsements, or finalized governance mechanics. Those should be added only after launch details are verified.",
      },
    ],
  },
  {
    id: "security",
    title: "Security",
    description: "Wallet and contract hygiene.",
    icon: Shield,
    articles: [
      {
        title: "How should visitors verify details?",
        content:
          "Visitors should verify the contract address, confirm the network, and inspect wallet prompts before signing. The interface does not replace due diligence.",
      },
      {
        title: "What is the current risk posture?",
        content:
          "This MVP is informational and conversion-focused. It is not a custody layer and should not be treated as financial advice or an official chain property.",
      },
    ],
  },
]

export function DocsSection() {
  const [selectedCategory, setSelectedCategory] = useState(docCategories[0].id)
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null)

  const activeCategory =
    docCategories.find((category) => category.id === selectedCategory) ?? docCategories[0]
  const ActiveIcon = activeCategory.icon

  return (
    <section id="docs" className="border-t border-border bg-background py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-2xl font-semibold tracking-tight">Project Docs</h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
          <div className="space-y-2">
            {docCategories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id)
                    setExpandedArticle(null)
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
                    selectedCategory === category.id
                      ? "border-primary/40 bg-primary/5"
                      : "border-border bg-card hover:bg-secondary/60"
                  }`}
                >
                  <Icon className="h-4 w-4 text-primary" />
                  <div>
                    <div className="text-sm font-medium">{category.title}</div>
                    <div className="text-xs text-muted-foreground">{category.description}</div>
                  </div>
                </button>
              )
            })}
          </div>

          <Card className="bg-card">
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center gap-2 text-base">
                <ActiveIcon className="h-4 w-4 text-primary" />
                {activeCategory.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="divide-y divide-border p-0">
              {activeCategory.articles.map((article, index) => {
                const itemId = `${activeCategory.id}-${index}`
                const expanded = expandedArticle === itemId

                return (
                  <div key={itemId}>
                    <button
                      onClick={() => setExpandedArticle(expanded ? null : itemId)}
                      className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors hover:bg-secondary/30"
                    >
                      <span className="text-sm font-medium">{article.title}</span>
                      <ChevronRight
                        className={`h-4 w-4 text-muted-foreground transition-transform ${expanded ? "rotate-90" : ""}`}
                      />
                    </button>
                    {expanded && (
                      <div className="border-t border-border bg-secondary/10 px-4 py-4">
                        <p className="text-sm leading-6 text-muted-foreground">{article.content}</p>
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
