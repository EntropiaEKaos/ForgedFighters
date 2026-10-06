import { describe, expect, it } from "vitest";
import { createInitialState } from "@forged-fighter/core";
import { neutralInput, RollbackSession } from "./index.js";

describe("rollback foundations", () => {
  it("restores and resimulates to the same deterministic hash", () => {
    const session = new RollbackSession(createInitialState(1234));
    for (let frame = 0; frame < 120; frame += 1) {
      session.setInput(frame, 0, {...neutralInput(), right: frame < 60});
      session.setInput(frame, 1, {...neutralInput(), left: frame >= 30 && frame < 90});
      session.advance();
    }
    const expected = session.hash;
    session.rollbackAndResimulate(40, 120);
    expect(session.hash).toBe(expected);
    expect(session.currentState.frame).toBe(120);
  });

  it("changes history after a late input and deterministically resimulates", () => {
    const session = new RollbackSession(createInitialState(99));
    for (let frame = 0; frame < 90; frame += 1) session.advance();
    const before = session.hash;
    session.setInput(20, 1, {...neutralInput(), left:true});
    session.rollbackAndResimulate(20, 90);
    expect(session.hash).not.toBe(before);
    const firstCorrection = session.hash;
    session.rollbackAndResimulate(20, 90);
    expect(session.hash).toBe(firstCorrection);
  });
});
