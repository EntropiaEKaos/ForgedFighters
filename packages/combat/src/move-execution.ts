import type{FighterInput,FighterState}from"@forged-fighter/core";import{startAirJuggleLight,startBounceLauncher,startHeavyLauncher,startLight}from"./runtime.js";import{selectMeleeStarter,type MeleeStarter}from"./move-selection.js";
export function executeMeleeStarter(fighter:FighterState,input:FighterInput,starter:MeleeStarter):FighterState{
 return starter==="bounce"?startBounceLauncher(fighter,input):starter==="air-light"?startAirJuggleLight(fighter,input):starter==="heavy"?startHeavyLauncher(fighter,input):starter==="light"?startLight(fighter,input):fighter;
}

export function resolveMeleeStarter(fighter:FighterState,input:FighterInput):FighterState{return executeMeleeStarter(fighter,input,selectMeleeStarter(fighter,input));}
