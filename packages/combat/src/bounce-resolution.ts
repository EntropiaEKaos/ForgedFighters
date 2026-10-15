import type{FighterState}from"@forged-fighter/core";import{applyJuggle,canJuggle,type JuggleState}from"./air-combat.js";import{DEFAULT_BOUNCE_RULES,resolveGroundBounce,resolveWallBounce,type BounceState}from"./bounce.js";import type{BounceEntitlement}from"./bounce-launcher-resolution.js";
export interface BounceResolution{fighter:FighterState;bounce:BounceState;juggle:JuggleState;entitlement:BounceEntitlement;groundBounced:boolean;wallBounced:boolean;}
export function resolveBounceEntitlements(previous:FighterState,current:FighterState,bounce:BounceState,juggle:JuggleState,entitlement:BounceEntitlement):BounceResolution{
 let fighter=current,nextBounce=bounce,nextJuggle=juggle,nextEntitlement=entitlement,groundBounced=false,wallBounced=false;
 if(nextEntitlement.ground&&canJuggle(nextJuggle,DEFAULT_BOUNCE_RULES.groundJuggleCost)){const before=nextBounce.groundBounces;[fighter,nextBounce]=resolveGroundBounce(previous,fighter,nextBounce);if(nextBounce.groundBounces>before){nextJuggle=applyJuggle(nextJuggle,DEFAULT_BOUNCE_RULES.groundJuggleCost);nextEntitlement={...nextEntitlement,ground:false};groundBounced=true;}}
 if(nextEntitlement.wall&&canJuggle(nextJuggle,DEFAULT_BOUNCE_RULES.wallJuggleCost)){const before=nextBounce.wallBounces;[fighter,nextBounce]=resolveWallBounce(fighter,nextBounce);if(nextBounce.wallBounces>before){nextJuggle=applyJuggle(nextJuggle,DEFAULT_BOUNCE_RULES.wallJuggleCost);nextEntitlement={...nextEntitlement,wall:false};wallBounced=true;}}
 return{fighter,bounce:nextBounce,juggle:nextJuggle,entitlement:nextEntitlement,groundBounced,wallBounced};
}
