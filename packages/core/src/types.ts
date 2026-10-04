export const TICK_RATE=60 as const;export const TICK_MS=1000/TICK_RATE;
export type PlayerId=0|1;
export type FighterMode="idle"|"walk"|"crouch"|"jump"|"fall"|"attack"|"hitstun"|"air-hitstun"|"knockdown"|"blockstun";
export interface FighterInput{left:boolean;right:boolean;up:boolean;down:boolean;light:boolean;medium:boolean;heavy:boolean;special:boolean;throw:boolean;}
export interface AttackRuntime{moveId:string;frame:number;hasHit:boolean;}
export interface FighterState{playerId:PlayerId;x:number;y:number;vx:number;vy:number;facing:-1|1;health:number;meter:number;mode:FighterMode;grounded:boolean;stunFrames:number;hitstopFrames:number;landingKnockdownFrames?:number;attack?:AttackRuntime;}
export interface MatchState{frame:number;seed:number;fighters:readonly[FighterState,FighterState];}
