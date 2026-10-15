export type DefenseReactionKind="none"|"armor"|"parry";
export interface DefenseReactionState{kind:DefenseReactionKind;frames:number;armorHits:number;lastResult?:Exclude<DefenseReactionKind,"none">;}
export const EMPTY_DEFENSE_REACTION:DefenseReactionState={kind:"none",frames:0,armorHits:0};
export function beginArmor(frames:number,hits=1):DefenseReactionState{return{kind:"armor",frames:Math.max(0,frames),armorHits:Math.max(0,hits)};}
export function beginParry(frames:number):DefenseReactionState{return{kind:"parry",frames:Math.max(0,frames),armorHits:0};}
export function tickDefenseReaction(s:DefenseReactionState):DefenseReactionState{if(s.kind==="none")return s;if(s.frames<=1)return s.lastResult?{kind:"none",frames:0,armorHits:0,lastResult:s.lastResult}:{kind:"none",frames:0,armorHits:0};return{...s,frames:s.frames-1};}
export function absorbArmorHit(s:DefenseReactionState):DefenseReactionState{return s.kind==="armor"&&s.armorHits>0?{kind:s.armorHits===1?"none":"armor",frames:s.armorHits===1?0:s.frames,armorHits:Math.max(0,s.armorHits-1),lastResult:"armor"}:s;}
export function resolveParry(s:DefenseReactionState):DefenseReactionState{return s.kind==="parry"?{kind:"none",frames:0,armorHits:0,lastResult:"parry"}:s;}

export function hasArmor(s:DefenseReactionState):boolean{return s.kind==="armor"&&s.armorHits>0;}
export function armorDamage(s:DefenseReactionState,damage:number):number{return hasArmor(s)?0:damage;}

export function isCounterHitTarget(mode:string):boolean{return mode==="attack";}
