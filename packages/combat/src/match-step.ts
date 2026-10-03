import{stepMatch,tickHitstop,tickStun,type FighterInput,type FighterState,type MatchState}from"@forged-fighter/core";import{advanceAttack,resolveStandingLight,startLight}from"./runtime.js";import{addComboHit,resetComboIfExpired,scaledDamage}from"./combo.js";import{asCombatMatchState,type CombatMatchState}from"./combat-match.js";import{STANDING_LIGHT}from"./moves.js";
function guardInput(input:FighterInput,facing:-1|1):FighterInput{return{...input,left:facing===1?input.left:false,right:facing===-1?input.right:false};}
function holdsBack(input:FighterInput,facing:-1|1):boolean{return facing===1?input.left:input.right;}
function movementInput(input:FighterInput,f:FighterState,opponent:FighterState):FighterInput{const threatening=opponent.mode==="attack"&&Math.abs(opponent.x-f.x)<=140;return threatening&&holdsBack(input,f.facing)?{...input,left:false,right:false}:input;}
export function stepCombatMatch(state:MatchState,inputs:readonly[FighterInput,FighterInput]):CombatMatchState{
 const combat=asCombatMatchState(state),frame=state.frame;
 let combos=[resetComboIfExpired(combat.combos[0],frame),resetComboIfExpired(combat.combos[1],frame)] as const;
 const guards=[guardInput(inputs[0],state.fighters[0].facing),guardInput(inputs[1],state.fighters[1].facing)] as const;
 const frozen=state.fighters.map(f=>f.hitstopFrames>0?tickHitstop(f):f) as [FighterState,FighterState];
 const simState={...state,fighters:frozen as readonly[FighterState,FighterState]};
 const movement=[movementInput(inputs[0],simState.fighters[0],simState.fighters[1]),movementInput(inputs[1],simState.fighters[1],simState.fighters[0])] as const;
 let base=stepMatch(simState,movement),a=startLight(base.fighters[0],inputs[0]),b=startLight(base.fighters[1],inputs[1]);
 const hpB=b.health;[a,b]=resolveStandingLight(a,b,guards[1],scaledDamage(STANDING_LIGHT.damage,combos[0].hits));if(b.health<hpB)combos=[addComboHit(combos[0],STANDING_LIGHT.damage,frame).combo,combos[1]];
 const hpA=a.health;[b,a]=resolveStandingLight(b,a,guards[0],scaledDamage(STANDING_LIGHT.damage,combos[1].hits));if(a.health<hpA)combos=[combos[0],addComboHit(combos[1],STANDING_LIGHT.damage,frame).combo];
 if(a.hitstopFrames===0&&(a.mode==="hitstun"||a.mode==="blockstun"))a=tickStun(a);if(b.hitstopFrames===0&&(b.mode==="hitstun"||b.mode==="blockstun"))b=tickStun(b);
 a=advanceAttack(a);b=advanceAttack(b);
 return{...base,fighters:[a,b] as readonly[FighterState,FighterState],combos};
}
