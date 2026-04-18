const ecosystemRows = [
  {
    title: "Consumer-grade UX",
    description: "SOL supports products that need fast feedback loops, low-friction actions, and familiar app behavior.",
  },
  {
    title: "Culture and distribution",
    description: "The ecosystem already understands token velocity, community formation, and social-led launches.",
  },
  {
    title: "Composable growth",
    description: "A SOL-native token can plug into wallets, DEX flows, quests, and ecosystem campaigns over time.",
  },
]

const integrationIdeas = ["Wallet onboarding", "DEX visibility", "Quest campaigns", "Partner drops"]

export function EcosystemSection() {
  return (
    <section id="ecosystem" className="border-b border-border bg-background py-14 md:py-18">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="text-caption text-primary">Ecosystem Fit</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Why the product story belongs on Solana</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              First-principles positioning matters: the chain should not feel like a decorative label.
              This section explains why the token, the audience, and the launch mechanics make sense together.
            </p>
          </div>

          <div className="grid gap-4">
            {ecosystemRows.map((item) => (
              <div key={item.title} className="rounded-3xl border border-border bg-card p-6">
                <div className="text-lg font-semibold">{item.title}</div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-border bg-card p-6">
          <div className="text-caption text-muted-foreground">Expansion hooks</div>
          <div className="mt-5 flex flex-wrap gap-3">
            {integrationIdeas.map((item) => (
              <div
                key={item}
                className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm text-foreground"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
