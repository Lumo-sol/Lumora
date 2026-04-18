import { ArrowRight, ShieldCheck, Waves, Zap } from "lucide-react"

const thesisPoints = [
  {
    title: "Execution First",
    description: "The MVP is designed to convert attention into conviction with a crisp token story and direct wallet action.",
    icon: Zap,
  },
  {
    title: "Liquidity Aware",
    description: "Every module supports the same funnel: understand SOL, trust the narrative, and join the community.",
    icon: Waves,
  },
  {
    title: "Community Safe",
    description: "Clear disclaimers, visible contract copy, and wallet-based entry keep the product simple and credible.",
    icon: ShieldCheck,
  },
]

export function HeroSection() {
  return (
    <section id="overview" className="relative overflow-hidden border-b border-border">
      <div
        className="absolute inset-0 opacity-70"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(20,241,149,0.18), transparent 30%), radial-gradient(circle at top right, rgba(153,69,255,0.16), transparent 28%), linear-gradient(180deg, rgba(8,12,24,0.05), transparent 60%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <span className="h-2 w-2 rounded-full bg-primary" />
            SOL Token MVP
          </div>

          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Build conviction around <span className="text-primary">SOL</span> with a landing page that
              feels native to the chain.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Lumora packages the first principles of a token launch into one clean experience:
              a clear thesis, live market context, credible utility, ecosystem alignment, and a
              direct path into community.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#metrics"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Explore Metrics
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#community"
              className="inline-flex h-11 items-center rounded-md border border-border bg-card px-5 text-sm font-medium transition-colors hover:bg-secondary"
            >
              Join the Waitlist
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {thesisPoints.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-2xl border border-border bg-card/80 p-4 shadow-sm">
                  <Icon className="h-5 w-5 text-primary" />
                  <div className="mt-3 text-sm font-semibold">{item.title}</div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card/90 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.12)]">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-caption text-muted-foreground">Featured Thesis</div>
              <div className="mt-2 text-2xl font-semibold">Why SOL Now</div>
            </div>
            <div className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Live Narrative
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-background p-4">
              <div className="text-caption text-muted-foreground">Network thesis</div>
              <div className="mt-2 text-3xl font-semibold">Fast enough for scale</div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                SOL wins when cost, speed, and user experience matter at the same time.
              </p>
            </div>
            <div className="rounded-2xl bg-background p-4">
              <div className="text-caption text-muted-foreground">Product thesis</div>
              <div className="mt-2 text-3xl font-semibold">Simple enough to convert</div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                The MVP focuses on the pages people actually need before they connect a wallet or join a community.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-border p-4">
              <div className="text-caption text-muted-foreground">Primary CTA</div>
              <div className="mt-2 text-xl font-semibold">Wallet-ready</div>
            </div>
            <div className="rounded-2xl border border-border p-4">
              <div className="text-caption text-muted-foreground">Conversion path</div>
              <div className="mt-2 text-xl font-semibold">Narrative to community</div>
            </div>
            <div className="rounded-2xl border border-border p-4">
              <div className="text-caption text-muted-foreground">Shipping mode</div>
              <div className="mt-2 text-xl font-semibold">GitHub-friendly</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
