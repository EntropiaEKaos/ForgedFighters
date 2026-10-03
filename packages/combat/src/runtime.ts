import type { FighterInput,FighterState } from "@forged-fighter/core";
import { applyBlock,applyHit,applyHitstop,beginAttack } from "@forged-fighter/core";
import { attackPhase } from "./frame-data.js";import { detectHit } from "./hit-detection.js";import { toWorldBox } from "./boxes.js";import { STANDING_LIGHT } from "./moves.js";
export function startLight(f:FighterState,input:FighterInput):FighterState{return input.light&&f.mode==="idle"?beginAttack(f,STANDING_LIGHT.id):f;}
export function isBlocking(defender:FighterState,input:FighterInput):boolean{return defender.grounded&&(defender.facing===1?input.left:input.right);}
export function resolveStandingLight(attacker:FighterState,defender:FighterState,defenderInput?:FighterInput):readonly[FighterState,FighterState]{
 const a=attacker.attack;if(!a||a.moveId!==STANDING_LIGHT.id||attackPhase(STANDING_LIGHT,a.frame)!=="active"||a.hasHit)return[attacker,defender];
 const hit=toWorldBox(STANDING_LIGHT.hitbox,attacker.playerId,attacker.x,attacker.y,attacker.facing),hurt=toWorldBox(STANDING_LIGHT.hurtbox,defender.playerId,defender.x,defender.y,defender.facing);
 if(!detectHit(hit,[hurt]))return[attacker,defender];
 const connected={...attacker,attack:{...a,hasHit:true}};
 const stopped=applyHitstop(connected,STANDING_LIGHT.hitstop);
 return isBlocking(defender,defenderInput??({} as FighterInput))?[stopped,applyBlock(defender,STANDING_LIGHT.blockstun,STANDING_LIGHT.hitstop)]:[stopped,applyHit(defender,STANDING_LIGHT.damage,STANDING_LIGHT.hitstun,STANDING_LIGHT.hitstop)];
}
export function advanceAttack(f:FighterState):FighterState{const a=f.attack;if(!a||f.hitstopFrames>0)return f;const next=a.frame+1;if(attackPhase(STANDING_LIGHT,next)==="complete"){const{attack:_attack,...rest}=f;return{...rest,mode:f.grounded?"idle":"fall"};}return{...f,attack:{...a,frame:next}};}
