const faqs = [
  {
    question: "Is this the full token product?",
    answer:
      "No. This is the first MVP layer built to communicate the token thesis, show live context, and make community onboarding easier.",
  },
  {
    question: "Does the page include live functionality?",
    answer:
      "Yes. The metrics module fetches token pricing data through the local API route, and the wallet flow is ready for supported Solana wallets.",
  },
  {
    question: "Are the tokenomics final?",
    answer:
      "The allocation bars are illustrative placeholders until verified launch details are finalized. They help shape the page structure without overstating certainty.",
  },
  {
    question: "Why remove nonessential modules right now?",
    answer:
      "First-principles MVP work is about shipping the fewest modules that still prove the product direction. Extra complexity can be layered in after GitHub handoff.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="border-b border-border bg-background py-14 md:py-18">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-3xl">
          <div className="text-caption text-primary">FAQ</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Questions the MVP should answer immediately</h2>
        </div>

        <div className="mt-8 grid gap-4">
          {faqs.map((item) => (
            <div key={item.question} className="rounded-3xl border border-border bg-card p-6">
              <div className="text-lg font-semibold">{item.question}</div>
              <p className="mt-3 max-w-4xl text-sm leading-6 text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
