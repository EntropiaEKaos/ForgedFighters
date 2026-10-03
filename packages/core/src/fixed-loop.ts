import { TICK_MS } from "./types.js";

export class FixedTickAccumulator {
  private accumulatorMs = 0;

  push(deltaMs: number): number {
    this.accumulatorMs += deltaMs;
    let ticks = 0;

    while (this.accumulatorMs >= TICK_MS) {
      this.accumulatorMs -= TICK_MS;
      ticks += 1;
    }

    return ticks;
  }

  get alpha(): number {
    return this.accumulatorMs / TICK_MS;
  }
}
