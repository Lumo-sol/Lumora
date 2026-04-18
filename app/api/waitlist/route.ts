import { NextResponse } from "next/server"
import { readWaitlistEntries, writeWaitlistEntries, type WaitlistEntry } from "@/lib/server-storage"
import { isValidEmail } from "@/lib/validators"

export async function GET() {
  const waitlistEntries = await readWaitlistEntries()

  return NextResponse.json({
    count: waitlistEntries.length,
  })
}

export async function POST(request: Request) {
  try {
    const waitlistEntries = await readWaitlistEntries()
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

    const nextEntry: WaitlistEntry = {
      email,
      source,
      createdAt: new Date().toISOString(),
    }

    waitlistEntries.unshift(nextEntry)
    await writeWaitlistEntries(waitlistEntries)

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
