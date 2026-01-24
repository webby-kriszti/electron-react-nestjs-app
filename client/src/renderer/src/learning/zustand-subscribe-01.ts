import { rangeStore, Deps2 } from '../store/range.store'

// 1) function -> function (selector gyár)
const createOverrideSelector = (id: string): ((deps: Deps2) => number) => {
  return (deps: Deps2): number => {
    return deps.overridesById[id] ?? deps.defaultRange
  }
}

// 2) Elkészítjük a "konfigurált" függvényt
const selectXFromDeps = createOverrideSelector('X')

// 3) Zustand selector: a teljes state-ből kiveszünk egy értéket (number)
const zustandSelector = (state: { deps: Deps2 }): number => {
  return selectXFromDeps(state.deps)
}

// 4) Feliratkozás: ha a zustandSelector eredménye változik, lefut a listener
const unsubscribe = rangeStore.subscribe(zustandSelector, (next, prev) => {
  console.log('X range changed:', { prev, next })
})

// 5) Teszt: állítsunk be adatot a store-ba
rangeStore.getState().setDeps({
  defaultRange: 5000,
  overridesById: { X: 9000 }
})

// 6) Teszt: állítsunk be más adatot, ami NEM befolyásolja X-et
rangeStore.getState().setDeps({
  defaultRange: 5000,
  overridesById: { Y: 1111 }
})

// 7) Teszt: X-et megint átállítjuk
rangeStore.getState().setDeps({
  defaultRange: 5000,
  overridesById: { X: 7000 }
})

// 8) Leiratkozás
unsubscribe()
