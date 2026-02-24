import { useCityStore } from './CityStore'

interface City {
  name: string
  position: [number, number]
  radii: number[]
}
let intervalId: ReturnType<typeof setInterval> | null = null
const cities: Record<string, City> = {
  Budapest: {
    name: 'Budapest',
    position: [19.040235, 47.497913],
    radii: [1000, 2000, 3000, 4000]
  },
  Debrecen: {
    name: 'Debrecen',
    position: [21.6273, 47.5316],
    radii: [500, 1500, 2500]
  }
}
export const cityService = {
  selectCity(cityName: string): void {
    const city = cities[cityName]
    if (!city) return
    const { actions } = useCityStore.getState()
    actions.setSelectedCity(city.name)
    actions.setMarkerPosition(city.position)
    actions.setCircleRadii(city.radii)
  },
  addRadii(radius: number): void {
    const { circleRadii, actions } = useCityStore.getState()
    actions.setCircleRadii([...circleRadii, radius])
  },
  startSimulation(): void {
    console.log('start')
    intervalId = setInterval(() => {
      const newwCoord = (Math.random() - 0.5) * 0.01
      const { actions, markerPosition } = useCityStore.getState()
      actions.setMarkerPosition([markerPosition[0] + newwCoord, markerPosition[1] + newwCoord])
    }, 1000)
  },
  stopSimulation(): void {
    console.log('stop')
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }
}
