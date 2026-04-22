import type { Metadata, Viewport } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { SolanaWalletProvider } from "@/components/wallet-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Lumora — AI-Powered Prediction Markets",
  description:
    "A prediction market terminal for crypto. Trade binary contracts on price, on-chain metrics, and macro events settled by AI agents.",
  openGraph: {
    title: "Lumora — AI-Powered Prediction Markets",
    description:
      "A prediction market terminal for crypto. Trade binary contracts on price, on-chain metrics, and macro events.",
    type: "website",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#050816" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-background">
      <body className="bg-background antialiased">
        <ThemeProvider>
          <SolanaWalletProvider>{children}</SolanaWalletProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
