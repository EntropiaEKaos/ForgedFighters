import type { FighterState } from "./types.js";

export interface StageBounds {
  left: number;
  right: number;
}

export const DEFAULT_STAGE: StageBounds = { left: -960, right: 960 };
export const PUSHBOX_HALF_WIDTH = 36;

export function clampToStage(f: FighterState, stage: StageBounds): FighterState {
  const x=Math.max(stage.left+PUSHBOX_HALF_WIDTH,Math.min(stage.right-PUSHBOX_HALF_WIDTH,f.x));
  return x===f.x?f:{...f,x};
}

export function resolvePushboxes(a:FighterState,b:FighterState):[FighterState,FighterState]{
  if(!a.grounded||!b.grounded) return [a,b];
  const min=PUSHBOX_HALF_WIDTH*2;
  const delta=b.x-a.x;
  if(Math.abs(delta)>=min) return [a,b];
  const direction=delta>=0?1:-1;
  const overlap=min-Math.abs(delta);
  const leftShift=Math.floor(overlap/2);
  const rightShift=overlap-leftShift;
  return [
    {...a,x:a.x-direction*leftShift},
    {...b,x:b.x+direction*rightShift},
  ];
}
