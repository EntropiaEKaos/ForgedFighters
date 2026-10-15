import type { FighterInput, PlayerId } from "@forged-fighter/core";

export interface FrameInputs {
  frame: number;
  inputs: readonly [FighterInput, FighterInput];
}

export class InputHistory {
  private readonly frames = new Map<number, [FighterInput, FighterInput]>();
  private readonly facings = new Map<number, [(-1|1)|undefined, (-1|1)|undefined]>();

  set(frame: number, player: PlayerId, input: FighterInput): void {
    const current = this.frames.get(frame) ?? [neutralInput(), neutralInput()];
    current[player] = { ...input };
    this.frames.set(frame, current);
  }

  setFacing(frame: number, player: PlayerId, facing: -1|1): void {
    const current = this.facings.get(frame) ?? [undefined, undefined];
    current[player] = facing;
    this.facings.set(frame, current);
  }

  getFacing(frame: number, player: PlayerId): -1|1|undefined { return this.facings.get(frame)?.[player]; }

  get(frame: number): readonly [FighterInput, FighterInput] {
    const value = this.frames.get(frame);
    return value ? [{ ...value[0] }, { ...value[1] }] : [neutralInput(), neutralInput()];
  }

  pruneBefore(frame: number): void {
    for (const key of this.frames.keys()) if (key < frame) this.frames.delete(key);
    for (const key of this.facings.keys()) if (key < frame) this.facings.delete(key);
  }
}

export function neutralInput(): FighterInput {
  return {left:false,right:false,up:false,down:false,light:false,medium:false,heavy:false,special:false,throw:false};
}
