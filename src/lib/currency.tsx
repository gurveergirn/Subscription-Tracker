import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore"
import { db } from "./firebase"
import { useAuth } from "./auth"
import { formatMoney } from "./money"
import type { Currency } from "../types"

type Ctx = {
  currency: Currency
  setCurrency: (c: Currency) => Promise<void>
}

const CurrencyContext = createContext<Ctx | null>(null)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [currency, setCurrencyState] = useState<Currency>("USD")

  useEffect(() => {
    if (!user) {
      setCurrencyState("USD")
      return
    }
    return onSnapshot(doc(db, "users", user.uid), (snap) => {
      const data = snap.data()
      if (data?.currency) setCurrencyState(data.currency as Currency)
    })
  }, [user])

  const setCurrency = useCallback(
    async (c: Currency) => {
      setCurrencyState(c)
      if (!user) return
      await setDoc(
        doc(db, "users", user.uid),
        { currency: c, updatedAt: serverTimestamp() },
        { merge: true },
      )
    },
    [user],
  )

  const value = useMemo(() => ({ currency, setCurrency }), [currency, setCurrency])
  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext)
  if (!ctx) throw new Error("useCurrency must be used inside <CurrencyProvider>")
  return ctx
}

export function useMoney() {
  const { currency } = useCurrency()
  return useMemo(
    () => ({
      format: (usd: number) => formatMoney(usd, currency),
    }),
    [currency],
  )
}
