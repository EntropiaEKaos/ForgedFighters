import type{FighterState}from"@forged-fighter/core";import{advanceThrow,BASIC_THROW,canTechThrow,canThrowConnect,type ThrowAttempt,type ThrowData}from"./throws.js";
export interface ThrowResolution{attacker:FighterState;defender:FighterState;attempt:ThrowAttempt|null;}
export function resolveThrowAttempt(attacker:FighterState,defender:FighterState,attempt:ThrowAttempt|null,defenderThrow:ThrowAttempt|null,techPressed:boolean,data:ThrowData=BASIC_THROW):ThrowResolution{
 if(!attempt)return{attacker,defender,attempt:null};
 if(canTechThrow(attempt,techPressed))return{attacker,defender,attempt:null};
 if(canThrowConnect(attempt,attacker,defender,data,defenderThrow))return{attacker,defender:{...defender,health:Math.max(0,defender.health-data.damage),mode:"hitstun",stunFrames:data.techWindow},attempt:null};
 return{attacker,defender,attempt:advanceThrow(attempt)};
}
