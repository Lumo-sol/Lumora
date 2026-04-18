import { NextResponse } from "next/server"
import { isValidEmail } from "@/lib/validators"

interface WaitlistEntry {
  email: string
  source: string
  createdAt: string
}

const waitlistEntries: WaitlistEntry[] = []

export async function GET() {
  return NextResponse.json({
    count: waitlistEntries.length,
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : ""
    const source = typeof body.source === "string" ? body.source.trim() : "landing-page"

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    const existingEntry = waitlistEntries.find((entry) => entry.email === email)

    if (existingEntry) {
      return NextResponse.json({
        success: true,
        duplicate: true,
        count: waitlistEntries.length,
        message: "Email already exists in the waitlist.",
      })
    }

    waitlistEntries.unshift({
      email,
      source,
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      duplicate: false,
      count: waitlistEntries.length,
      message: "Waitlist entry recorded.",
    })
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
