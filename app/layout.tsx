import type { Metadata, Viewport } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { SolanaWalletProvider } from "@/components/wallet-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Lumora | SOL Token MVP",
  description:
    "A SOL-native token landing page focused on conviction, utility, ecosystem momentum, and community conversion.",
  openGraph: {
    title: "Lumora | SOL Token MVP",
    description:
      "Explore the SOL thesis, track market momentum, review utility, and join the Lumora community.",
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
