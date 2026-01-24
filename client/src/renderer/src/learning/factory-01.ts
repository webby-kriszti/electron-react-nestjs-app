type Deps = {
  artilleryRange: number
  surveillanceRange: number
  formRange?: number
}

function createRangeSelector(mode: 'ARTILLERY' | 'SURVEILLANCE') {
  return function selectRange(deps: Deps): number {
    if (mode === 'ARTILLERY') return deps.artilleryRange
    return deps.formRange ?? deps.surveillanceRange
  }
}

// használat
const selectArtillery = createRangeSelector('ARTILLERY')
const selectSurveillance = createRangeSelector('SURVEILLANCE')

const deps1: Deps = { artilleryRange: 15000, surveillanceRange: 12000, formRange: 18000 }
const deps2: Deps = { artilleryRange: 15000, surveillanceRange: 12000 } // nincs formRange

console.log(selectArtillery(deps1))
console.log(selectSurveillance(deps1))
console.log(selectSurveillance(deps2))
