import type { FighterInput,FighterState } from "@forged-fighter/core";
import { applyHit,beginAttack } from "@forged-fighter/core";
import { attackPhase } from "./frame-data.js";
import { detectHit } from "./hit-detection.js";
import { toWorldBox } from "./boxes.js";
import { STANDING_LIGHT } from "./moves.js";
export function startLight(f:FighterState,input:FighterInput):FighterState{return input.light&&f.mode==="idle"?beginAttack(f,STANDING_LIGHT.id):f;}
export function resolveStandingLight(attacker:FighterState,defender:FighterState):readonly[FighterState,FighterState]{
 const a=attacker.attack;if(!a||a.moveId!==STANDING_LIGHT.id)return[attacker,defender];
 if(attackPhase(STANDING_LIGHT,a.frame)!=="active"||a.hasHit)return[attacker,{...defender}];
 const hit=toWorldBox(STANDING_LIGHT.hitbox,attacker.playerId,attacker.x,attacker.y,attacker.facing);
 const hurt=toWorldBox(STANDING_LIGHT.hurtbox,defender.playerId,defender.x,defender.y,defender.facing);
 if(!detectHit(hit,[hurt]))return[attacker,defender];
 return[{...attacker,attack:{...a,hasHit:true}},applyHit(defender,STANDING_LIGHT.damage,STANDING_LIGHT.hitstun)];
}
export function advanceAttack(f:FighterState):FighterState{
 const a=f.attack;if(!a)return f;const next=a.frame+1;
 if(attackPhase(STANDING_LIGHT,next)==="complete"){const{attack:_attack,...rest}=f;return{...rest,mode:f.grounded?"idle":"fall"};}
 return{...f,attack:{...a,frame:next}};
}
