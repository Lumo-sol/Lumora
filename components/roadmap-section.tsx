const roadmap = [
  {
    phase: "Phase 01",
    title: "Narrative MVP",
    status: "Shipped",
    description: "Hero, metrics, utility, ecosystem framing, FAQ, and community CTA.",
  },
  {
    phase: "Phase 02",
    title: "Social Expansion",
    status: "Next",
    description: "Add announcement pages, campaign assets, and stronger inbound conversion paths.",
  },
  {
    phase: "Phase 03",
    title: "Wallet Activation",
    status: "Planned",
    description: "Connect launch mechanics to wallet events, token verification, and gated experiences.",
  },
  {
    phase: "Phase 04",
    title: "Ecosystem Programs",
    status: "Later",
    description: "Introduce quests, partner integrations, and post-launch retention loops.",
  },
]

export function RoadmapSection() {
  return (
    <section id="roadmap" className="border-b border-border bg-background py-14 md:py-18">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-3xl">
          <div className="text-caption text-primary">Roadmap</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">A shipping path that grows with the token</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            The roadmap keeps the MVP honest. It shows what exists today, what is intentionally next,
            and what should wait until the project earns more product and market certainty.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {roadmap.map((item) => (
            <div key={item.phase} className="rounded-3xl border border-border bg-card p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="text-caption text-muted-foreground">{item.phase}</div>
                <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {item.status}
                </div>
              </div>
              <div className="mt-3 text-2xl font-semibold">{item.title}</div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
