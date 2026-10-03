import type { FighterInput, FighterState, MatchState, PlayerId } from "./types.js";

const MOVE_UNITS_PER_TICK = 12;

export function createInitialState(seed = 1): MatchState {
  return {
    frame: 0,
    seed: seed >>> 0,
    fighters: [
      createFighter(0, -120, 1),
      createFighter(1, 120, -1),
    ],
  };
}

function createFighter(playerId: PlayerId, x: number, facing: -1 | 1): FighterState {
  return {
    playerId,
    x,
    y: 0,
    vx: 0,
    vy: 0,
    facing,
    health: 10_000,
    meter: 0,
  };
}

export function stepMatch(
  state: MatchState,
  inputs: readonly [FighterInput, FighterInput],
): MatchState {
  const fighters = state.fighters.map((fighter, index) =>
    stepFighter(fighter, inputs[index as PlayerId]),
  ) as [FighterState, FighterState];

  const [a, b] = fighters;
  const nextA = { ...a, facing: a.x <= b.x ? 1 : -1 } as FighterState;
  const nextB = { ...b, facing: b.x >= a.x ? -1 : 1 } as FighterState;

  return {
    frame: state.frame + 1,
    seed: nextSeed(state.seed),
    fighters: [nextA, nextB],
  };
}

function stepFighter(fighter: FighterState, input: FighterInput): FighterState {
  const axis = Number(input.right) - Number(input.left);
  const vx = axis * MOVE_UNITS_PER_TICK;

  return {
    ...fighter,
    vx,
    x: fighter.x + vx,
  };
}

function nextSeed(seed: number): number {
  let x = seed >>> 0;
  x ^= x << 13;
  x ^= x >>> 17;
  x ^= x << 5;
  return x >>> 0;
}
