export interface FramedState{frame:number;}
export interface StateCodec<TState extends FramedState>{clone(state:TState):TState;hash(state:TState):string;}
export function jsonStateCodec<TState extends FramedState>():StateCodec<TState>{const serialize=(state:TState)=>JSON.stringify(state);return{clone(state){return JSON.parse(serialize(state))as TState;},hash(state){const input=serialize(state);let hash=0x811c9dc5;for(let i=0;i<input.length;i++){hash^=input.charCodeAt(i);hash=Math.imul(hash,0x01000193)>>>0;}return hash.toString(16).padStart(8,"0");}};}
