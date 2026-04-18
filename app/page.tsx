import { CommunityCta } from "@/components/community-cta"
import { EcosystemSection } from "@/components/ecosystem-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { LiveMetrics } from "@/components/live-metrics"
import { DocsSection } from "@/components/docs-section"
import { RoadmapSection } from "@/components/roadmap-section"
import { TokenUtility } from "@/components/token-utility"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <LiveMetrics />
        <TokenUtility />
        <EcosystemSection />
        <RoadmapSection />
        <FaqSection />
        <DocsSection />
        <CommunityCta />
      </main>
      <Footer />
    </div>
  )
}
