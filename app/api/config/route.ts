import { NextResponse } from "next/server"
import { readRuntimeConfig, writeRuntimeConfig } from "@/lib/server-storage"
import { isLikelySolanaAddress } from "@/lib/validators"

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const DEFAULT_CONTRACT_ADDRESS =
  process.env.DEFAULT_CONTRACT_ADDRESS || "88888888888888888888888888888888"

const defaultConfig = {
  contractAddress: isLikelySolanaAddress(DEFAULT_CONTRACT_ADDRESS)
    ? DEFAULT_CONTRACT_ADDRESS
    : "88888888888888888888888888888888",
}

export async function GET() {
  const config = await readRuntimeConfig(defaultConfig)
  return NextResponse.json(config)
}

export async function POST(request: Request) {
  try {
    if (!ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Admin password is not configured" }, { status: 503 })
    }

    const { password, contractAddress } = await request.json()

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (contractAddress && contractAddress !== "verify") {
      if (!isLikelySolanaAddress(contractAddress)) {
        return NextResponse.json({ error: "Invalid Solana address" }, { status: 400 })
      }

      const nextConfig = { contractAddress }
      await writeRuntimeConfig(nextConfig)

      return NextResponse.json({
        success: true,
        contractAddress: nextConfig.contractAddress,
      })
    }

    const config = await readRuntimeConfig(defaultConfig)

    return NextResponse.json({
      success: true,
      contractAddress: config.contractAddress,
    })
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
