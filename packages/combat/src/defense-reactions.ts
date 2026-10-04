export type DefenseReactionKind="none"|"armor"|"parry"|"counter";
export interface DefenseReactionState{kind:DefenseReactionKind;frames:number;armorHits:number;lastResult?:Exclude<DefenseReactionKind,"none">;}
export const EMPTY_DEFENSE_REACTION:DefenseReactionState={kind:"none",frames:0,armorHits:0};
export function beginArmor(frames:number,hits=1):DefenseReactionState{return{kind:"armor",frames:Math.max(0,frames),armorHits:Math.max(0,hits)};}
export function beginParry(frames:number):DefenseReactionState{return{kind:"parry",frames:Math.max(0,frames),armorHits:0};}
export function beginCounter(frames:number):DefenseReactionState{return{kind:"counter",frames:Math.max(0,frames),armorHits:0};}
export function tickDefenseReaction(s:DefenseReactionState):DefenseReactionState{if(s.kind==="none"||s.frames<=1)return{kind:"none",frames:0,armorHits:0,lastResult:s.lastResult};return{...s,frames:s.frames-1};}
export function absorbArmorHit(s:DefenseReactionState):DefenseReactionState{return s.kind==="armor"&&s.armorHits>0?{kind:s.armorHits===1?"none":"armor",frames:s.armorHits===1?0:s.frames,armorHits:Math.max(0,s.armorHits-1),lastResult:"armor"}:s;}
export function resolveParry(s:DefenseReactionState):DefenseReactionState{return s.kind==="parry"?{kind:"none",frames:0,armorHits:0,lastResult:"parry"}:s;}
export function resolveCounter(s:DefenseReactionState):DefenseReactionState{return s.kind==="counter"?{kind:"none",frames:0,armorHits:0,lastResult:"counter"}:s;}
