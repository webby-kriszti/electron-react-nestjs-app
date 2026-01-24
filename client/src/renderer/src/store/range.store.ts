import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export type Deps2 = {
  defaultRange: number
  overridesById: Record<string, number | undefined>
}

type RangeState = {
  deps: Deps2
  setDeps: (deps: Deps2) => void
}

export const rangeStore = create<RangeState>()(
  subscribeWithSelector((set) => ({
    deps: { defaultRange: 5000, overridesById: {} },
    setDeps: (deps) => set({ deps })
  }))
)
