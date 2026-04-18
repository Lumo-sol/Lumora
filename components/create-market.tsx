"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Send, Sparkles, Check, Loader2, ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/language-toggle"

const quickPromptsList = [
  "BTC breaks $100K in 24h?",
  "BONK pumps 50% this week?",
  "ETH Gas avg <10 gwei next hour?",
  "Solana TVL > Ethereum TVL?",
  "SOL hits $250 in 48h?",
  "DOGE market cap > $30B?",
]

interface ParsedMarket {
  asset: string
  condition: string
  timeframe: string
  threshold: string
  confidence: number
}

export function CreateMarket() {
  const { t } = useLanguage()
  const [prompt, setPrompt] = useState("")
  const [isParsing, setIsParsing] = useState(false)
  const [parsed, setParsed] = useState<ParsedMarket | null>(null)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    if (prompt.length > 10) {
      setIsParsing(true)
      const timer = setTimeout(() => {
        setParsed({
          asset: prompt.match(/BTC|ETH|SOL|BONK|DOGE|WIF/i)?.[0]?.toUpperCase() || "TOKEN",
          condition: prompt.includes(">") ? "Above" : prompt.includes("<") ? "Below" : "Reaches",
          timeframe: prompt.match(/\d+h|\d+d|\d+ hour|\d+ day|week/i)?.[0] || "24h",
          threshold: prompt.match(/\$[\d,]+|\d+%/)?.[0] || "$100,000",
          confidence: Math.floor(Math.random() * 15) + 85,
        })
        setIsParsing(false)
        setCurrentStep(1)
      }, 800)
      return () => clearTimeout(timer)
    } else {
      setParsed(null)
      setCurrentStep(0)
    }
  }, [prompt])

  const pipelineSteps = [
    { step: 1, title: t("stepNlp"), description: t("stepNlpDesc"), active: currentStep >= 1 },
    { step: 2, title: t("stepValidation"), description: t("stepValidationDesc"), active: currentStep >= 2 },
    { step: 3, title: t("stepContract"), description: t("stepContractDesc"), active: currentStep >= 3 },
    { step: 4, title: t("stepLive"), description: t("stepLiveDesc"), active: currentStep >= 4 },
  ]

  const handleCreate = () => {
    setCurrentStep(2)
    setTimeout(() => setCurrentStep(3), 1000)
    setTimeout(() => setCurrentStep(4), 2000)
  }

  return (
    <section className="border-t border-border bg-background py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1">
            <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-caption text-muted-foreground">{t("aiMarketCreation")}</span>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {t("createAMarket")}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
            {t("createMarketDesc")}
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {/* Input Section */}
          <div className="space-y-3">
            <div className="overflow-hidden rounded-lg border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                <span className="text-caption text-foreground">{t("describePrediction")}</span>
                <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                  {prompt.length}/280
                </span>
              </div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t("promptPlaceholder")}
                rows={5}
                className="block w-full resize-none bg-transparent p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <div className="flex items-center justify-between gap-2 border-t border-border bg-secondary/20 px-4 py-2.5">
                <div className="text-xs text-muted-foreground">
                  {isParsing ? (
                    <span className="inline-flex items-center gap-1.5 text-primary">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      {t("parsing")}
                    </span>
                  ) : parsed ? (
                    <span className="inline-flex items-center gap-1.5 text-primary">
                      <Check className="h-3 w-3" />
                      Parsed · {parsed.confidence}% confidence
                    </span>
                  ) : (
                    <span>Type 10+ chars to start parsing</span>
                  )}
                </div>
                <Button
                  size="sm"
                  disabled={!parsed || currentStep > 1}
                  onClick={handleCreate}
                  className="h-8 gap-1.5 bg-primary px-3 text-xs text-primary-foreground hover:bg-primary/90"
                >
                  <Send className="h-3 w-3" />
                  {t("createBtn")}
                </Button>
              </div>
            </div>

            {/* Quick Prompts */}
            <div className="overflow-hidden rounded-lg border border-border bg-card">
              <div className="border-b border-border px-4 py-2.5">
                <span className="text-caption text-foreground">{t("quickPrompts")}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 p-3">
                {quickPromptsList.map((qp) => (
                  <button
                    key={qp}
                    onClick={() => setPrompt(qp)}
                    className="group inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    <span>{qp}</span>
                    <ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-3">
            {/* Live Preview Card */}
            <div className="overflow-hidden rounded-lg border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                <span className="text-caption text-foreground">{t("livePreview")}</span>
                {parsed && (
                  <span className="rounded border border-primary/40 bg-primary/10 px-2 py-0.5 font-mono text-[11px] tabular-nums text-primary">
                    {parsed.confidence}% AI
                  </span>
                )}
              </div>

              {parsed ? (
                <div className="p-4">
                  {/* Preview Market */}
                  <div className="rounded-md border border-primary/30 bg-primary/5 p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-caption text-muted-foreground">{t("catPrice")}</span>
                      <span className="h-3 w-px bg-border" />
                      <span className="text-caption text-primary">AI Generated</span>
                    </div>
                    <h4 className="mt-2 text-base font-medium text-foreground">
                      {parsed.asset} {parsed.condition} {parsed.threshold} in {parsed.timeframe}?
                    </h4>

                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <div className="text-caption text-muted-foreground">YES</div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="tabular-nums text-xl font-semibold text-primary">0.50</span>
                          <span className="text-caption text-primary/80">SOL</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-caption text-muted-foreground">NO</div>
                        <div className="flex items-baseline justify-end gap-1.5">
                          <span className="tabular-nums text-xl font-semibold text-muted-foreground">
                            0.50
                          </span>
                          <span className="text-caption text-muted-foreground">SOL</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-secondary">
                      <div className="h-full w-1/2 bg-primary" />
                    </div>
                  </div>

                  {/* Parsed Params */}
                  <dl className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border">
                    {[
                      { label: t("asset"), value: parsed.asset },
                      { label: t("condition"), value: parsed.condition },
                      { label: t("threshold"), value: parsed.threshold },
                      { label: t("timeframe"), value: parsed.timeframe },
                    ].map((p) => (
                      <div key={p.label} className="bg-card p-2.5">
                        <dt className="text-caption text-muted-foreground">{p.label}</dt>
                        <dd className="mt-0.5 font-mono text-sm tabular-nums text-foreground">
                          {p.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-14 text-center">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md border border-dashed border-border bg-secondary/30">
                    <Sparkles className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">{t("startTyping")}</p>
                </div>
              )}
            </div>

            {/* Pipeline Progress */}
            <div className="overflow-hidden rounded-lg border border-border bg-card">
              <div className="border-b border-border px-4 py-2.5">
                <span className="text-caption text-foreground">{t("agentPipeline")}</span>
              </div>
              <ol className="relative p-4">
                <div className="absolute left-[25px] top-6 bottom-6 w-px bg-border" />
                {pipelineSteps.map((step, i) => (
                  <li
                    key={step.step}
                    className={`relative flex items-start gap-3 ${i > 0 ? "mt-4" : ""}`}
                  >
                    <div
                      className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold transition-colors ${
                        step.active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-muted-foreground"
                      }`}
                    >
                      {step.active && currentStep > step.step ? (
                        <Check className="h-3 w-3" />
                      ) : step.active && currentStep === step.step ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        step.step
                      )}
                    </div>
                    <div className="pt-px">
                      <div
                        className={`text-sm font-medium ${
                          step.active ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {step.title}
                      </div>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
