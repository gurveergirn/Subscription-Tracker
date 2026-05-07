import { useEffect, useState, useCallback } from "react"
import { useAuth } from "../lib/auth"
import {
  createSubscription,
  deleteSubscription,
  updateSubscription,
  watchSubscriptions,
} from "../lib/firestore"
import type { Subscription, SubscriptionInput } from "../types"

export function useSubscriptions() {
  const { user } = useAuth()
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setSubscriptions([])
      setLoading(false)
      return
    }
    setLoading(true)
    const unsub = watchSubscriptions(user.uid, (list) => {
      setSubscriptions(list)
      setLoading(false)
    })
    return unsub
  }, [user])

  const add = useCallback(
    (input: SubscriptionInput) => {
      if (!user) throw new Error("Not signed in")
      return createSubscription(user.uid, input)
    },
    [user],
  )

  const update = useCallback(
    (id: string, patch: Partial<SubscriptionInput>) => {
      if (!user) throw new Error("Not signed in")
      return updateSubscription(user.uid, id, patch)
    },
    [user],
  )

  const remove = useCallback(
    (id: string) => {
      if (!user) throw new Error("Not signed in")
      return deleteSubscription(user.uid, id)
    },
    [user],
  )

  return { subscriptions, loading, add, update, remove }
}
