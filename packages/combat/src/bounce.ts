import{DEFAULT_STAGE,PUSHBOX_HALF_WIDTH,type FighterState,type StageBounds}from"@forged-fighter/core";
export interface BounceState{wallBounces:number;groundBounces:number;}
export interface BounceRules{maxWallBounces:number;maxGroundBounces:number;wallVelocityX:number;wallVelocityY:number;groundVelocityY:number;airHitstun:number;wallJuggleCost:number;groundJuggleCost:number;}
export const DEFAULT_BOUNCE_RULES:BounceRules={maxWallBounces:1,maxGroundBounces:1,wallVelocityX:14,wallVelocityY:18,groundVelocityY:22,airHitstun:20,wallJuggleCost:1,groundJuggleCost:1};
export const INITIAL_BOUNCE_STATE:BounceState={wallBounces:0,groundBounces:0};
export function canWallBounce(s:BounceState,r=DEFAULT_BOUNCE_RULES){return s.wallBounces<r.maxWallBounces;}
export function canGroundBounce(s:BounceState,r=DEFAULT_BOUNCE_RULES){return s.groundBounces<r.maxGroundBounces;}
export function wallBounce(f:FighterState,s:BounceState,r=DEFAULT_BOUNCE_RULES):readonly[FighterState,BounceState]{if(!canWallBounce(s,r))return[f,s];const direction=f.x<=0?1:-1;return[{...f,grounded:false,vx:direction*r.wallVelocityX,vy:r.wallVelocityY,mode:"air-hitstun",stunFrames:r.airHitstun},{...s,wallBounces:s.wallBounces+1}];}
export function groundBounce(f:FighterState,s:BounceState,r=DEFAULT_BOUNCE_RULES):readonly[FighterState,BounceState]{if(!canGroundBounce(s,r))return[f,s];return[{...f,y:0,grounded:false,vy:r.groundVelocityY,mode:"air-hitstun",stunFrames:r.airHitstun},{...s,groundBounces:s.groundBounces+1}];}
export function isAtStageWall(f:FighterState,stage:StageBounds=DEFAULT_STAGE):boolean{return f.x<=stage.left+PUSHBOX_HALF_WIDTH||f.x>=stage.right-PUSHBOX_HALF_WIDTH;}
export function resolveWallBounce(f:FighterState,s:BounceState,stage:StageBounds=DEFAULT_STAGE,r=DEFAULT_BOUNCE_RULES):readonly[FighterState,BounceState]{return f.mode==="air-hitstun"&&!f.grounded&&isAtStageWall(f,stage)?wallBounce(f,s,r):[f,s];}
export function resolveGroundBounce(previous:FighterState,current:FighterState,s:BounceState,r=DEFAULT_BOUNCE_RULES):readonly[FighterState,BounceState]{const landedFromAirHitstun=previous.mode==="air-hitstun"&&!previous.grounded&&current.mode==="knockdown"&&current.grounded;return landedFromAirHitstun?groundBounce(current,s,r):[current,s];}
