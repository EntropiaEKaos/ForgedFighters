import type{FighterInput,FighterState}from"@forged-fighter/core";import{applyJuggle,canJuggle,type JuggleState}from"./air-combat.js";import{addComboHit,type ComboState}from"./combo.js";import{absorbArmorHit,armorDamage,hasArmor,type DefenseReactionState}from"./defense-reactions.js";import{STANDING_HEAVY_LAUNCHER}from"./moves.js";import{resolveHeavyLauncher}from"./runtime.js";
export interface HeavyLauncherResolution{attacker:FighterState;defender:FighterState;juggle:JuggleState;combo:ComboState;defenseReaction:DefenseReactionState;didDamage:boolean;absorbedArmor:boolean;}
export function resolveHeavyLauncherContact(attacker:FighterState,defender:FighterState,defenderInput:FighterInput,juggle:JuggleState,combo:ComboState,defenseReaction:DefenseReactionState,frame:number):HeavyLauncherResolution{
 if(!canJuggle(juggle,2))return{attacker,defender,juggle,combo,defenseReaction,didDamage:false,absorbedArmor:false};
 const hp=defender.health,armored=hasArmor(defenseReaction);const[nextAttacker,nextDefender]=resolveHeavyLauncher(attacker,defender,defenderInput,armorDamage(defenseReaction,STANDING_HEAVY_LAUNCHER.damage));
 if(armored&&nextAttacker.attack?.contact==="hit")return{attacker:nextAttacker,defender:{...defender,hitstopFrames:nextDefender.hitstopFrames},juggle,combo,defenseReaction:absorbArmorHit(defenseReaction),didDamage:false,absorbedArmor:true};
 if(nextDefender.health<hp)return{attacker:nextAttacker,defender:nextDefender,juggle:applyJuggle(juggle,2),combo:addComboHit(combo,STANDING_HEAVY_LAUNCHER.damage,frame).combo,defenseReaction,didDamage:true,absorbedArmor:false};
 return{attacker:nextAttacker,defender:nextDefender,juggle,combo,defenseReaction,didDamage:false,absorbedArmor:false};
}
