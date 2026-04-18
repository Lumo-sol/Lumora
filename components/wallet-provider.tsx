"use client"

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"

interface WalletContextType {
  connected: boolean
  publicKey: string | null
  walletName: string | null
  connect: (walletType: "phantom" | "solflare") => Promise<void>
  disconnect: () => void
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

interface PhantomWallet {
  isPhantom?: boolean
  isConnected?: boolean
  publicKey?: { toString: () => string }
  connect: () => Promise<{ publicKey: { toString: () => string } }>
  disconnect: () => Promise<void>
  on: (event: string, callback: () => void) => void
}

interface SolflareWallet {
  isSolflare?: boolean
  isConnected?: boolean
  publicKey?: { toString: () => string }
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  on: (event: string, callback: () => void) => void
}

interface WindowWithWallets extends Window {
  solana?: PhantomWallet
  solflare?: SolflareWallet
}

interface Props {
  children: ReactNode
}

export function SolanaWalletProvider({ children }: Props) {
  const [connected, setConnected] = useState(false)
  const [publicKey, setPublicKey] = useState<string | null>(null)
  const [walletName, setWalletName] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = useCallback(() => setIsModalOpen(true), [])
  const closeModal = useCallback(() => setIsModalOpen(false), [])

  const connect = useCallback(
    async (walletType: "phantom" | "solflare") => {
      try {
        const win = window as unknown as WindowWithWallets

        if (walletType === "phantom") {
          const phantom = win.solana

          if (phantom?.isPhantom) {
            const response = await phantom.connect()
            const nextPublicKey = response.publicKey.toString()
            setPublicKey(nextPublicKey)
            setConnected(true)
            setWalletName("Phantom")
            closeModal()

            phantom.on("disconnect", () => {
              setConnected(false)
              setPublicKey(null)
              setWalletName(null)
            })
          } else {
            window.open("https://phantom.app/", "_blank")
          }
        }

        if (walletType === "solflare") {
          const solflare = win.solflare

          if (solflare?.isSolflare) {
            await solflare.connect()
            if (solflare.publicKey) {
              const nextPublicKey = solflare.publicKey.toString()
              setPublicKey(nextPublicKey)
              setConnected(true)
              setWalletName("Solflare")
              closeModal()

              solflare.on("disconnect", () => {
                setConnected(false)
                setPublicKey(null)
                setWalletName(null)
              })
            }
          } else {
            window.open("https://solflare.com/", "_blank")
          }
        }
      } catch (error) {
        console.error("Failed to connect wallet:", error)
      }
    },
    [closeModal]
  )

  const disconnect = useCallback(async () => {
    try {
      const win = window as unknown as WindowWithWallets

      if (walletName === "Phantom" && win.solana) {
        await win.solana.disconnect()
      } else if (walletName === "Solflare" && win.solflare) {
        await win.solflare.disconnect()
      }
    } catch (error) {
      console.error("Failed to disconnect:", error)
    }

    setConnected(false)
    setPublicKey(null)
    setWalletName(null)
  }, [walletName])

  useEffect(() => {
    const checkConnection = () => {
      const win = window as unknown as WindowWithWallets

      const phantom = win.solana
      if (phantom?.isPhantom && phantom.isConnected && phantom.publicKey) {
        setConnected(true)
        setPublicKey(phantom.publicKey.toString())
        setWalletName("Phantom")
        return
      }

      const solflare = win.solflare
      if (solflare?.isSolflare && solflare.isConnected && solflare.publicKey) {
        setConnected(true)
        setPublicKey(solflare.publicKey.toString())
        setWalletName("Solflare")
      }
    }

    const timer = window.setTimeout(checkConnection, 500)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <WalletContext.Provider
      value={{
        connected,
        publicKey,
        walletName,
        connect,
        disconnect,
        isModalOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
      {isModalOpen && <WalletModal />}
    </WalletContext.Provider>
  )
}

function WalletModal() {
  const { connect, closeModal } = useWallet()
  const [isConnecting, setIsConnecting] = useState<string | null>(null)

  const handleConnect = async (walletType: "phantom" | "solflare") => {
    setIsConnecting(walletType)
    await connect(walletType)
    setIsConnecting(null)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Connect Wallet</h2>
          <button
            onClick={closeModal}
            className="rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-2">
          <button
            onClick={() => handleConnect("phantom")}
            disabled={isConnecting !== null}
            className="flex w-full items-center gap-3 rounded-lg bg-secondary/30 px-4 py-3 transition-colors hover:bg-secondary disabled:opacity-50"
          >
            <img src="/wallets/phantom.jpg" alt="Phantom" className="h-6 w-6 rounded object-cover" />
            <span className="text-sm font-medium text-foreground">
              {isConnecting === "phantom" ? "Connecting..." : "Phantom"}
            </span>
          </button>
          <button
            onClick={() => handleConnect("solflare")}
            disabled={isConnecting !== null}
            className="flex w-full items-center gap-3 rounded-lg bg-secondary/30 px-4 py-3 transition-colors hover:bg-secondary disabled:opacity-50"
          >
            <img src="/wallets/solflare.jpg" alt="Solflare" className="h-6 w-6 rounded object-cover" />
            <span className="text-sm font-medium text-foreground">
              {isConnecting === "solflare" ? "Connecting..." : "Solflare"}
            </span>
          </button>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          By connecting, you confirm you understand the wallet prompt and network fees.
        </p>
      </div>
    </div>
  )
}
