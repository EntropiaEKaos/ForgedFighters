import { describe, expect, it } from "vitest";
import { createInitialState, stepMatch } from "./simulation.js";
import { hashState } from "./snapshot.js";
import type { FighterInput, MatchState } from "./types.js";

const neutral: FighterInput = {
  left: false,
  right: false,
  up: false,
  down: false,
  light: false,
  medium: false,
  heavy: false,
  special: false,
  throw: false,
};

function runScript(): MatchState {
  let state = createInitialState(0xC0FFEE);

  for (let frame = 0; frame < 600; frame += 1) {
    state = stepMatch(state, [
      { ...neutral, right: frame < 120 },
      { ...neutral, left: frame >= 60 && frame < 180 },
    ]);
  }

  return state;
}

describe("deterministic simulation", () => {
  it("produces the same final hash for the same initial state and inputs", () => {
    const a = runScript();
    const b = runScript();

    expect(a).toEqual(b);
    expect(hashState(a)).toBe(hashState(b));
    expect(a.frame).toBe(600);
  });
});
