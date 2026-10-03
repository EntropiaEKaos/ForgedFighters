import { hashState, stepMatch, type MatchState, type PlayerId, type FighterInput } from "@forged-fighter/core";
import { InputHistory } from "./input-history.js";
import { SnapshotRingBuffer } from "./snapshot-ring.js";

export type MatchStepper=(state:MatchState,inputs:readonly[FighterInput,FighterInput])=>MatchState;

export class RollbackSession {
 readonly inputs=new InputHistory();readonly snapshots:SnapshotRingBuffer;private state:MatchState;
 constructor(initialState:MatchState,snapshotCapacity=240,private readonly step:MatchStepper=stepMatch){this.state=initialState;this.snapshots=new SnapshotRingBuffer(snapshotCapacity);this.snapshots.save(initialState);}
 get currentState():MatchState{return this.state;}get hash():string{return hashState(this.state);}
 setInput(frame:number,player:PlayerId,input:FighterInput):void{this.inputs.set(frame,player,input);}
 advance():MatchState{this.snapshots.save(this.state);this.state=this.step(this.state,this.inputs.get(this.state.frame));return this.state;}
 rollbackAndResimulate(fromFrame:number,targetFrame=this.state.frame):MatchState{
  const restored=this.snapshots.restore(fromFrame);if(!restored)throw new Error(`No snapshot available for frame ${fromFrame}`);if(targetFrame<fromFrame)throw new Error("targetFrame must be >= fromFrame");
  this.state=restored;while(this.state.frame<targetFrame)this.advance();return this.state;
 }
}
