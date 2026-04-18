"use client"

import { useEffect, useMemo, useState } from "react"
import { Check, Copy } from "lucide-react"
import { isValidEmail } from "@/lib/validators"

export function CommunityCta() {
  const [contractAddress, setContractAddress] = useState("So11111111111111111111111111111111111111112")
  const [copied, setCopied] = useState(false)
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("")
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchInitialState = async () => {
      try {
        const [configResponse, waitlistResponse] = await Promise.all([
          fetch("/api/config"),
          fetch("/api/waitlist"),
        ])

        const configData = await configResponse.json()
        const waitlistData = await waitlistResponse.json()

        if (configData.contractAddress) {
          setContractAddress(configData.contractAddress)
        }

        if (typeof waitlistData.count === "number") {
          setWaitlistCount(waitlistData.count)
        }
      } catch (error) {
        console.error("Failed to fetch initial state:", error)
      }
    }

    fetchInitialState()
  }, [])

  const shortAddress = useMemo(() => {
    if (contractAddress.length <= 12) {
      return contractAddress
    }
    return `${contractAddress.slice(0, 4)}...${contractAddress.slice(-4)}`
  }, [contractAddress])

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy address:", error)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isValidEmail(email)) {
      setStatus("Enter a valid email to join the waitlist.")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source: "community-cta",
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setStatus(data.error || "Failed to join the waitlist.")
        return
      }

      if (typeof data.count === "number") {
        setWaitlistCount(data.count)
      }

      setStatus(
        data.duplicate
          ? "This email is already on the waitlist."
          : "You have been added to the waitlist."
      )
      setEmail("")
    } catch (error) {
      console.error("Failed to submit waitlist form:", error)
      setStatus("Network error while submitting the waitlist form.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="community" className="bg-background py-14 md:py-18">
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-[2rem] border border-border bg-card p-6 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <div className="text-caption text-primary">Community CTA</div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">Turn attention into participation</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                The last mile of the MVP is practical: make the contract visible, keep wallet access one click away,
                and give visitors a clear next action even before the full launch stack is online.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={copyAddress}
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-3 text-sm transition-colors hover:bg-secondary"
                >
                  <span className="font-mono">{shortAddress}</span>
                  {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
                </button>
                <a
                  href="#overview"
                  className="inline-flex items-center rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Review the Thesis
                </a>
              </div>
              <div className="mt-6 rounded-2xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
                {waitlistCount === null
                  ? "Waitlist sync is loading."
                  : `${waitlistCount} waitlist ${waitlistCount === 1 ? "entry" : "entries"} recorded through the MVP API.`}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-background p-5">
              <div className="text-caption text-muted-foreground">Waitlist capture</div>
              <label htmlFor="waitlist-email" className="mt-4 block text-sm font-medium">
                Email address
              </label>
              <input
                id="waitlist-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="founder@project.com"
                className="mt-2 h-12 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none transition-colors focus:border-primary"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 inline-flex h-12 items-center justify-center rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {isSubmitting ? "Submitting..." : "Join the Waitlist"}
              </button>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {status || "The form is now wired to a local API route so the MVP has a real submission loop."}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
