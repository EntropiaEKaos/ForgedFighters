import { cloneState, type MatchState } from "@forged-fighter/core";

export class SnapshotRingBuffer {
  private readonly states = new Map<number, MatchState>();

  constructor(private readonly capacity = 240) {
    if (!Number.isInteger(capacity) || capacity < 2) throw new Error("capacity must be >= 2");
  }

  save(state: MatchState): void {
    this.states.set(state.frame, cloneState(state));
    while (this.states.size > this.capacity) {
      const oldest = Math.min(...this.states.keys());
      this.states.delete(oldest);
    }
  }

  restore(frame: number): MatchState | undefined {
    const state = this.states.get(frame);
    return state ? cloneState(state) : undefined;
  }

  has(frame: number): boolean {
    return this.states.has(frame);
  }
}
