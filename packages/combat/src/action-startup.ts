import type{FighterInput,FighterState}from"@forged-fighter/core";import type{ResolvedCombatCommand}from"./command-resolver.js";import{resolveMeleeStarter}from"./move-execution.js";import{beginThrow,type ThrowAttempt}from"./throws.js";import{tryStartSuper}from"./runtime.js";
export interface ActionStartupResolution{fighters:readonly[FighterState,FighterState];throws:readonly[ThrowAttempt|null,ThrowAttempt|null];}
export function resolveActionStartup(fighters:readonly[FighterState,FighterState],commands:readonly[ResolvedCombatCommand,ResolvedCombatCommand],lockedInputs:readonly[FighterInput,FighterInput],actionInputs:readonly[FighterInput,FighterInput],throws:readonly[ThrowAttempt|null,ThrowAttempt|null]):ActionStartupResolution{
 let a=tryStartSuper(fighters[0],lockedInputs[0]),b=tryStartSuper(fighters[1],lockedInputs[1]);
 if(commands[0].owner!=="super")a=resolveMeleeStarter(a,actionInputs[0]);if(commands[1].owner!=="super")b=resolveMeleeStarter(b,actionInputs[1]);
 const nextThrows=[throws[0],throws[1]] as [ThrowAttempt|null,ThrowAttempt|null];
 if(commands[0].owner==="throw"&&!nextThrows[0]&&a.mode==="idle")nextThrows[0]=beginThrow();
 if(commands[1].owner==="throw"&&!nextThrows[1]&&b.mode==="idle")nextThrows[1]=beginThrow();
 return{fighters:[a,b],throws:nextThrows};
}
