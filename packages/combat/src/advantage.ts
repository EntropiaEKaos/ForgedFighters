import type{AttackFrameData}from"./frame-data.js";
export interface FrameAdvantage{onHit:number;onBlock:number;}
export function frameAdvantage(move:AttackFrameData,contactFrame=move.startup):FrameAdvantage{
 const remainingActive=Math.max(0,move.startup+move.active-1-contactFrame);
 const attackerRecovery=remainingActive+move.recovery;
 return{onHit:move.hitstun-attackerRecovery,onBlock:move.blockstun-attackerRecovery};
}
