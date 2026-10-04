import type{FighterState}from"@forged-fighter/core";
export interface ThrowData{id:string;startup:number;range:number;damage:number;techWindow:number;invulnerabilityFrames:number;}
export interface ThrowAttempt{moveId:string;frame:number;techFramesRemaining:number;}
export const BASIC_THROW:ThrowData={id:"basic-throw",startup:3,range:84,damage:900,techWindow:7,invulnerabilityFrames:2};
export function inThrowRange(a:FighterState,b:FighterState,data:ThrowData=BASIC_THROW):boolean{return a.grounded&&b.grounded&&Math.abs(a.x-b.x)<=data.range;}
export function beginThrow(data:ThrowData=BASIC_THROW):ThrowAttempt{return{moveId:data.id,frame:0,techFramesRemaining:data.techWindow};}
export function advanceThrow(a:ThrowAttempt):ThrowAttempt{return{...a,frame:a.frame+1,techFramesRemaining:Math.max(0,a.techFramesRemaining-1)};}
export function isThrowLocked(a:ThrowAttempt|undefined):boolean{return a!==undefined;}\nexport function isThrowInvulnerable(a:ThrowAttempt|undefined,data:ThrowData=BASIC_THROW):boolean{return a!==undefined&&a.frame<data.invulnerabilityFrames;}\nexport function canThrowConnect(a:ThrowAttempt,attacker:FighterState,defender:FighterState,data:ThrowData=BASIC_THROW,defenderThrow?:ThrowAttempt):boolean{return a.moveId===data.id&&a.frame===data.startup&&!isThrowInvulnerable(defenderThrow,data)&&inThrowRange(attacker,defender,data);}
export function canTechThrow(a:ThrowAttempt,throwPressed:boolean):boolean{return throwPressed&&a.techFramesRemaining>0;}
