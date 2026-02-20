export class Counter {
  private count: number = 0
  private step: number

  constructor(step: number) {
    this.step = step
  }
  increment(): void {
    this.count += this.step
  }
  decrement(): void {
    this.count -= this.step
  }
  reset(): void {
    this.count = 0
  }
  getCount():number{
    return this.count
  }
}
