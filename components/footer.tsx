import Image from "next/image"
import Link from "next/link"

const footerLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Metrics", href: "#metrics" },
  { label: "Utility", href: "#utility" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "FAQ", href: "#faq" },
  { label: "Docs", href: "#docs" },
  { label: "Community", href: "#community" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <Image src="/logo.jpg" alt="Lumora" width={24} height={24} className="rounded-md" />
              <span className="font-semibold">Lumora</span>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
              A SOL-focused landing page MVP built to explain the token thesis, highlight utility,
              and turn traffic into community participation.
            </p>
            <p className="mt-3 text-xs leading-5 text-muted-foreground">
              This interface is a product MVP and not investment advice. Verify all contract,
              token, and launch details before interacting with any wallet.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-md border border-border px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Lumora. Built for the SOL ecosystem.</span>
          <span className="font-mono">mvp.sol.v1</span>
        </div>
      </div>
    </footer>
  )
}
