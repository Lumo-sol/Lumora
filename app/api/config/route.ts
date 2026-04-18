import { NextResponse } from "next/server"
import { isLikelySolanaAddress } from "@/lib/validators"

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "lumora2024"
const DEFAULT_CONTRACT_ADDRESS =
  process.env.DEFAULT_CONTRACT_ADDRESS || "So11111111111111111111111111111111111111112"

let configCache = {
  contractAddress: isLikelySolanaAddress(DEFAULT_CONTRACT_ADDRESS)
    ? DEFAULT_CONTRACT_ADDRESS
    : "So11111111111111111111111111111111111111112",
}

export async function GET() {
  return NextResponse.json(configCache)
}

export async function POST(request: Request) {
  try {
    const { password, contractAddress } = await request.json()

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (contractAddress && contractAddress !== "verify") {
      if (!isLikelySolanaAddress(contractAddress)) {
        return NextResponse.json({ error: "Invalid Solana address" }, { status: 400 })
      }

      configCache.contractAddress = contractAddress
    }

    return NextResponse.json({
      success: true,
      contractAddress: configCache.contractAddress,
    })
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
