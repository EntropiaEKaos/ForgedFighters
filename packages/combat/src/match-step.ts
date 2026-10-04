import{stepMatch,tickHitstop,tickStun,type FighterInput,type FighterState,type MatchState}from"@forged-fighter/core";import{advanceAttack,resolveAirJuggleLight,resolveHeavyLauncher,resolveStandingLight,startAirJuggleLight,startHeavyLauncher,startLight}from"./runtime.js";import{addComboHit,resetComboIfExpired,scaledDamage}from"./combo.js";import{asCombatMatchState,type CombatMatchState}from"./combat-match.js";import{AIR_JUGGLE_LIGHT,STANDING_HEAVY_LAUNCHER,STANDING_LIGHT}from"./moves.js";import{applyJuggle,canJuggle}from"./air-combat.js";import{advanceThrow,BASIC_THROW,beginThrow,canTechThrow,canThrowConnect,isThrowLocked}from"./throws.js";
function guardInput(input:FighterInput,facing:-1|1):FighterInput{return{...input,left:facing===1?input.left:false,right:facing===-1?input.right:false};}
function holdsBack(input:FighterInput,facing:-1|1):boolean{return facing===1?input.left:input.right;}
function movementInput(input:FighterInput,f:FighterState,opponent:FighterState):FighterInput{const threatening=opponent.mode==="attack"&&Math.abs(opponent.x-f.x)<=140;return threatening&&holdsBack(input,f.facing)?{...input,left:false,right:false}:input;}
export function stepCombatMatch(state:MatchState,inputs:readonly[FighterInput,FighterInput]):CombatMatchState{
 const combat=asCombatMatchState(state),frame=state.frame;
 let combos=[resetComboIfExpired(combat.combos[0],frame),resetComboIfExpired(combat.combos[1],frame)] as const;let juggles=[combat.juggles[0],combat.juggles[1]] as [typeof combat.juggles[0],typeof combat.juggles[1]];let throws=[combat.throws[0],combat.throws[1]] as [typeof combat.throws[0],typeof combat.throws[1]];
 const guards=[guardInput(inputs[0],state.fighters[0].facing),guardInput(inputs[1],state.fighters[1].facing)] as const;
 const frozen=state.fighters.map(f=>f.hitstopFrames>0?tickHitstop(f):f) as [FighterState,FighterState];
 const throwLockedFighters=frozen.map((fighter,index)=>isThrowLocked(throws[index as 0|1])?{...fighter,vx:0,vy:0}:fighter) as [FighterState,FighterState];
 const simState={...state,fighters:throwLockedFighters as readonly[FighterState,FighterState]};
 const neutralize=(input:FighterInput):FighterInput=>({...input,left:false,right:false,up:false,down:false,light:false,medium:false,heavy:false,special:false});
 const lockedInputs=[isThrowLocked(throws[0])?neutralize(inputs[0]):inputs[0],isThrowLocked(throws[1])?neutralize(inputs[1]):inputs[1]] as const;
 const movement=[movementInput(lockedInputs[0],simState.fighters[0],simState.fighters[1]),movementInput(lockedInputs[1],simState.fighters[1],simState.fighters[0])] as const;
 let base=stepMatch(simState,movement),a=startAirJuggleLight(startHeavyLauncher(startLight(base.fighters[0],lockedInputs[0]),lockedInputs[0]),lockedInputs[0]),b=startAirJuggleLight(startHeavyLauncher(startLight(base.fighters[1],lockedInputs[1]),lockedInputs[1]),lockedInputs[1]);
 if(inputs[0].throw&&!throws[0]&&a.mode==="idle")throws[0]=beginThrow();if(inputs[1].throw&&!throws[1]&&b.mode==="idle")throws[1]=beginThrow();
 if(throws[0]){if(canTechThrow(throws[0],inputs[1].throw)){throws[0]=undefined;}else if(canThrowConnect(throws[0],a,b,BASIC_THROW,throws[1])){b={...b,health:Math.max(0,b.health-BASIC_THROW.damage),mode:"hitstun",stunFrames:BASIC_THROW.techWindow};throws[0]=undefined;}else throws[0]=advanceThrow(throws[0]);}
 if(throws[1]){if(canTechThrow(throws[1],inputs[0].throw)){throws[1]=undefined;}else if(canThrowConnect(throws[1],b,a,BASIC_THROW,throws[0])){a={...a,health:Math.max(0,a.health-BASIC_THROW.damage),mode:"hitstun",stunFrames:BASIC_THROW.techWindow};throws[1]=undefined;}else throws[1]=advanceThrow(throws[1]);}
 const airHpB=b.health;if(canJuggle(juggles[0],1)){[a,b]=resolveAirJuggleLight(a,b);if(b.health<airHpB){juggles[0]=applyJuggle(juggles[0],1);combos=[addComboHit(combos[0],AIR_JUGGLE_LIGHT.damage,frame).combo,combos[1]];}}
 const airHpA=a.health;if(canJuggle(juggles[1],1)){[b,a]=resolveAirJuggleLight(b,a);if(a.health<airHpA){juggles[1]=applyJuggle(juggles[1],1);combos=[combos[0],addComboHit(combos[1],AIR_JUGGLE_LIGHT.damage,frame).combo];}}
 const heavyHpB=b.health;if(canJuggle(juggles[0],2)){[a,b]=resolveHeavyLauncher(a,b);if(b.health<heavyHpB){juggles[0]=applyJuggle(juggles[0],2);combos=[addComboHit(combos[0],STANDING_HEAVY_LAUNCHER.damage,frame).combo,combos[1]];}}
 const heavyHpA=a.health;if(canJuggle(juggles[1],2)){[b,a]=resolveHeavyLauncher(b,a);if(a.health<heavyHpA){juggles[1]=applyJuggle(juggles[1],2);combos=[combos[0],addComboHit(combos[1],STANDING_HEAVY_LAUNCHER.damage,frame).combo];}}
 const hpB=b.health;[a,b]=resolveStandingLight(a,b,guards[1],scaledDamage(STANDING_LIGHT.damage,combos[0].hits));if(b.health<hpB)combos=[addComboHit(combos[0],STANDING_LIGHT.damage,frame).combo,combos[1]];
 const hpA=a.health;[b,a]=resolveStandingLight(b,a,guards[0],scaledDamage(STANDING_LIGHT.damage,combos[1].hits));if(a.health<hpA)combos=[combos[0],addComboHit(combos[1],STANDING_LIGHT.damage,frame).combo];
 if(a.hitstopFrames===0&&(a.mode==="hitstun"||a.mode==="air-hitstun"||a.mode==="knockdown"||a.mode==="blockstun"))a=tickStun(a);if(b.hitstopFrames===0&&(b.mode==="hitstun"||b.mode==="air-hitstun"||b.mode==="knockdown"||b.mode==="blockstun"))b=tickStun(b);
 a=advanceAttack(a);b=advanceAttack(b);
 return{...base,fighters:[a,b] as readonly[FighterState,FighterState],combos,throws,juggles};
}
