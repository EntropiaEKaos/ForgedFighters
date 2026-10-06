import type{FighterState}from"@forged-fighter/core";import{applyJuggle,canJuggle,type JuggleState}from"./air-combat.js";import{addComboHit,scaledDamage,type ComboState}from"./combo.js";import{JUGGLE_LIGHT}from"./moves.js";import{resolveJuggleLight}from"./runtime.js";
export interface JuggleLightResolution{attacker:FighterState;defender:FighterState;juggle:JuggleState;combo:ComboState;didDamage:boolean;}
export function resolveJuggleLightContact(attacker:FighterState,defender:FighterState,juggle:JuggleState,combo:ComboState,frame:number):JuggleLightResolution{
 if(!canJuggle(juggle,1))return{attacker,defender,juggle,combo,didDamage:false};
 const hp=defender.health;const[nextAttacker,nextDefender]=resolveJuggleLight(attacker,defender,scaledDamage(JUGGLE_LIGHT.damage,combo.hits));if(nextDefender.health>=hp)return{attacker:nextAttacker,defender:nextDefender,juggle,combo,didDamage:false};
 return{attacker:nextAttacker,defender:nextDefender,juggle:applyJuggle(juggle,1),combo:addComboHit(combo,JUGGLE_LIGHT.damage,frame).combo,didDamage:true};
}
