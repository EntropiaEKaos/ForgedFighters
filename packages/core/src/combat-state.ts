import type { FighterState } from "./types.js";
export function beginAttack(f:FighterState,moveId:string):FighterState{return {...f,mode:"attack",attack:{moveId,frame:0,hasHit:false},vx:0};}
export function applyHit(defender:FighterState,damage:number,hitstun:number):FighterState{
 const {attack:_attack,...rest}=defender;
 return {...rest,health:Math.max(0,defender.health-damage),mode:"hitstun",stunFrames:hitstun,vx:0};
}
export function tickStun(f:FighterState):FighterState{
 if(f.stunFrames<=1)return {...f,stunFrames:0,mode:f.grounded?"idle":"fall"};
 return {...f,stunFrames:f.stunFrames-1};
}
