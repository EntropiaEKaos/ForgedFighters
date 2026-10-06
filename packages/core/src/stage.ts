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

export function resolveStagePushboxes(a:FighterState,b:FighterState,stage:StageBounds=DEFAULT_STAGE):[FighterState,FighterState]{
 let left=clampToStage(a,stage),right=clampToStage(b,stage);
 if(!left.grounded||!right.grounded)return[left,right];
 const min=PUSHBOX_HALF_WIDTH*2,delta=right.x-left.x;if(Math.abs(delta)>=min)return[left,right];
 const direction=delta>=0?1:-1;
 if(direction<0){const solved=resolveStagePushboxes(right,left,stage);return[solved[1],solved[0]];}
 const overlap=min-(right.x-left.x),leftRoom=left.x-(stage.left+PUSHBOX_HALF_WIDTH),rightRoom=(stage.right-PUSHBOX_HALF_WIDTH)-right.x;
 const moveLeft=Math.min(Math.floor(overlap/2),leftRoom),moveRight=Math.min(overlap-moveLeft,rightRoom),remaining=overlap-moveLeft-moveRight;
 const extraLeft=Math.min(remaining,leftRoom-moveLeft),extraRight=Math.min(remaining-extraLeft,rightRoom-moveRight);
 left={...left,x:left.x-moveLeft-extraLeft};right={...right,x:right.x+moveRight+extraRight};
 return[left,right];
}
