import type{FighterState}from"@forged-fighter/core";import{applyJuggle,canJuggle,type JuggleState}from"./air-combat.js";import{addComboHit,type ComboState}from"./combo.js";import{AIR_JUGGLE_LIGHT}from"./moves.js";import{resolveAirJuggleLight}from"./runtime.js";
export interface AirJuggleLightResolution{attacker:FighterState;defender:FighterState;juggle:JuggleState;combo:ComboState;didDamage:boolean;}
export function resolveAirJuggleLightContact(attacker:FighterState,defender:FighterState,juggle:JuggleState,combo:ComboState,frame:number):AirJuggleLightResolution{
 if(!canJuggle(juggle,1))return{attacker,defender,juggle,combo,didDamage:false};
 const hp=defender.health;const[nextAttacker,nextDefender]=resolveAirJuggleLight(attacker,defender);if(nextDefender.health>=hp)return{attacker:nextAttacker,defender:nextDefender,juggle,combo,didDamage:false};
 return{attacker:nextAttacker,defender:nextDefender,juggle:applyJuggle(juggle,1),combo:addComboHit(combo,AIR_JUGGLE_LIGHT.damage,frame).combo,didDamage:true};
}
