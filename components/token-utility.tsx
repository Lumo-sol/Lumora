const utilityCards = [
  {
    title: "Community Access",
    description: "Use the token story to gate updates, early campaigns, and future contributor programs.",
  },
  {
    title: "Liquidity Alignment",
    description: "Frame the token around coordinated liquidity, stronger holder communication, and cleaner launch messaging.",
  },
  {
    title: "Ecosystem Rewards",
    description: "Reserve space for quests, partner drops, and ecosystem activations that can be added after launch validation.",
  },
  {
    title: "Governance Path",
    description: "Introduce governance as a future layer without pretending the full mechanism is already live.",
  },
]

const tokenomics = [
  { label: "Community", value: "42%", width: "42%" },
  { label: "Liquidity", value: "18%", width: "18%" },
  { label: "Ecosystem", value: "20%", width: "20%" },
  { label: "Team", value: "12%", width: "12%" },
  { label: "Treasury", value: "8%", width: "8%" },
]

export function TokenUtility() {
  return (
    <section id="utility" className="border-b border-border bg-background py-14 md:py-18">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-3xl">
          <div className="text-caption text-primary">Utility Design</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">A realistic utility layer for an MVP token site</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Good MVP scope does not try to invent the entire token economy on day one. It makes the
            launch thesis legible, shows where utility can live, and leaves room for the product to mature.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {utilityCards.map((item) => (
            <div key={item.title} className="rounded-3xl border border-border bg-card p-6">
              <div className="text-lg font-semibold">{item.title}</div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-3xl border border-border bg-card p-6">
            <div className="text-caption text-muted-foreground">Product principle</div>
            <div className="mt-2 text-2xl font-semibold">Message utility before complexity</div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Visitors first need to understand why the token exists, what behavior it supports,
              and how the project plans to earn trust. This module is the bridge between hype and substance.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            <div className="text-caption text-muted-foreground">Illustrative allocation</div>
            <div className="mt-5 space-y-4">
              {tokenomics.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span>{item.label}</span>
                    <span className="font-mono text-muted-foreground">{item.value}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-primary" style={{ width: item.width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
