import { DEFAULT_STAGE, resolveStagePushboxes } from "./stage.js";
import type { FighterInput, FighterState, MatchState, PlayerId } from "./types.js";

const WALK=12,JUMP=42,GRAVITY=4,MAX_FALL=40;

export function createInitialState(seed=1):MatchState{
 return {frame:0,seed:seed>>>0,fighters:[createFighter(0,-120,1),createFighter(1,120,-1)]};
}
function createFighter(playerId:PlayerId,x:number,facing:-1|1):FighterState{
 return {playerId,x,y:0,vx:0,vy:0,facing,health:10_000,meter:0,mode:"idle",grounded:true,stunFrames:0,hitstopFrames:0};
}
export function stepMatch(state:MatchState,inputs:readonly[FighterInput,FighterInput]):MatchState{
 const stepped=state.fighters.map((fighter,index)=>stepFighter(fighter,inputs[index as PlayerId])) as [FighterState,FighterState];
 const [a,b]=resolveStagePushboxes(stepped[0],stepped[1],DEFAULT_STAGE);
 return {frame:state.frame+1,seed:nextSeed(state.seed),fighters:[
  {...a,facing:a.x<=b.x?1:-1},
  {...b,facing:b.x>=a.x?-1:1},
 ]};
}
function stepFighter(f:FighterState,input:FighterInput):FighterState{
 if(f.hitstopFrames>0)return f;
 const locked=f.mode==="attack"||f.mode==="hitstun"||f.mode==="air-hitstun"||f.mode==="knockdown"||f.mode==="blockstun";
 const axis=locked?0:Number(input.right)-Number(input.left);let grounded=f.grounded,vy=f.vy,y=f.y;
 if(!locked&&grounded&&input.up){grounded=false;vy=JUMP;}
 if(!grounded){vy=Math.max(vy-GRAVITY,-MAX_FALL);y+=vy;if(y<=0){y=0;vy=0;grounded=true;}}
 const vx=locked?f.vx:grounded&&input.down?0:axis*WALK;const x=f.x+vx;
 const mode=locked?f.mode:!grounded?(vy>=0?"jump":"fall"):input.down?"crouch":axis!==0?"walk":"idle";
 return {...f,x,y,vx,vy,grounded,mode};
}
function nextSeed(seed:number):number{let x=seed>>>0;x^=x<<13;x^=x>>>17;x^=x<<5;return x>>>0;}
