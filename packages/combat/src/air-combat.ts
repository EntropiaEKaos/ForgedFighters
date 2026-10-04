import type{FighterState}from"@forged-fighter/core";
export interface LaunchData{velocityX:number;velocityY:number;airHitstun:number;juggleCost:number;landingKnockdownFrames?:number;}
export interface JuggleState{points:number;hits:number;}
export const DEFAULT_JUGGLE_LIMIT=6;
export function launchFighter(f:FighterState,data:LaunchData):FighterState{return{...f,grounded:false,vx:data.velocityX,vy:data.velocityY,mode:"air-hitstun",stunFrames:data.airHitstun,landingKnockdownFrames:data.landingKnockdownFrames};}
export function canJuggle(state:JuggleState,cost:number,limit=DEFAULT_JUGGLE_LIMIT):boolean{return cost>0&&state.points+cost<=limit;}
export function applyJuggle(state:JuggleState,cost:number):JuggleState{return{points:state.points+cost,hits:state.hits+1};}
export function landAirHitstun(f:FighterState,knockdownFrames:number):FighterState{return f.mode==="air-hitstun"&&f.y<=0?{...f,y:0,vy:0,grounded:true,mode:"knockdown",stunFrames:knockdownFrames}:f;}
