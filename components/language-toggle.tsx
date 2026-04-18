"use client"

import { createContext, useContext, type ReactNode } from "react"
import { Globe } from "lucide-react"

type Language = "en"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations: Record<string, string> = {
  markets: "Markets",
  agents: "Agents",
  create: "Create",
  rank: "Rank",
  docs: "Docs",
  portfolio: "Portfolio",
  connectWallet: "Connect Wallet",
  disconnect: "Disconnect",
  aiPowered: "SOL-Native Product",
  heroTitlePrefix: "Build on",
  heroTitleHighlight: "SOL",
  heroSubtitle: "A clean MVP for token messaging, market context, and wallet-driven community conversion.",
  exploreMarkets: "Explore Metrics",
  createMarket: "Join Community",
  activeMarkets: "Active Modules",
  volume24h: "Volume",
  avgSettlement: "Fee Profile",
  liveSettlement: "Live",
  predictionMarkets: "Market View",
  marketsSubtitle: "A curated list of live token signals",
  allMarkets: "All",
  catPrice: "Price",
  catMeme: "Community",
  catDeFi: "DeFi",
  catGas: "Fees",
  catSynth: "Builders",
  catGov: "Governance",
  loadMore: "Load More",
  hot: "Hot",
  aiGenerated: "Curated",
  agentSettled: "Tracked",
  yes: "Up",
  no: "Down",
  traders: "participants",
  clickToBetYes: "Positive momentum",
  clickToBetNo: "Negative momentum",
  aiAgentInfra: "Execution Layer",
  agentHub: "Project Stack",
  agentHubDesc: "Narrative, utility, and conversion working as one product surface.",
  liveAgentStatus: "Live Status",
  marketCreator: "Narrative",
  marketCreatorDesc: "Clarifies the token story.",
  dataOracle: "Metrics",
  dataOracleDesc: "Provides market awareness.",
  settlementEngine: "Conversion",
  settlementEngineDesc: "Moves visitors into the community.",
  lastAction: "Last Action",
  statCreated: "Created",
  statToday: "Today",
  statNlpAccuracy: "Clarity",
  statLatency: "Latency",
  statDataSources: "Sources",
  statQueriesPerHour: "Refreshes",
  statRlVersion: "Version",
  statSettled: "Resolved",
  statAccuracy: "Accuracy",
  statSpeed: "Speed",
  totalMarkets: "Total",
  totalSettled: "Settled",
  successRate: "Success Rate",
  live: "Live",
  aiMarketCreation: "Narrative Builder",
  createAMarket: "Create",
  createMarketDesc: "A structured product surface for a SOL token launch.",
  describePrediction: "Describe",
  promptPlaceholder: "Explain the token thesis and utility.",
  parsing: "Loading...",
  createBtn: "Submit",
  chars: "characters",
  minChars: "Min 10 characters",
  quickPrompts: "Quick prompts",
  livePreview: "Preview",
  aiConfidence: "Confidence",
  startTyping: "Type to preview",
  asset: "Asset",
  condition: "Condition",
  threshold: "Threshold",
  timeframe: "Timeframe",
  initialLiquidity: "Liquidity",
  agentPipeline: "Pipeline",
  stepNlp: "Message",
  stepNlpDesc: "Clarify the narrative",
  stepValidation: "Validate",
  stepValidationDesc: "Check the inputs",
  stepContract: "Publish",
  stepContractDesc: "Ship the contract data",
  stepLive: "Live",
  stepLiveDesc: "Ready for visitors",
  leaderboard: "Leaderboard",
  weekly: "Weekly",
  monthly: "Monthly",
  allTime: "All Time",
  winStreak: "streak",
  wins: "Wins",
  accuracy: "Accuracy",
  profit: "Profit",
  documentation: "Documentation",
  docGettingStarted: "Getting Started",
  docGettingStartedDesc: "Project basics",
  docUnderstanding: "Token Utility",
  docUnderstandingDesc: "How the token works",
  docAiAgents: "Architecture",
  docAiAgentsDesc: "How the MVP is structured",
  docSecurity: "Security",
  docSecurityDesc: "Wallet safety and disclosures",
  docFaq: "FAQ",
  docFaqDesc: "Common questions",
  myPortfolio: "My Portfolio",
  connectYourWallet: "Connect Wallet",
  connectWalletDesc: "View wallet state and community readiness.",
  totalValue: "Total Value",
  todayPnL: "Today",
  activeBets: "Active",
  winRate: "Win Rate",
  totalBets: "Total",
  activePositions: "Positions",
  recentHistory: "Recent History",
  win: "Win",
  won: "Won",
  lost: "Lost",
  liveActivity: "Live Activity",
  betSlip: "Action Panel",
  noBetsSelected: "No actions selected",
  clickYesOrNo: "Choose an action to continue",
  totalStake: "Total",
  potentialReturn: "Potential",
  platformFee: "Fee",
  placeBet: "Continue",
  notifications: "Notifications",
  markAllRead: "Mark all as read",
  noNotifications: "No notifications",
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const value: LanguageContextType = {
    language: "en",
    setLanguage: () => {},
    t: (key) => translations[key] ?? key,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    return {
      language: "en" as const,
      setLanguage: () => {},
      t: (key: string) => translations[key] ?? key,
    }
  }
  return context
}

export function LanguageToggle() {
  return (
    <button
      type="button"
      disabled
      className="flex h-9 items-center gap-2 rounded-md border border-border px-3 text-xs text-muted-foreground"
      aria-label="English only"
    >
      <Globe className="h-4 w-4" />
      <span>EN</span>
    </button>
  )
}
