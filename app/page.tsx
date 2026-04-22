import { AgentHub } from "@/components/agent-hub"
import { CreateMarket } from "@/components/create-market"
import { DocsSection } from "@/components/docs-section"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { MobileBetSlip } from "@/components/mobile-bet-slip"
import { PortfolioSection } from "@/components/portfolio-section"
import { PredictionMarkets } from "@/components/prediction-markets"
import { PriceTicker } from "@/components/price-ticker"
import { RankSection } from "@/components/rank-section"
import { StickySidebar } from "@/components/sticky-sidebar"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PriceTicker />
      <HeroSection />

      <main className="pb-20 md:pb-0">
        <section id="markets" className="scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 py-6 md:py-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
              <PredictionMarkets />
              <aside className="hidden lg:block">
                <StickySidebar />
              </aside>
            </div>
          </div>
        </section>

        <section id="agents" className="scroll-mt-20">
          <AgentHub />
        </section>

        <section id="create" className="scroll-mt-20">
          <CreateMarket />
        </section>

        <section id="rank" className="scroll-mt-20">
          <RankSection />
        </section>

        <section id="docs" className="scroll-mt-20">
          <DocsSection />
        </section>

        <section id="portfolio" className="scroll-mt-20">
          <PortfolioSection />
        </section>
      </main>

      <Footer />
      <MobileBetSlip />
    </div>
  )
}
