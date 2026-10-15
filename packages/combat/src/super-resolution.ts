import type{FighterInput,FighterState}from"@forged-fighter/core";import{resolveBasicSuper}from"./runtime.js";
export interface SuperResolution{attacker:FighterState;defender:FighterState;didDamage:boolean;}
export function resolveSuperContact(attacker:FighterState,defender:FighterState,defenderInput:FighterInput):SuperResolution{
 const hp=defender.health;const[nextAttacker,nextDefender]=resolveBasicSuper(attacker,defender,defenderInput);return{attacker:nextAttacker,defender:nextDefender,didDamage:nextDefender.health<hp};
}
