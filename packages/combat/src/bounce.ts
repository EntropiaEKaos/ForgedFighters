import type{FighterState}from"@forged-fighter/core";
export interface BounceState{wallBounces:number;groundBounces:number;}
export interface BounceRules{maxWallBounces:number;maxGroundBounces:number;wallVelocityX:number;wallVelocityY:number;groundVelocityY:number;airHitstun:number;}
export const DEFAULT_BOUNCE_RULES:BounceRules={maxWallBounces:1,maxGroundBounces:1,wallVelocityX:14,wallVelocityY:18,groundVelocityY:22,airHitstun:20};
export const INITIAL_BOUNCE_STATE:BounceState={wallBounces:0,groundBounces:0};
export function canWallBounce(s:BounceState,r=DEFAULT_BOUNCE_RULES){return s.wallBounces<r.maxWallBounces;}
export function canGroundBounce(s:BounceState,r=DEFAULT_BOUNCE_RULES){return s.groundBounces<r.maxGroundBounces;}
export function wallBounce(f:FighterState,s:BounceState,r=DEFAULT_BOUNCE_RULES):readonly[FighterState,BounceState]{if(!canWallBounce(s,r))return[f,s];const direction=f.x<=0?1:-1;return[{...f,grounded:false,vx:direction*r.wallVelocityX,vy:r.wallVelocityY,mode:"air-hitstun",stunFrames:r.airHitstun},{...s,wallBounces:s.wallBounces+1}];}
export function groundBounce(f:FighterState,s:BounceState,r=DEFAULT_BOUNCE_RULES):readonly[FighterState,BounceState]{if(!canGroundBounce(s,r))return[f,s];return[{...f,y:0,grounded:false,vy:r.groundVelocityY,mode:"air-hitstun",stunFrames:r.airHitstun},{...s,groundBounces:s.groundBounces+1}];}
