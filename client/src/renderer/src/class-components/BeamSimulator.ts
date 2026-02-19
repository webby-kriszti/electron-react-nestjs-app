export class BeamSimulatortsts {
  private intervalId?: ReturnType<typeof setInterval>
  private counter: number = 0

  start(): void {
    if (this.intervalId) return
    this.intervalId = setInterval(() => {
      this.step()
    }, 30000)
  }
  step(): void {
    this.counter++
  }
  stop(): void {
    if (!this.intervalId) return
    clearInterval(this.intervalId)
    this.intervalId = undefined
  }
}
