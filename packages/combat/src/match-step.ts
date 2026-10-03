import{stepMatch,type FighterInput,type FighterState,type MatchState}from"@forged-fighter/core";import{advanceAttack,resolveStandingLight,startLight}from"./runtime.js";
export function stepCombatMatch(state:MatchState,inputs:readonly[FighterInput,FighterInput]):MatchState{
 let base=stepMatch(state,inputs);let a=startLight(base.fighters[0],inputs[0]),b=startLight(base.fighters[1],inputs[1]);
 [a,b]=resolveStandingLight(a,b);[b,a]=resolveStandingLight(b,a);
 a=advanceAttack(a);b=advanceAttack(b);
 return{...base,fighters:[a,b] as readonly[FighterState,FighterState]};
}
