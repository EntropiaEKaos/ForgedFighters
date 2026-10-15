import{tickStun,type FighterState}from"@forged-fighter/core";import type{JuggleState}from"./air-combat.js";import type{BounceState}from"./bounce.js";import type{BounceEntitlement}from"./bounce-launcher-resolution.js";
export interface StunRecoveryResolution{fighter:FighterState;juggle:JuggleState;bounce:BounceState;entitlement:BounceEntitlement;recovered:boolean;}
const tickable=(mode:FighterState["mode"])=>mode==="hitstun"||mode==="air-hitstun"||mode==="knockdown"||mode==="blockstun";
export function resolveStunRecovery(fighter:FighterState,landed:boolean,juggle:JuggleState,bounce:BounceState,entitlement:BounceEntitlement):StunRecoveryResolution{
 const before=fighter.mode;const next=!landed&&fighter.hitstopFrames===0&&tickable(fighter.mode)?tickStun(fighter):fighter;const recovered=(before==="hitstun"||before==="knockdown")&&next.mode==="idle";
 return recovered?{fighter:next,juggle:{points:0,hits:0},bounce:{wallBounces:0,groundBounces:0},entitlement:{wall:false,ground:false},recovered:true}:{fighter:next,juggle,bounce,entitlement,recovered:false};
}
