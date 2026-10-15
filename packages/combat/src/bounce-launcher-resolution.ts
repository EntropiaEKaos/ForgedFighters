import type{FighterInput,FighterState}from"@forged-fighter/core";import{applyJuggle,canJuggle,type JuggleState}from"./air-combat.js";import{addComboHit,type ComboState}from"./combo.js";import{BOUNCE_LAUNCHER}from"./moves.js";import{resolveBounceLauncher}from"./runtime.js";
export interface BounceEntitlement{wall:boolean;ground:boolean;}
export interface BounceLauncherResolution{attacker:FighterState;defender:FighterState;juggle:JuggleState;combo:ComboState;entitlement:BounceEntitlement;didDamage:boolean;}
export function resolveBounceLauncherContact(attacker:FighterState,defender:FighterState,defenderInput:FighterInput,juggle:JuggleState,combo:ComboState,currentEntitlement:BounceEntitlement,frame:number):BounceLauncherResolution{
 if(!canJuggle(juggle,2))return{attacker,defender,juggle,combo,entitlement:currentEntitlement,didDamage:false};
 const hp=defender.health;const[nextAttacker,nextDefender]=resolveBounceLauncher(attacker,defender,defenderInput);if(nextDefender.health>=hp)return{attacker:nextAttacker,defender:nextDefender,juggle,combo,entitlement:currentEntitlement,didDamage:false};
 return{attacker:nextAttacker,defender:nextDefender,juggle:applyJuggle(juggle,2),combo:addComboHit(combo,BOUNCE_LAUNCHER.damage,frame).combo,entitlement:{wall:!!BOUNCE_LAUNCHER.bounce?.wall,ground:!!BOUNCE_LAUNCHER.bounce?.ground},didDamage:true};
}
