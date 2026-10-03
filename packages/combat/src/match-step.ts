import{stepMatch,tickHitstop,tickStun,type FighterInput,type FighterState,type MatchState}from"@forged-fighter/core";import{advanceAttack,resolveStandingLight,startLight}from"./runtime.js";
function guardInput(input:FighterInput,facing:-1|1):FighterInput{return{...input,left:facing===1?input.left:false,right:facing===-1?input.right:false};}
export function stepCombatMatch(state:MatchState,inputs:readonly[FighterInput,FighterInput]):MatchState{
 const guards=[guardInput(inputs[0],state.fighters[0].facing),guardInput(inputs[1],state.fighters[1].facing)] as const;
 const frozen=state.fighters.map(f=>f.hitstopFrames>0?tickHitstop(f):f) as [FighterState,FighterState];
 const simState={...state,fighters:frozen as readonly[FighterState,FighterState]};
 let base=stepMatch(simState,inputs),a=startLight(base.fighters[0],inputs[0]),b=startLight(base.fighters[1],inputs[1]);
 [a,b]=resolveStandingLight(a,b,guards[1]);[b,a]=resolveStandingLight(b,a,guards[0]);
 if(a.hitstopFrames===0&&(a.mode==="hitstun"||a.mode==="blockstun"))a=tickStun(a);
 if(b.hitstopFrames===0&&(b.mode==="hitstun"||b.mode==="blockstun"))b=tickStun(b);
 a=advanceAttack(a);b=advanceAttack(b);
 return{...base,fighters:[a,b] as readonly[FighterState,FighterState]};
}
