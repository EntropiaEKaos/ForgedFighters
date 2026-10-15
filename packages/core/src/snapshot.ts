import type { MatchState } from "./types.js";

export function serializeState(state: MatchState): string {
  return JSON.stringify(state);
}

export function cloneState(state: MatchState): MatchState {
  return JSON.parse(serializeState(state)) as MatchState;
}

export function hashState(state: MatchState): string {
  const input = serializeState(state);
  let hash = 0x811c9dc5;

  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }

  return hash.toString(16).padStart(8, "0");
}
