import { NextResponse } from 'next/server'

const COINGECKO_API = 'https://api.coingecko.com/api/v3'

interface CryptoPrice {
  symbol: string
  name: string
  price: number
  change24h: number
}

export async function GET() {
  try {
    const response = await fetch(
      `${COINGECKO_API}/simple/price?ids=bitcoin,ethereum,solana,dogecoin,shiba-inu,bonk,dogwifcoin,pepe&vs_currencies=usd&include_24hr_change=true`,
      { next: { revalidate: 60 } }
    )

    if (!response.ok) {
      throw new Error('CoinGecko API error')
    }

    const data = await response.json()

    const prices: CryptoPrice[] = [
      { symbol: 'BTC', name: 'Bitcoin', price: data.bitcoin?.usd || 94250, change24h: data.bitcoin?.usd_24h_change || 2.1 },
      { symbol: 'ETH', name: 'Ethereum', price: data.ethereum?.usd || 1820, change24h: data.ethereum?.usd_24h_change || 1.8 },
      { symbol: 'SOL', name: 'Solana', price: data.solana?.usd || 178.5, change24h: data.solana?.usd_24h_change || 3.2 },
      { symbol: 'DOGE', name: 'Dogecoin', price: data.dogecoin?.usd || 0.124, change24h: data.dogecoin?.usd_24h_change || -1.5 },
      { symbol: 'SHIB', name: 'Shiba Inu', price: data['shiba-inu']?.usd || 0.0000089, change24h: data['shiba-inu']?.usd_24h_change || 4.2 },
      { symbol: 'BONK', name: 'Bonk', price: data.bonk?.usd || 0.000028, change24h: data.bonk?.usd_24h_change || 8.5 },
      { symbol: 'WIF', name: 'dogwifhat', price: data.dogwifcoin?.usd || 2.85, change24h: data.dogwifcoin?.usd_24h_change || -3.2 },
      { symbol: 'PEPE', name: 'Pepe', price: data.pepe?.usd || 0.0000082, change24h: data.pepe?.usd_24h_change || 5.7 },
    ]

    return NextResponse.json(prices)
  } catch {
    const fallbackPrices: CryptoPrice[] = [
      { symbol: 'BTC', name: 'Bitcoin', price: 94250, change24h: 2.1 },
      { symbol: 'ETH', name: 'Ethereum', price: 1820, change24h: 1.8 },
      { symbol: 'SOL', name: 'Solana', price: 178.5, change24h: 3.2 },
      { symbol: 'DOGE', name: 'Dogecoin', price: 0.124, change24h: -1.5 },
      { symbol: 'SHIB', name: 'Shiba Inu', price: 0.0000089, change24h: 4.2 },
      { symbol: 'BONK', name: 'Bonk', price: 0.000028, change24h: 8.5 },
      { symbol: 'WIF', name: 'dogwifhat', price: 2.85, change24h: -3.2 },
      { symbol: 'PEPE', name: 'Pepe', price: 0.0000082, change24h: 5.7 },
    ]
    return NextResponse.json(fallbackPrices)
  }
}
