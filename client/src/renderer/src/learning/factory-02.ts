const createThresholdChecker = (threshold: number): ((value: number) => boolean) => {
  return (value: number): boolean => {
    return value >= threshold
  }
}
const isHighTemp = createThresholdChecker(30)
const isCriticalTemp = createThresholdChecker(80)

console.log(isHighTemp(25)) // ?
console.log(isHighTemp(30)) // ?
console.log(isCriticalTemp(79)) // ?
console.log(isCriticalTemp(80))

/* type Deps = {
  artilleryRange: number
  surveillanceRange: number
  formRange?: number
} */

/* const createRangeSelector = (mode: 'ARTILLERY' | 'SURVEILLANCE'): ((deps: Deps) => number) => {
  return (deps: Deps): number => {
    if (mode === 'ARTILLERY') {
      return deps.artilleryRange
    } else return deps.formRange ?? deps.surveillanceRange
  }
} */
/* type SensorRangeDeps = {
  surveillanceRangeValue: number
  formRangesBySensorId: Record<string, number | undefined>
} */

/* const createSensorRangeSelector = (sensorId: string): ((deps: SensorRangeDeps) => number) => {
  return (deps: SensorRangeDeps): number => {
    const formValue = deps.formRangesBySensorId[sensorId]
    return formValue ?? deps.surveillanceRangeValue
  }
} */
type Deps2 = {
  defaultRange: number
  overridesById: Record<string, number | undefined>
}
const createOverrideSelector = (id: string): ((deps: Deps2) => number) => {
  return (deps: Deps2) => deps.overridesById[id] ?? deps.defaultRange
}
const cat = createOverrideSelector('2')
cat({ defaultRange: 21, overridesById: { '3': 1000 } })
