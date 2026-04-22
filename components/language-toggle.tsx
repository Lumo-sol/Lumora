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
  aiPowered: "AI-Powered Prediction Market",
  heroTitlePrefix: "Predict the Future with",
  heroTitleHighlight: "AI Agents",
  heroSubtitle:
    "The fastest prediction market on Solana. AI agents analyze data, settle markets in milliseconds, and ensure fair outcomes.",
  exploreMarkets: "Explore Markets",
  createMarket: "Create Market",
  activeMarkets: "Active Markets",
  volume24h: "24h Volume",
  avgSettlement: "Avg Settlement",
  liveSettlement: "Live settlement",
  predictionMarkets: "Prediction Markets",
  marketsSubtitle: "AI-powered markets with 340ms settlement",
  allMarkets: "All Markets",
  catPrice: "Price",
  catMeme: "Meme",
  catDeFi: "DeFi",
  catGas: "Gas",
  catSynth: "Synth",
  catGov: "Governance",
  loadMore: "Load More Markets",
  hot: "Hot",
  aiGenerated: "AI",
  agentSettled: "Agent Settled",
  yes: "YES",
  no: "NO",
  traders: "traders",
  clickToBetYes: "Click to bet YES",
  clickToBetNo: "Click to bet NO",
  aiAgentInfra: "AI Agent Infrastructure",
  agentHub: "Agent Hub",
  agentHubDesc:
    "Three AI agents working in sync to power the full prediction market lifecycle. From market creation to instant settlement in under 500ms.",
  liveAgentStatus: "Live Agent Status",
  marketCreator: "Market Creator",
  marketCreatorDesc: "Parse natural language, extract conditions, generate on-chain markets",
  dataOracle: "Data Oracle",
  dataOracleDesc: "Aggregate on/off-chain data, RL-adjusted probability, real-time odds",
  settlementEngine: "Settlement Engine",
  settlementEngineDesc: "Listen for results, verify data, settle on-chain, instant payouts",
  lastAction: "Last Action",
  statCreated: "Created",
  statToday: "Today",
  statNlpAccuracy: "NLP Accuracy",
  statLatency: "Latency",
  statDataSources: "Data Sources",
  statQueriesPerHour: "Queries/h",
  statRlVersion: "RL Version",
  statSettled: "Settled",
  statAccuracy: "Accuracy",
  statSpeed: "Speed",
  totalMarkets: "Total Markets",
  totalSettled: "Total Settled",
  successRate: "Success Rate",
  live: "Live",
  aiMarketCreation: "AI-Powered Market Creation",
  createAMarket: "Create a Market",
  createMarketDesc:
    "Describe your prediction in natural language. Our AI agents will parse your input and create an on-chain market automatically.",
  describePrediction: "Describe your prediction",
  promptPlaceholder: "Example: Will BTC break $100,000 in the next 24 hours?",
  parsing: "Parsing...",
  createBtn: "Create",
  chars: "characters",
  minChars: "Min 10 characters",
  quickPrompts: "Quick prompts",
  livePreview: "Live Preview",
  aiConfidence: "AI Confidence",
  startTyping: "Start typing to see a live preview of your market",
  asset: "Asset",
  condition: "Condition",
  threshold: "Threshold",
  timeframe: "Timeframe",
  initialLiquidity: "Initial Liquidity",
  agentPipeline: "Agent Pipeline",
  stepNlp: "NLP Parsing",
  stepNlpDesc: "Extracting asset, condition, timeframe",
  stepValidation: "Data Validation",
  stepValidationDesc: "Verifying market parameters",
  stepContract: "Smart Contract",
  stepContractDesc: "Deploying on-chain market",
  stepLive: "Live",
  stepLiveDesc: "Market ready for trading",
  leaderboard: "Leaderboard",
  weekly: "Weekly",
  monthly: "Monthly",
  allTime: "All Time",
  winStreak: "W streak",
  wins: "Wins",
  accuracy: "Accuracy",
  profit: "P&L",
  documentation: "Documentation",
  docGettingStarted: "Getting Started",
  docGettingStartedDesc: "Learn the basics of Lumora",
  docUnderstanding: "Understanding Markets",
  docUnderstandingDesc: "How prediction markets work",
  docAiAgents: "AI Agents",
  docAiAgentsDesc: "Meet the AI agents powering Lumora",
  docSecurity: "Security",
  docSecurityDesc: "How we keep your funds safe",
  docFaq: "FAQ",
  docFaqDesc: "Frequently asked questions",
  myPortfolio: "My Portfolio",
  connectYourWallet: "Connect Your Wallet",
  connectWalletDesc:
    "Connect your Solana wallet to view your active positions, betting history, and portfolio performance",
  totalValue: "Total Value",
  todayPnL: "Today's PnL",
  activeBets: "Active Bets",
  winRate: "Win Rate",
  totalBets: "total bets",
  activePositions: "Active Positions",
  recentHistory: "Recent History",
  win: "Win",
  won: "Won",
  lost: "Lost",
  liveActivity: "Live Activity",
  betSlip: "Bet Slip",
  noBetsSelected: "No bets selected",
  clickYesOrNo: "Click YES or NO on a market to add",
  totalStake: "Total Stake",
  potentialReturn: "Potential Return",
  platformFee: "Platform Fee",
  placeBet: "Place Bet",
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
