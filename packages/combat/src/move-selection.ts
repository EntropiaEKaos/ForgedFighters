import type{FighterInput,FighterState}from"@forged-fighter/core";
export type MeleeStarter="none"|"light"|"heavy"|"air-light"|"bounce";
export function selectMeleeStarter(fighter:FighterState,input:FighterInput):MeleeStarter{
 if(fighter.mode!=="idle"&&!(input.light&&!fighter.grounded&&(fighter.mode==="jump"||fighter.mode==="fall")))return"none";
 if(input.special&&fighter.mode==="idle")return"bounce";
 if(input.light&&!fighter.grounded&&(fighter.mode==="jump"||fighter.mode==="fall"||fighter.mode==="idle"))return"air-light";
 if(input.heavy&&fighter.mode==="idle")return"heavy";
 if(input.light&&fighter.mode==="idle")return"light";
 return"none";
}
