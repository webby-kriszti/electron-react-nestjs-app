export class IntervalCounter {
  private count = 0
  private intervalId?: ReturnType<typeof setInterval>

  start(): void {
    if (this.intervalId) return
    this.intervalId = setInterval(() => {
      this.count++
      console.log('counter', this.intervalId)
    }, 1000)
  }
  stop(): void {
    if (!this.intervalId) return
    clearInterval(this.intervalId)
    this.intervalId = undefined
  }
}
