import { NextResponse } from "next/server"
import { readRuntimeConfig } from "@/lib/server-storage"
import { isLikelySolanaAddress } from "@/lib/validators"

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
